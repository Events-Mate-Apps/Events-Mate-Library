import axios, { AxiosInstance } from 'axios'; 
import store from 'store'

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const getToken = (): string | undefined => {
  const user = store.get('user')
  return user.token.secret
} 

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL, 
  headers: { 
    'Content-Type': 'application/json', 
    Authorization: `Bearer ${getToken()}`,
  },
}); 

export const api = instance;