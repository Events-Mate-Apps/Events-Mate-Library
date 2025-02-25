import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useNotificationStore from './notification';
import { Wedding } from '../interfaces/wedding';
import { SignInRequest, SignUpRequest } from '../interfaces/user';
import axios from 'axios';
import getT from 'next-translate/getT';
import Router from 'next/router';
import { decodeJWT, toSnakeCase } from '../utils/decode';
import { newApi, removeAuthTokenHeader, setAuthTokenHeader } from '../utils/apinew';
// import { decodeJWT } from '../utils/decode'
import { AxiosResponse } from 'axios';

export interface UserData {
  //TODO: match it with backend
  username: string;
  //firstname: string;
  firstName: string;
  //surname: string;
  lastName: string;
  // id: string;
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
  accessToken?: string;
  expiresAt?: string;
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
  refreshAccessToken: () => Promise<boolean>;
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

          const { accessToken, refreshToken } = response.data;
          //TODO: add user information after it gets added
          const decoded = await decodeJWT(refreshToken);
          console.log(decoded.payload.givenName)

          set({
            isLoggedIn: true,
            token: {
              accessToken: accessToken,
              secret: refreshToken,
            },
            // user: {
            //   email: decoded.payload.exp,
            //   firstName: decoded.payload.givenName,
            //   lastName: decoded.payload.familyName
            // }
          });
          
          setAuthTokenHeader(accessToken)
          Router.push(
            `/app?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken
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
        const { showError, showCustomError } = useNotificationStore.getState();
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
      
          const requestBody = {
            email: body.email,
            givenName: body.firstName,
            familyName: body.lastName,
            password: hashedPassword,
          };
      
          const snakeCaseBody = toSnakeCase(requestBody);
      
          const response = await newApi.post('auth/register', snakeCaseBody);
      
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
              const detail = error.response.data?.detail;
      
              if (message === 'A user with this email already exists.') {
                showCustomError({
                  title: t('auth:errors.userExists'),
                  description: t('auth:errors.userAlreadyExists')
                });
              } else if (detail) {
                showError({ 
                  error: new Error(detail)
                });
              } else if (message) {
                showError({ 
                  error: new Error(message)
                });
              } else {
                showError({ 
                  error: new Error('An unexpected error occurred')
                });
              }
            } else if (error.request) {
              showError({ 
                error: new Error('No response from the server. Please try again later.')
              });
            } else {
              showError({ 
                error: new Error(error.message)
              });
            }
          } else {
            showError({ 
              error: new Error('An unexpected error occurred')
            });
          }
        }
      },
      
      signOut: () => {
        removeAuthTokenHeader();
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        });
      },
      refreshAccessToken: async () => {
        const { token } = get();
        if (!token || !token.secret) {
          get().signOut();
          return false;
        }

        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', 'refresh_token');
        requestBody.append('refresh_token', token.secret);

        try {
          const response: AxiosResponse<AuthToken> = await newApi.post(
            '/auth/token',
            requestBody.toString(),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          set((state) => ({
            ...state,
            token: {
              expiresAt: accessToken,
              secret: newRefreshToken,
            },
          }));

          setAuthTokenHeader(accessToken);
          return true;
        } catch (error) {
          get().signOut();
          return false;
        }
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
