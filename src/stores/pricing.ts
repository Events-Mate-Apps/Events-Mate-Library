import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';
import { TrackGoogleAnalyticsEvent } from '../utils/analytics/googleAnalytics/init'; // Assuming this is where the analytics function is defined
import useNotificationStore from '../stores/notification';
import Router from 'next/router';

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
  vendor: any;
}

interface PricingActions {
  setVendorId: (id: string) => void;
  setCurrentPrice: (price: Price) => void;
  setVendor: (vendor: any) => void;
  upgradeSubscription: (priceId: string, isLoggedIn: boolean) => Promise<void>;
  handleSessionCreationFailure: (error: any, price: Price, isLoggedIn: boolean) => Promise<void>;
  createPaymentSession: (price: Price, isLoggedIn: boolean) => Promise<void>;
  payment: (isLoggedIn: boolean) => Promise<void>;
  getVendor: () => Promise<void>;
  calculateProration: (priceId: string, isLoggedIn: boolean) => Promise<any>;
}

type PricingStore = PricingState & PricingActions;

const usePricingStore = create<PricingStore>()(
  persist(
    (set, get) => {
      const { showError } = useNotificationStore.getState();

      return {
        vendorId: null,
        currentPrice: null,
        vendor: null,

        setVendorId: (id) => set({ vendorId: id }),
        setCurrentPrice: (price) => set({ currentPrice: price }),
        setVendor: (vendor) => set({ vendor }),
        upgradeSubscription: async (priceId, isLoggedIn) => {
          const { vendorId } = get();
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
        },

        handleSessionCreationFailure: async (error, price, isLoggedIn) => {
          const { upgradeSubscription, calculateProration } = get();
          showError({ error });
          handlePlanSelectionEvent(price, error.raw?.message ?? error.message);

          const prorationResponse = await calculateProration(price.id, isLoggedIn); // Pass isLoggedIn as true since this function is called within another authenticated function

          if (prorationResponse) {
            const confirmUpgrade = window.confirm(
              `Proration Amount: ${prorationResponse.amount_due}`
            );

            if (confirmUpgrade) {
              await upgradeSubscription(price.id, isLoggedIn); // Pass isLoggedIn as true since this function is called within another authenticated function
            }
          }
        },

        createPaymentSession: async (price, isLoggedIn) => {
          const { vendorId, handleSessionCreationFailure } = get();
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
            handleSessionCreationFailure(error, price, isLoggedIn);
          }
        },

        payment: async (isLoggedIn) => {
          const { vendorId, currentPrice, createPaymentSession } = get();
          if (isLoggedIn === false || !vendorId) {
            Router.push('/auth/signin');
            return;
          }

          if (currentPrice) {
            await createPaymentSession(currentPrice, isLoggedIn);
          }
        },

        getVendor: async () => {
          const { vendorId, setVendor } = get();
          try {
            const { data } = await api.get(`vendors/${vendorId}`);
            setVendor(data);
          } catch (error) {
            showError({ error });
          }
        },

        calculateProration: async (priceId, isLoggedIn) => {
          const { vendorId } = get();
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
      error: error
    }
  });
};
