import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { resetAuthTokenHeader, setAuthTokenHeader } from '../utils/api';
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

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  token_type: string;
}


type UserStore = UserState & UserActions;

const decodeJWT = (token: string) => {
  console.log(token)
  const [headerB64, payloadB64] = token.split('.');
  
  return {
    header: JSON.parse(base64UrlDecode(headerB64)),
    payload: JSON.parse(base64UrlDecode(payloadB64))
  };
};

const base64UrlDecode = (str: string): string => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  
  switch (output.length % 4) {
    case 2: output += '=='; break;
    case 3: output += '='; break;
  }
  
  return atob(output);
};

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
        const { showCustomError, showError } = useNotificationStore.getState();
        const t = await getT(get().locale, 'notification');
      
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

          const requestBody = new URLSearchParams();
          requestBody.append('grant_type', 'password');
          requestBody.append('username', body.email);
          requestBody.append('password', hashedPassword);
      

          const response = await newApi.post<AuthToken>('/auth/token', requestBody, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
      
          const { data } = response
          const { access_token, refreshToken } = data;
          const decoded = await decodeJWT(access_token);
          console.log('Verified JWT Header:', decoded);
          console.log('Verified JWT Payload:', decoded);

          set({
            isLoggedIn: true,
            token: {
              expiresAt: access_token,
              secret: refreshToken,
            },
          });
          
          setAuthTokenHeader(access_token)
          Router.push(
            `/app?access_token=${encodeURIComponent(access_token)}&refresh_token=${encodeURIComponent(refreshToken
            )}`
          );
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              showCustomError({
                title: t('notification:invalidCredentials.title'),
                description: t('notification:invalidCredentials.description'),
              });
            } else if (error.response?.data?.detail) {
              showError({ error: new Error(error.response.data.detail) });
            } else {
              showError({ error: new Error('Unexpected server error.') });
            }
          } else {
            showError({ error: new Error('An unexpected error occurred.') });
            console.error('Unexpected error:', error);
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
          const hash = await crypto.subtle.digest(
            'SHA-512',
            new TextEncoder().encode(body.password),
          );
          const hashedPassword = btoa(
            Array.from(new Uint8Array(hash))
              .map((x) => ('00' + x.toString(16)).slice(-2))
              .join(''),
          );
      
          /* eslint-disable camelcase */
          const requestBody = {
            email: body.email,
            given_name: body.firstName,
            family_name: body.lastName,
            password: hashedPassword,
          };
          /* eslint-enable camelcase */
      
          const response = await newApi.post('auth/register', requestBody);
      
          if (response.status === 200 || response.status === 201) {
            await get().signIn({
              email: body.email,
              password: body.password, 
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              const message = error.response.data?.message;
      
              if (message === 'A user with this email already exists.') {
                showError({ error: new Error(t('auth:errors.userAlreadyExists')) });
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
