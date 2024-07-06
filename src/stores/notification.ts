import { create } from 'zustand';
import { ToastPosition } from '@chakra-ui/react';
import getT from 'next-translate/getT';

import { toast } from 'react-toastify';
import { getNotificationMessage } from './helpers/notification';

type AlertStatus = 'info' | 'success' | 'error' | 'warn'

interface Options {
  title: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
}

interface NotificationState {
  showError: (options?: { error: unknown; duration?: number }) => Promise<void>;
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
    showError: async (options?: { error: unknown; duration?: number }) => {
      const t = await getT(get().locale, 'notification')

      if (!options) {
        get().plainToast('error');
        return;
      }

      const err = options.error as CustomError;
      console.error(err.raw?.message || err.message);
      toast.error( getNotificationMessage({
        title: `${t('error')}`,
        description: `${t('error')}: ${err.raw?.message || err.message}`,
      }) ,{ autoClose: options.duration || 5000, });
    },
    showCustomError: async (options: Options) => {
      console.error(`${options.title}: ${options.description}`);
      toast.error( getNotificationMessage({
        title: options.title,
        description: options.description,
      }) ,{ autoClose: options.duration, });
    },
    showSuccess: async (options?: Options) => {
      if (!options) {
        get().plainToast('success');
        return;
      }
      toast.success( getNotificationMessage({
        title: options.title,
        description: options.description
      }) ,{ autoClose: options.duration, });
    },
    showWarning: async (options?: Options) => {
      if (!options) {
        get().plainToast('warn');
        return;
      }
      toast.warn( getNotificationMessage({
        title: options.title,
        description: options.description
      }) ,{ autoClose: options.duration, });
    },
    showInfo: async (options?: Options) => {
      if (!options) {
        get().plainToast('info');
        return;
      }
      toast.info( getNotificationMessage({
        title: options.title,
        description: options.description
      }) ,{ autoClose: options.duration, });
    },
  };
});

export default useNotificationStore;