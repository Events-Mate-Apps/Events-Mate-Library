import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';
import useNotificationStore from './notification';
import { Wedding } from '../interfaces/wedding';

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

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest extends SignInRequest {
  name: string;
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
  setUsername: (username: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

type UserStore = UserState & UserActions

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      wedding: null,
      signIn: async (body) => {
        const { showError } = useNotificationStore.getState()

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
          showError({ error })
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
        set({
          wedding,
        });
      },
    }),
    {
      name: 'em-auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
