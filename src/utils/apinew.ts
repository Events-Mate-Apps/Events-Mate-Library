import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { transformResponseData  } from './helpers/caseConvertor';

export const baseURL = process.env.NEXT_PUBLIC_NEW_BACKEND_URL;

if (!baseURL) {
  console.warn(`WARNING: NEXT_PUBLIC_BACKEND_URL does not exist. Check your .env file...`);
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

export const removeAuthTokenHeader = () => {
  instance.defaults.headers.common['Authorization'] = null;
};


export const newApi = instance;
