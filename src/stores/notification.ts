import { create } from 'zustand';
import { ToastPosition } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { toast } from 'react-toastify';
import { getNotificationMessage } from './helpers/notification';

type AlertStatus = 'info' | 'success' | 'error' | 'warn'

interface Options {
  title?: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
}

interface NotificationState {
  showError: (options?: { error: unknown; duration?: number; isClosable?: boolean }) => Promise<void>;
  showCustomError: (options: Options) => void;
  showSuccess: (options?: Options) => void;
  showWarning: (options?: Options) => void;
  showInfo: (options?: Options) => void;
  plainToast: (status: AlertStatus) => void;
}

const useNotificationStore = create<NotificationState>((set, get) => {
  const { t } = useTranslation();

  return {
    plainToast: (status) => {
      toast[status]( getNotificationMessage({
        title: `${t(`notification:${status}`)}!`,
      }))
    }, 
    showError: async (options?: { error: unknown; duration?: number; isClosable?: boolean }) => {
      if (!options) {
        get().plainToast('error');
        return;
      }

      const err = options.error as CustomError;
      console.error(err.raw?.message || err.message);
      toast.error( getNotificationMessage({
        title: `${t('notification:error')}!`,
        description: `${t('notification:error')}: ${err.raw?.message || err.message}`,
      }) ,{ autoClose: options.duration, });
    },
    showCustomError: (options: Options) => {
      console.error(`${options.title}: ${options.description}`);
      toast.error( getNotificationMessage({
        title: `${t('notification:error')}!`,
        description: options.description,
      }) ,{ autoClose: options.duration, });
    },
    showSuccess: (options?: Options) => {
      if (!options) {
        get().plainToast('success');
        return;
      }
      toast.success( getNotificationMessage({
        title: `${t('notification:success')}!`,
        description: options.description
      }) ,{ autoClose: options.duration, });
    },
    showWarning: (options?: Options) => {
      if (!options) {
        get().plainToast('warn');
        return;
      }
      toast.warn( getNotificationMessage({
        title: `${t('notification:warn')}!`,
        description: options.description
      }) ,{ autoClose: options.duration, });
    },
    showInfo: (options?: Options) => {
      if (!options) {
        get().plainToast('info');
        return;
      }
      toast.info( getNotificationMessage({
        title: `${t('notification:info')}!`,
        description: options.description
      }) ,{ autoClose: options.duration, });
    },
  };
});

export default useNotificationStore;