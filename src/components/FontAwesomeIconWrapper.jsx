import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
library.add(fas, far, fal);


const FontAwesomeIconWrapper = ({ iconString, color, size }) => {  
  return <FontAwesomeIcon icon={iconString} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;
