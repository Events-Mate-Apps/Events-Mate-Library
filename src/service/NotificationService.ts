import { AlertStatus, ToastPosition, useToast } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

interface Options {
    title?: string, 
    description?: string,
    duration?: number,
    isClosable?: boolean,
    position?: ToastPosition
}

interface NotificationMethods {
    showError: (options?: { error: unknown, duration?: number, isClosable?: boolean }) => void;
    showCustomError: (options: Options) => void;
    showSuccess: (options?: Options) => void;
    showWarning: (options?: Options) => void;
    showInfo: (options?: Options) => void;
}

export function useNotification(): NotificationMethods {
    const toast = useToast();
    const { t } = useTranslation();

    const plainToast = (status: AlertStatus) => {
        toast({
            title: t(`notification:${status}`),
            status,
        });
    }

    const showError = (options?: { error: unknown, duration?: number, isClosable?: boolean }) => {
        if (!options) {
            plainToast('error')
            return
        }

        const err = options.error as CustomError;
        console.error(err.raw?.message || err.message);
        toast({
            title: `${t('notification:error')}!`,
            description: `${t('notification:error')}: ${err.raw?.message || err.message}`,
            status: 'error',
            duration: options.duration,
            isClosable: options.isClosable,
        });
    };

    const showCustomError = (options: Options) => {
        console.error(`${options.title}: ${options.description}`);
        toast({
            ...options,
            title: options.title || `${t('notification:error')}!`,
            description: options.description,
            status: 'success',
        });
    };

    const showSuccess = (options?: Options) => {
        if (!options) {
            plainToast('success')
            return
        }
        toast({
            ...options,
            title: options.title || t('notification:success'),
            description: options.description,
            status: 'success',
        });
    };

    const showWarning = (options?: Options) => {
        if (!options) {
            plainToast('warning')
            return
        }
        toast({
            ...options,
            title: options.title || t('notification:warning'),
            description: options.description,
            status: 'warning',
        });
    };

    const showInfo = (options?: Options) => {
        if (!options) {
            plainToast('info')
            return
        }
        toast({
            ...options,
            title: options.title || t('notification:info'),
            description: options.description,
            status: 'info',
        });
    };

    return {
        showError,
        showCustomError,
        showSuccess,
        showWarning,
        showInfo,
    };
}