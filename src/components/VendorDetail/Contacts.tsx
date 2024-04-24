import {
    Button,
    Flex,
    Text,
    useClipboard,
    useColorModeValue,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { Vendor } from '../../interfaces/vendor';
import { useNotification } from '~/service/NotificationService';

interface ContactsProps {
    vendor: Vendor;
    sendStats?: (vendorId: string, event: string) => Promise<void>
}

export default function Contacts({ vendor, sendStats }: ContactsProps) {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const { showSuccess, showError } = useNotification()
    const { onCopy, setValue } = useClipboard('');

    const { t } = useTranslation()

    const handleEmail = async () => {
        try {
            sendStats && await sendStats(vendor.id, 'emailViewed')
        } catch (error) {
            showError({ error })
        } finally { 
            window.location.href = `mailto:${vendor.email}`
        }
    };

    const handlePhone = async () => {
        try {
            sendStats && await sendStats(vendor.id, 'phoneViewed')
            setValue(vendor.phone);
            onCopy()
            showSuccess({
                title: t('vendors:detail.copied'),
            })
        } catch (error) {
            showError({ error })
        }
    }
    
    return (
        <Flex 
            flexFlow='column'
            w='100%' 
            gap='20px'
        >
            <Text 
                color={textColor}
                fontSize="xl"
                fontWeight="semibold"
            >
                {t('vendors:detail.contacts')}
            </Text>
            <Flex justifyContent='space-between' flexFlow={{ sm: 'column', md: 'row' }}>
                <Flex alignItems='center' gap='10px' w={{ sm: '100%', md: '50%' }}>
                    <Text 
                        color={textColor}
                        fontWeight="semibold"
                    >
                        {t('vendors:detail.email')}
                    </Text>
                    <Button
                        variant='ghost'
                        onClick={() => handleEmail()}
                    >
                        <Text 
                            color="secondaryGray.800"
                            fontWeight='normal'
                        >
                            {vendor.email}
                        </Text>
                    </Button>
                </Flex>
                <Flex alignItems='center' gap='10px' w={{ sm: '100%', md: '50%' }}>
                    <Text
                        color={textColor}
                        fontWeight="semibold"
                    >
                        {t('vendors:detail.phone')}
                    </Text>
                    <Button
                        variant='ghost'
                        onClick={() => handlePhone()}
                    >
                        <Text 
                            color="secondaryGray.800"
                            fontWeight='normal'
                        >
                            {vendor.phone}
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
