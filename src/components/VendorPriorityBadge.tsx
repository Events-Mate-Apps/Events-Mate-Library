import { FC } from 'react';
import FontAwesomeIconWrapper from '../components/FontAwesomeIconWrapper';

interface VendorPriorityBadgeProps {
  priority: number,
  size?: string
}

const VendorPriorityBadge: FC<VendorPriorityBadgeProps> = ({ priority, size }) => {
  const color: Map<number, string> = new Map([
    [1, '#11047A'],
    [2, '#CD7F32'],
    [3, '#C0C0C0'],
    [4, '#FFD700'],
]);

  return color.get(priority) && <FontAwesomeIconWrapper
    icon='fa-solid fa-crown'
    color={color.get(priority) || 'black'}
    size={size}
  />
}

VendorPriorityBadge.defaultProps = {
  size: '20px'
}

export default VendorPriorityBadge;
