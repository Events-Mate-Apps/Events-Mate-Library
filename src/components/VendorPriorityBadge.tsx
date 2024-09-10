import { FC } from 'react';
import FontAwesomeIconWrapper from '../components/FontAwesomeIconWrapper';

interface VendorPriorityBadgeProps {
  size?: string;
  isPremium?: boolean;
}

const VendorPriorityBadge: FC<VendorPriorityBadgeProps> = ({ size, isPremium }) => {
  const color = '#FFD700'; 

  if (isPremium) {
    return (
      <FontAwesomeIconWrapper
        icon='fa-solid fa-crown'
        color={color}
        size={size}
      />
    );
  }
};

VendorPriorityBadge.defaultProps = {
  size: '20px'
};

export default VendorPriorityBadge;
