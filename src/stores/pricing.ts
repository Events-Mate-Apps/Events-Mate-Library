import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';
import { TrackGoogleAnalyticsEvent } from '../utils/analytics/googleAnalytics/init'; // Assuming this is where the analytics function is defined
import useNotificationStore from '../stores/notification';
import  Router  from 'next/router';
import useUserStore from './auth';
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
  upgradeSubscription: (priceId: string) => Promise<void>;
  handleSessionCreationFailure: (error: any, price: Price) => Promise<void>;
  createPaymentSession: (price: Price) => Promise<void>;
  payment: () => Promise<void>;
  getVendor: () => Promise<void>;
  calculateProration: (priceId: string) => Promise<any>;
}

type PricingStore = PricingState & PricingActions;

const usePricingStore = create<PricingStore>()(
  persist(
    (set, get) => {
      const { showError } = useNotificationStore.getState();
      const isLoggedIn = useUserStore().isLoggedIn

      return {
        vendorId: null,
        currentPrice: null,
        vendor: null,

        setVendorId: (id) => set({ vendorId: id }),
        setCurrentPrice: (price) => set({ currentPrice: price }),
        setVendor: (vendor) => set({ vendor }),
        upgradeSubscription: async (priceId) => {
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

        handleSessionCreationFailure: async (error, price) => {
          const { upgradeSubscription, calculateProration } = get();
          showError({ error });
          handlePlanSelectionEvent(price, error.raw?.message ?? error.message);

          const prorationResponse = await calculateProration(price.id);

          if (prorationResponse) {
            const confirmUpgrade = window.confirm(
              `Proration Amount: ${prorationResponse.amount_due}`
            );

            if (confirmUpgrade) {
              await upgradeSubscription(price.id);
            }
          }
        },

        createPaymentSession: async (price ) => {
          const {vendorId, handleSessionCreationFailure } = get();
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
            handleSessionCreationFailure(error, price);
          }
        },

        payment: async () => {
          const {vendorId, currentPrice, createPaymentSession } = get();
          if (isLoggedIn === false || !vendorId) {
            Router.push('/auth/signin');
            return;
          }

          if (currentPrice) {
            await createPaymentSession(currentPrice);
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

        calculateProration: async (priceId) => {
          const {vendorId } = get();
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
