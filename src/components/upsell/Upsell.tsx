
import { Box, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { Vendor } from '../../interfaces/vendor';
import UpsellModal from './UpsellModal';
import { useRouter } from 'next/router';
import { useNotification } from '../../service/NotificationService';
import useTranslation from 'next-translate/useTranslation';

interface TrackEventParams {
    category?: string;
    action: string;
    label: string;
    page: string;
    params?: Record<string, any>
}

interface UpsellProps {
  vendor: Vendor,
  children?: JSX.Element
  isEnabled?: boolean,
  onClick?: () => any,
}

export enum Interval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

const Upsell: FC<UpsellProps> = ({ vendor, children, isEnabled, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { showInfo } = useNotification()
  const { t } = useTranslation()
  const { push } = useRouter()

  const handleOpen = () => {
    if (vendor.premiumSubscription === null) {
      push(`/main/pricing?vendorId=${vendor.id}`);
      showInfo({
        title: t('common:upsell.yourSubscriptionIsNotEnoughForThisFeature'),
        description: t('common:upsell.butDontYouWorryHereIsAnUpgrade'),
        position: 'bottom',
        duration: 10000,
        isClosable: true,
      })
      return
    }
    onOpen()
  }

  return (
    <Box
      w='fit-content'
      h='fit-content'
    >
      <Box
        onClick={(e) => {
          if (isEnabled) {
            e.preventDefault()
            handleOpen()
            return
          }
          onClick && onClick()
        }}
        w='fit-content'
        h='fit-content'
      >
        {children}
      </Box>
      {(isOpen && isEnabled) && <UpsellModal
        isOpen={isOpen}
        onClose={onClose}
        vendor={vendor}
      />}
    </Box>
  );
}

export default Upsell;
