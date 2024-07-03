import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieState {
  cookieNoticedAccepted: boolean | null;
  accept: () => void;
  decline: () => void;
}

const useCookieStore = create<CookieState>()(
  persist(
    (set) => ({
      cookieNoticedAccepted: null,
      decline: () => set({
        cookieNoticedAccepted: true
      }),
      accept: () => set({
        cookieNoticedAccepted: false
      })
    }),
    {
      name: `${process.env.NEXT_PUBLIC_PROJECT_NAME === 'Events-Mate' ? 'em' : 'wm'}-cookies`,
      getStorage: () => localStorage,
    },
  ),
);

export default useCookieStore;
