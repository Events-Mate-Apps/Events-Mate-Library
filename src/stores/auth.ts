import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api, resetAuthTokenHeader } from '../utils/api';
import useNotificationStore from './notification';
import { Wedding } from '../interfaces/wedding';
import { SignInRequest, SignUpRequest } from '../interfaces/user';
import axios from 'axios';
import getT from 'next-translate/getT';
import Router from 'next/router';
import { newApi } from '../utils/apinew';

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

export interface OldAuthToken {
  value: string;
  expiresAt: string;
}

export interface NewAuthToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserState {
  isLoggedIn: boolean;
  user: UserData | null;
  oldToken: OldAuthToken | null;
  newToken: NewAuthToken | null;
  wedding: Wedding | null;
  locale?: string;
}

export interface UserActions {
  signIn: (body: SignInRequest) => Promise<void>;
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
      oldToken: null,
      newToken: null,
      wedding: null,
      locale: undefined,

      setLocale: (locale) => {
        set({ locale });
      },

      signIn: async (body) => {
        const { showError, showCustomError } = useNotificationStore.getState();
        const t = await getT(get().locale, 'notification');

        try {
          const [oldApiResponse, newApiResponse] = await Promise.all([
            api.post('auth/signin', null, {
              headers: {
                Authorization: 'Basic ' + window.btoa(`${body.email}:${body.password}`),
              },
            }),
            (async () => {
              const hash = await crypto.subtle.digest(
                'SHA-512',
                new TextEncoder().encode(body.password)
              );
              const hashedPassword = btoa(
                Array.from(new Uint8Array(hash))
                  .map((x) => ('00' + x.toString(16)).slice(-2))
                  .join('')
              );
              const requestBody = new URLSearchParams();
              requestBody.append('grant_type', 'password');
              requestBody.append('username', body.email);
              requestBody.append('password', hashedPassword);

              return newApi.post('/auth/token', requestBody, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              });
            })(),
          ]);

          const oldToken = oldApiResponse.data.token;
          const newToken = newApiResponse.data;

          set({
            isLoggedIn: true,
            user: oldApiResponse.data.user,
            oldToken: {
              value: oldToken.value,
              expiresAt: oldToken.expiresAt,
            },
            newToken: {
              access_token: newToken.access_token,
              refresh_token: newToken.refresh_token,
              token_type: newToken.token_type,
            },
          });

          Router.push(
            `/app?access_token=${encodeURIComponent(
              newToken.access_token
            )}&refresh_token=${encodeURIComponent(newToken.refresh_token)}`
          );
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              showCustomError({
                title: t('notification:invalidCredentials.title'),
                description: t('notification:invalidCredentials.description'),
              });
            } else {
              showError({
                error: new Error(error.response?.data?.detail || 'An unexpected error occurred.'),
              });
            }
          } else {
            showError({ error: new Error('An unexpected error occurred.') });
          }
        }
      },

      signUp: async (body) => {
        const { showError } = useNotificationStore.getState();
        const t = await getT(get().locale, 'auth');

        try {
          const hash = await crypto.subtle.digest(
            'SHA-512',
            new TextEncoder().encode(body.password)
          );
          const hashedPassword = btoa(
            Array.from(new Uint8Array(hash))
              .map((x) => ('00' + x.toString(16)).slice(-2))
              .join('')
          );

          const [oldApiResponse, newApiResponse] = await Promise.all([
            api.post('auth/signup', {
              email: body.email,
              username: 'INVALID ACCOUNT DEVELOPER VALUE FOR TESTING',
              password: hashedPassword,
            }),
            newApi.post('auth/register', {
              email: body.email,
              given_name: body.firstName,
              family_name: body.lastName,
              password: hashedPassword,
            }),
          ]);

          const oldToken = oldApiResponse.data.token;
          const newToken = newApiResponse.data.token;

          set({
            isLoggedIn: true,
            user: newApiResponse.data.user,
            oldToken: {
              value: oldToken.value,
              expiresAt: oldToken.expiresAt,
            },
            newToken: {
              access_token: newToken.access_token,
              refresh_token: newToken.refresh_token,
              token_type: newToken.token_type,
            },
          });

          Router.push(
            `/app?access_token=${encodeURIComponent(
              newToken.access_token
            )}&refresh_token=${encodeURIComponent(newToken.refresh_token)}`
          );
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.data?.message === 'A user with this email already exists.') {
              showError({ error: new Error(t('auth:errors.userAlreadyExists')) });
            } else {
              showError({ error: new Error('An unexpected error occurred.') });
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
          oldToken: null,
          newToken: null,
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