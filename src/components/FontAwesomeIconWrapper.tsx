import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp, library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { FC } from 'react';
library.add(fas, far, fal);

interface FAWrapperProps {
  icon: string,
  color?: string,
  size?: SizeProp
}


const FontAwesomeIconWrapper: FC<FAWrapperProps> = ({ icon, color, size }) => {  
  return <FontAwesomeIcon icon={icon as IconProp} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;