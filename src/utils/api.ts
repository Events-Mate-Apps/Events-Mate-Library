import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

function toCamelCase(key: string): string {
  return key.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('_', '').replace('-', ''),
  );
}

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && typeof response.data === 'object') {
    const camelCasedData = Object.fromEntries(
      Object.entries(response.data).map(([key, value]) => [
        toCamelCase(key),
        value,
      ])
    );
    return {
      ...response,
      data: camelCasedData,
    };
  }
  return response;
});

export const setAuthTokenHeader = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const resetAuthTokenHeader = () => {
  instance.defaults.headers.common['Authorization'] = null;
};

export const api = instance;
