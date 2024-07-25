import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';
import { TrackGoogleAnalyticsEvent } from '../utils/analytics/googleAnalytics/init'; // Assuming this is where the analytics function is defined
import useNotificationStore from '../stores/notification';

interface UserState {
  isLoggedIn: boolean;
}

interface Price {
  id: string;
  unit_amount: number;
  currency: string;
  recurring: {
    interval: string;
  };
}

interface PricingState {
  userStore: UserState;
  vendorId: string | null;
  currentPrice: Price | null;
  vendor: any;
}

interface PricingActions {
  setVendorId: (id: string) => void;
  setCurrentPrice: (price: Price) => void;
  setVendor: (vendor: any) => void;
  upgradeSubscription: (priceId: string, router: any) => Promise<void>;
  handleSessionCreationFailure: (error: any, price: Price, router: any) => Promise<void>;
  createPaymentSession: (price: Price, router: any) => Promise<void>;
  payment: (router: any) => Promise<void>;
  getVendor: () => Promise<void>;
  calculateProration: (priceId: string, router: any) => Promise<any>;
}

type PricingStore = PricingState & PricingActions;

const usePricingStore = create<PricingStore>()(
  persist(
    (set, get) => {
      const { showError } = useNotificationStore.getState();

      return {
        userStore: {
          isLoggedIn: false,
        },
        vendorId: null,
        currentPrice: null,
        vendor: null,

        setVendorId: (id) => set({ vendorId: id }),
        setCurrentPrice: (price) => set({ currentPrice: price }),
        setVendor: (vendor) => set({ vendor }),

        upgradeSubscription: async (priceId, router) => {
          const { userStore, vendorId } = get();
          if (userStore.isLoggedIn === false || !vendorId) {
            router.push('/auth/signin');
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

        handleSessionCreationFailure: async (error, price, router) => {
          const { upgradeSubscription, calculateProration } = get();
          showError({ error });
          handlePlanSelectionEvent(price, error.raw?.message ?? error.message);

          const prorationResponse = await calculateProration(price.id, router);

          if (prorationResponse) {
            const confirmUpgrade = window.confirm(
              `Proration Amount: ${prorationResponse.amount_due}`
            );

            if (confirmUpgrade) {
              await upgradeSubscription(price.id, router);
            }
          }
        },

        createPaymentSession: async (price, router) => {
          const { userStore, vendorId, handleSessionCreationFailure } = get();
          if (userStore.isLoggedIn === false || !vendorId) {
            router.push('/auth/signin');
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
            handleSessionCreationFailure(error, price, router);
          }
        },

        payment: async (router) => {
          const { userStore, vendorId, currentPrice, createPaymentSession } = get();
          if (userStore.isLoggedIn === false || !vendorId) {
            router.push('/auth/signin');
            return;
          }

          if (currentPrice) {
            await createPaymentSession(currentPrice, router);
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

        calculateProration: async (priceId, router) => {
          const { userStore, vendorId } = get();
          if (userStore.isLoggedIn === false || !vendorId) {
            router.push('/auth/signin');
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
