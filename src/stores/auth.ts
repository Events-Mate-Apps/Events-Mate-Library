import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';
import useNotificationStore from './notification';
import { Wedding } from '../interfaces/wedding';
import { AxiosError } from 'axios';
import getT from 'next-translate/getT';

export interface UserData {
  username: string;
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

interface SignInRequest {
  email: string,
  password: string,
}

interface SignUpRequest extends SignInRequest {
  name: string
}

interface UserState {
  isLoggedIn: boolean;
  user: UserData | null;
  token: Token | null; 
  wedding: Wedding | null;
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
  setUsername: (name: string) => void;
  locale?: string,
  setLocale: (locale: string) => void,
}

type UserStore = UserState & UserActions

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      wedding: null,
      locale: undefined,
      setLocale: (locale) => {
        set({
          locale
        })
      },
      signIn: async (body) => {
        const { showError, showCustomError } = useNotificationStore.getState()
        const t = await getT(get().locale, 'notification')

        try {
          const {
            data: { user, token },
          } = await api.post<UserResponseData>('auth/signin', null, {
            headers: {
              Authorization:
                'Basic ' + window.btoa(`${body.email}:${body.password}`),
            },
          });

          set({
            isLoggedIn: true,
            user,
            token: {
              expiresAt: token.expiresAt,
              secret: token.value,
            },
          });          
        } catch (error) {
          console.log('error:', error)
          console.log('code:', (error as AxiosError).response?.status)
          if ((error as AxiosError).response?.status === 401) {
            console.log('code`s 401')
            showCustomError({ 
              title: t('notification:invalidCredentials.title'),
              description: t('notification:invalidCredentials.description')
            })
          } else showError({ error })
        }
      },
      signInWithApple: async ({ user, token }) => {
        set(
          {
            token: {
              expiresAt: token.expiresAt,
              secret: token.value,
            },
            isLoggedIn: true,
            user,
          }
        );
      },
      signUp: async (body) => {
        const { showError } = useNotificationStore.getState()

        try {
          const {
            data: { user, token },
          } = await api.post<UserResponseData>('auth/signup', body);

          set({
            isLoggedIn: true,
            user,
            token: {
              expiresAt: token.expiresAt,
              secret: token.value,
            },
          });
        } catch (error) {
          showError({ error })
        }
      },
      signOut: () => {
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
      setWedding: (wedding) => {
        set({
          wedding
        })
      }
    }),
    {
      name: 'em-auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
