import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api, resetAuthTokenHeader } from '../utils/api';
import useNotificationStore from './notification';
import { Wedding } from '../interfaces/wedding';
import { SignInRequest, SignUpRequest } from '../interfaces/user';
import axios from 'axios';
import getT from 'next-translate/getT';
import Router from 'next/router';

export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  createdAt: string;
  type: 'NORMAL' | 'ADMIN';
  appleUserIdentifier?: string;
}

export interface UserDataWithoutFirstName {
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  createdAt: string;
  type: 'NORMAL' | 'ADMIN';
  appleUserIdentifier?: string;
}

export interface UserResponseData {
  token: {
    value: string;
    createdAt: string;
    expiresAt: string;
  };
  user: UserData;
}

interface Token {
  expiresAt: string;
  secret: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: UserData | null;
  token: Token | null;
  wedding: Wedding | null;
  locale?: string;
}

interface LoginResponse {
  user: UserData;
  token: {
    value: string;
    createdAt: string;
    expiresAt: string;
  };
}

interface UserActions {
  signIn: (body: SignInRequest) => Promise<void>;
  signInWithApple: (response: LoginResponse) => Promise<void>;
  signUp: (body: SignUpRequest) => Promise<void>;
  signOut: () => void;
  setWedding: (wedding: Wedding) => void;
  setUserEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setLocale: (locale: string) => void;
}

type UserStore = UserState & UserActions;
  
const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      wedding: null,
      locale: undefined,
      
      setLocale: (locale) => {
        set({ locale });
      },

      signIn: async (body) => {
        const { showError, showCustomError } = useNotificationStore.getState();
        const t = await getT(get().locale, 'notification');

        try {
          const {
            data: { user, token },
            status,
          } = await api.post<UserResponseData>('auth/signin', null, {
            headers: {
              Authorization:
                'Basic ' + window.btoa(`${body.email}:${body.password}`),
            },
          });

          if (status === 200) {
            set({
              isLoggedIn: true,
              user,
              token: {
                expiresAt: token.expiresAt,
                secret: token.value,
              },
            });
            Router.push('/app');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              showCustomError({
                title: t('notification:invalidCredentials.title'),
                description: t('notification:invalidCredentials.description'),
              });
            } else {
              showError({ error: new Error(error.response?.data?.message || 'An unexpected error occurred.') });
            }
          } else {
            showError({ error: new Error('An unexpected error occurred.') });
          }
        }
      },

      signInWithApple: async ({ user, token }) => {
        set({
          token: {
            expiresAt: token.expiresAt,
            secret: token.value,
          },
          isLoggedIn: true,
          user,
        });
      },

      signUp: async (body) => {
        const { showError } = useNotificationStore.getState();
        const t = await getT(get().locale, 'auth');
      
        try {
          const {
            data: { user, token },
            status,
          } = await api.post<UserResponseData>('auth/signup', body);
      
          if (status === 200) {
            set({
              isLoggedIn: true,
              user,
              token: {
                expiresAt: token.expiresAt,
                secret: token.value,
              },
            });
            Router.push('/app');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              const message = error.response.data?.message;
      
              if (message === 'A user with this email already exists.') {
                showError({ error: new Error(t('errors.userAlreadyExists')) });
              } else {
                showError({ error: new Error(message || 'An unexpected error occurred.') });
              }
            } else if (error.request) {
              showError({ error: new Error('No response from the server. Please try again later.') });
            } else {
              showError({ error: new Error(error.message) });
            }
          } else {
            showError({ error: new Error('An unexpected error occurred.') });
          }
        }
      },
      
      signOut: () => {
        resetAuthTokenHeader();
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        });
      },

      setUserEmail: (email: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, email } : null,
        }));
      },

      setUsername: (username: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, username } : null,
        }));
      },

      setFirstName: (firstName: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, firstName } : null,
        }));
      },

      setLastName: (lastName: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, lastName } : null,
        }));
      },

      setWedding: (wedding) => {
        set({ wedding });
      },
    }),
    {
      name: 'em-auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
