import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp, library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { FC, useEffect, useState } from 'react';
import { Flex, Progress } from '@chakra-ui/react';
library.add(fas, far, fal);

interface FAWrapperProps {
  icon: string,
  color: string,
  size?: string
}

const FontAwesomeIconWrapper: FC<FAWrapperProps> = ({ icon, color, size }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? 
    <Flex width={size} height={size} align="center" justify="center">
      <FontAwesomeIcon icon={icon as IconProp} color={color} style={{ width: '100%', height: '100%' }} />
    </Flex>  
    : <Progress isIndeterminate />
}

FontAwesomeIconWrapper.defaultProps = {
  size: '20px'
}

export default FontAwesomeIconWrapper;
