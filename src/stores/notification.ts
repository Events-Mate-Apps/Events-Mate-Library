import { create } from 'zustand';
import getT from 'next-translate/getT';

import { toast, ToastPosition } from 'react-toastify';
import { getNotificationMessage } from './helpers/notification';
import { AxiosError } from 'axios'

type AlertStatus = 'info' | 'success' | 'error' | 'warn'

interface Options {
  title: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
}

interface NotificationState {
  showError: (options?: { error: unknown; duration?: number, position?: ToastPosition }) => Promise<void>;
  showCustomError: (options: Options) => void;
  showSuccess: (options?: Options) => void;
  showWarning: (options?: Options) => void;
  showInfo: (options?: Options) => void;
  plainToast: (status: AlertStatus) => void;
  locale?: string,
  setLocale: (locale: string) => void,
}

const useNotificationStore = create<NotificationState>((set, get) => {
  return {
    locale: undefined,
    setLocale: (locale) => {
      set({
        locale
      })
    },
    plainToast: async (status) => {
      const t = await getT(get().locale, 'notification')
      toast[status]( getNotificationMessage({
        title: `${t(`${status}`)}`,
      }))
    }, 
    showError: async (options) => {
      const t = await getT(get().locale, 'notification');
    
      if (!options) {
        get().plainToast('error');
        return;
      }
    
      const error = options.error;
    
      // Check if the error is an AxiosError
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status || 0;
        const errorMessage = error.response?.data?.message || 'An unknown error occurred';
    
        // If the error is a client-side error (4xx)
        if (statusCode >= 400 && statusCode < 500) {
          toast.error(
            getNotificationMessage({
              title: `${t('error')}`,
              description: errorMessage,
            }),
            { autoClose: options.duration || 5000, position: options.position }
          );
        } else {
          // Handle other types of errors (server errors, etc.)
          toast.error(
            getNotificationMessage({
              title: `${t('error')}`,
              description: `${t('error')}: ${errorMessage}`,
            }),
            { autoClose: options.duration || 5000, position: options.position }
          );
        }
      } else {
        // Fallback if the error is not an AxiosError
        const err = error as CustomError;
        toast.error(
          getNotificationMessage({
            title: `${t('error')}`,
            description: `${t('error')}: ${err.raw?.message || err.message || 'An unknown error occurred.'}`,
          }),
          { autoClose: options.duration || 5000, position: options.position }
        );
      }
    },    
    showCustomError: async (options: Options) => {
      console.error(`${options.title}: ${options.description}`);
      toast.error( getNotificationMessage({
        title: options.title,
        description: options.description,
      }) ,{ autoClose: options.duration || 5000, position: options.position });
    },
    showSuccess: async (options?: Options) => {
      if (!options) {
        get().plainToast('success');
        return;
      }
      toast.success( getNotificationMessage({
        title: options.title,
        description: options.description
      }) ,{ autoClose: options.duration || 5000, position: options.position });
    },
    showWarning: async (options?: Options) => {
      if (!options) {
        get().plainToast('warn');
        return;
      }
      toast.warn( getNotificationMessage({
        title: options.title,
        description: options.description
      }) ,{ autoClose: options.duration || 5000, position: options.position });
    },
    showInfo: async (options?: Options) => {
      if (!options) {
        get().plainToast('info');
        return;
      }
      toast.info( getNotificationMessage({
        title: options.title,
        description: options.description
      }) ,{ autoClose: options.duration || 5000, position: options.position });
    },
  };
});

export default useNotificationStore;