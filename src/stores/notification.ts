import { create } from 'zustand';
import { AlertStatus, ToastPosition, useToast } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Options {
  title?: string;
  description?: string;
  duration?: number;
  isClosable?: boolean;
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
  const toast = useToast();
  const { t } = useTranslation();

  return {
    plainToast: (status: AlertStatus) => {
      toast({
        title: t(`notification:${status}`),
        status,
      });
    },
    showError: async (options?: { error: unknown; duration?: number; isClosable?: boolean }) => {
      if (!options) {
        get().plainToast('error');
        return;
      }

      const err = options.error as CustomError;
      console.error(err.raw?.message || err.message);
      toast({
        title: `${t('notification:error')}!`,
        description: `${t('notification:error')}: ${err.raw?.message || err.message}`,
        status: 'error',
        duration: options.duration,
        isClosable: options.isClosable || true,
      });
    },
    showCustomError: (options: Options) => {
      console.error(`${options.title}: ${options.description}`);
      toast({
        ...options,
        title: options.title || `${t('notification:error')}!`,
        description: options.description,
        status: 'error',
      });
    },
    showSuccess: (options?: Options) => {
      if (!options) {
        get().plainToast('success');
        return;
      }
      toast({
        ...options,
        title: options.title || t('notification:success'),
        description: options.description,
        status: 'success',
      });
    },
    showWarning: (options?: Options) => {
      if (!options) {
        get().plainToast('warning');
        return;
      }
      toast({
        ...options,
        title: options.title || t('notification:warning'),
        description: options.description,
        status: 'warning',
      });
    },
    showInfo: (options?: Options) => {
      if (!options) {
        get().plainToast('info');
        return;
      }
      toast({
        ...options,
        title: options.title || t('notification:info'),
        description: options.description,
        status: 'info',
      });
    },
  };
});

export default useNotificationStore;