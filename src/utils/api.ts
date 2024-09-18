import axios, { AxiosInstance } from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!baseURL) {
  console.warn(`WARNING: NEXT_PUBLIC_BACKEND_URL does not exist. Check your .env file...`);
}

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthTokenHeader = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const resetAuthTokenHeader = () => {
  instance.defaults.headers.common['Authorization'] = null
};

export const api = instance;
