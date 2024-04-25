
import { Box, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { Vendor } from '../../interfaces/vendor';
import UpsellModal from './UpsellModal';
import { useRouter } from 'next/router';

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
  const { push } = useRouter()

  const handleOpen = () => {
    if (vendor.premiumSubscription === null) {
      push(`/main/pricing?vendorId=${vendor.id}`);
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
