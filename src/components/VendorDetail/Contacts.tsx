import React from 'react';
import {
  Button,
  Flex,
  Text,
  useClipboard,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { Vendor } from '../../interfaces/vendor';
import useNotificationStore from '../../stores/notification';

interface ContactsProps {
  vendor: Vendor;
  sendStats?: (vendorId: string, event: string) => Promise<void>;
}

const Contacts: React.FC<ContactsProps> = ({ vendor, sendStats }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { showSuccess, showError } = useNotificationStore();
  const { onCopy: onCopyPhone, setValue: setPhoneValue } = useClipboard('');
  const { onCopy: onCopyEmail, setValue: setEmailValue } = useClipboard('');

  const { t } = useTranslation();

  const handleEmail = async () => {
    try {
      sendStats && await sendStats(vendor.id, 'emailViewed');
      setEmailValue(vendor.email);
      onCopyEmail();
      showSuccess({
        title: t('vendors:detail.emailCopied'),
      });
    } catch (error) {
      showError({ error });
    }
  };

  const handlePhone = async () => {
    try {
      sendStats && await sendStats(vendor.id, 'phoneViewed');
      setPhoneValue(vendor.phone);
      onCopyPhone();
      showSuccess({
        title: t('vendors:detail.phoneCopied'),
      });
    } catch (error) {
      showError({ error });
    }
  };
    
  return (
    <Box w='100%'>
      <Text 
        color={textColor}
        fontSize="xl"
        fontWeight="semibold"
        mb="20px"
      >
        {t('vendors:detail.contacts')}
      </Text>
      <Flex direction="column" gap="10px">
        <Flex alignItems='flex-start' gap='10px'>
          <Text 
            color={textColor}
            fontWeight="semibold"
            minWidth="60px"
          >
            {t('vendors:detail.email')}
          </Text>
          <Button
            variant='ghost'
            onClick={handleEmail}
            p="0"
            height="auto"
            textAlign="left"
            whiteSpace="normal"
            wordBreak="break-all"
          >
            <Text 
              color="secondaryGray.800"
              fontWeight='normal'
            >
              {vendor.email}
            </Text>
          </Button>
        </Flex>
        <Flex alignItems='center' gap='10px'>
          <Text
            color={textColor}
            fontWeight="semibold"
            minWidth="60px"
            mb="8px"
          >
            {t('vendors:detail.phone')}
          </Text>
          <Button
            variant='ghost'
            onClick={handlePhone}
            p="0"
            height="auto"
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
    </Box>
  );
};

export default Contacts;