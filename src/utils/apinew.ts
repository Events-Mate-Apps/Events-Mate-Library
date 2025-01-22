import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_NEW_BACKEND_URL;

if (!baseURL) {
  console.warn(`WARNING: NEXT_PUBLIC_BACKEND_URL does not exist. Check your .env file...`);
}
function toCamelCase(key: string): string {
  return key.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('_', '')
  );
}
function transformResponseData(data: any): any {
  if (Array.isArray(data)) {
    return data.map(transformResponseData);
  }
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        toCamelCase(key),
        transformResponseData(value),
      ])
    );
  }
  return data;
}

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && typeof response.data === 'object' && response.data !== null) {
    const transformedData = transformResponseData(response.data);
    return {
      ...response,
      data: transformedData,
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

export const newApi = instance;
