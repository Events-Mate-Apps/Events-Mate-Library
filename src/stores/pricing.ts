import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';
import { TrackGoogleAnalyticsEvent } from '../utils/analytics/googleAnalytics/init'; // Assuming this is where the analytics function is defined
import useNotificationStore from '../stores/notification';
import Router from 'next/router';
import { Vendor } from '~/interfaces/vendor';

interface Price {
  id: string;
  unit_amount: number;
  currency: string;
  recurring: {
    interval: string;
  };
}

interface PricingState {
  vendorId: string | null;
  currentPrice: Price | null;
  vendor: Vendor | null;
}

interface PricingActions {
  setVendorId: (vendorId: string) => void;
  setCurrentPrice: (price: Price) => Promise<void>;
  upgradeSubscription: (priceId: string, isLoggedIn: boolean) => Promise<void>;
  handleSessionCreationFailure: (error: any, price: Price, isLoggedIn: boolean) => Promise<void>;
  createPaymentSession: (price: Price, isLoggedIn: boolean) => Promise<void>;
  payment: (isLoggedIn: boolean) => Promise<void>;
  calculateProration: (priceId: string, isLoggedIn: boolean) => Promise<any>;
}

type PricingStore = PricingState & PricingActions;

const getVendorIdFromRouter = () => {
  const { query: { vendorId } } = Router;
  return vendorId as string | null;
}

const usePricingStore = create<PricingStore>()(
  persist(
    (set, get) => {
      const { showError } = useNotificationStore.getState();

      const handlePlanSelectionEvent = (price: Price, error?: string) => {
        TrackGoogleAnalyticsEvent({
          action: 'plan_selected',
          label: 'Plan Selected',
          page: 'Pricing',
          params: {
            /* eslint-disable */
            selected_plan_price: (price.unit_amount / 100).toString(),
            selected_plan_currency: price.currency,
            selected_plan_interval: price.recurring.interval,
            /* eslint-enable */
            error: error,
          },
        });
      };

      const upgradeSubscription = async (priceId: string, isLoggedIn: boolean) => {
        const vendorId = getVendorIdFromRouter();
        if (isLoggedIn === false || !vendorId) {
          Router.push('/auth/signin');
          return;
        }

        try {
          const { data, status, statusText } = await api.post('payments/upgrade-subscription', {
            newPriceId: priceId,
            vendorId,
          });

          if (status !== 200) {
            throw new Error(`Upgrade failed: ${statusText}`);
          }

          const upgradeLink = await data;
          window.location.href = upgradeLink;
        } catch (error) {
          showError({ error });
        }
      };

      return {
        vendorId: null,
        currentPrice: null,
        vendor: null,

        setVendorId: (vendorId: string) => {
          set({ vendorId });
        },

        setCurrentPrice: async (price: Price) => {
          set({ currentPrice: price });
        },

        upgradeSubscription,
        handleSessionCreationFailure: async (error, price, isLoggedIn) => {
          const { upgradeSubscription, calculateProration } = get();
          showError({ error });
          handlePlanSelectionEvent(price, error.raw?.message ?? error.message);

          const prorationResponse = await calculateProration(price.id, isLoggedIn);

          if (prorationResponse) {
            const confirmUpgrade = window.confirm(`Proration Amount: ${prorationResponse.amount_due}`);

            if (confirmUpgrade) {
              await upgradeSubscription(price.id, isLoggedIn);
            }
          }
        },
        createPaymentSession: async (price, isLoggedIn) => {
          const vendorId = getVendorIdFromRouter();
          if (isLoggedIn === false || !vendorId) {
            Router.push('/auth/signin');
            return;
          }

          try {
            const { statusText, status, data } = await api.post('payments/create-session', {
              priceId: price.id,
              vendorId,
            });

            if (status !== 200) {
              throw new Error(`Network response was not ok: ${statusText}`);
            }

            const link = await data;
            handlePlanSelectionEvent(price);
            window.location.href = link;
          } catch (error) {
            get().handleSessionCreationFailure(error, price, isLoggedIn);
          }
        },
        payment: async (isLoggedIn) => {
          const vendorId = getVendorIdFromRouter();
          if (isLoggedIn === false || !vendorId) {
            Router.push('/auth/signin');
            return;
          }

          const currentPrice = get().currentPrice;
          if (currentPrice) {
            await get().createPaymentSession(currentPrice, isLoggedIn);
          }
        },
        calculateProration: async (priceId, isLoggedIn) => {
          const vendorId = getVendorIdFromRouter();
          if (isLoggedIn === false || !vendorId) {
            Router.push('/auth/signin');
            return null;
          }

          try {
            const { data: proration } = await api.post('payments/calculate-proration', {
              newPriceId: priceId,
              vendorId,
            });
            return proration;
          } catch (error) {
            showError({ error });
            return null;
          }
        },
      };
    },
    {
      name: 'pricing-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePricingStore;
