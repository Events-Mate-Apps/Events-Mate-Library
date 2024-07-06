import { Box, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode, forwardRef } from 'react';
import { Vendor } from '../../interfaces/vendor';
import UpsellModal from './UpsellModal';
import { useRouter } from 'next/router';
import useNotificationStore from '../../stores/notification';
import useTranslation from 'next-translate/useTranslation';

interface UpsellProps {
  vendor: Vendor,
  children?: ReactNode
  isEnabled?: boolean,
  onClick?: () => any,
  w?: string,
  h?: string,
}

const Upsell = forwardRef<HTMLDivElement, UpsellProps>(({ 
  vendor, 
  children, 
  isEnabled, 
  onClick, 
  h, 
  w 
}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showInfo } = useNotificationStore();
  const { t } = useTranslation();
  const { push } = useRouter();

  const handleOpen = () => {
    if (vendor.premiumSubscription === null) {
      push(`/main/pricing?vendorId=${vendor.id}`);
      showInfo({
        title: t('common:upsell.yourSubscriptionIsNotEnoughForThisFeature'),
        description: t('common:upsell.butDontYouWorryHereIsAnUpgrade'),
        position: 'top-center',
        duration: 10000,
      });
      return;
    }
    onOpen();
  };

  return (
    <Box w={w ? w : 'fit-content'} h={h ? h : 'fit-content'} cursor='pointer'>
      <Box ref={ref} onClick={(e) => {
        if (isEnabled) {
          e.preventDefault();
          handleOpen();
          return;
        }
        onClick && onClick();
      }}
      w={w ? w : 'fit-content'} h={h ? h : 'fit-content'}>
        {children}
      </Box>
      {(isOpen && isEnabled) && <UpsellModal isOpen={isOpen} onClose={onClose} vendor={vendor} />}
    </Box>
  );
});

Upsell.displayName = 'Upsell';

export default Upsell;
