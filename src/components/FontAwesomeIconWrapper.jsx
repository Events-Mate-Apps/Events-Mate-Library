import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
library.add(fas, far, fal);

import { useEffect, useState } from 'react';

const FontAwesomeIconWrapper = ({ iconString, color, size }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>loading...</p>;
  }

  return <FontAwesomeIcon icon={iconString} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;
