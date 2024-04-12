import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp, library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { FC, memo } from 'react';
library.add(fas, far, fal);

interface FAWrapperProps {
  icon: string,
  color?: string,
  size?: SizeProp
}

const FontAwesomeIconWrapper: FC<FAWrapperProps> = ({ icon, color, size }) => {
  const [loading, setLoading] = useState(true);
  const [iconAvailable, setIconAvailable] = useState(false);

  useEffect(() => {
    const checkIconAvailability = () => {
      const iconDefinition = findIconDefinition({ prefix: 'fas', iconName: icon as any });
      if (iconDefinition) {
        setIconAvailable(true);
        setLoading(false);
      } else if (!loading) {
        setTimeout(checkIconAvailability, 100); // Re-check in 100ms
      }
    };

    setLoading(true);
    setIconAvailable(false);
    checkIconAvailability();

    return () => {
      setLoading(false); // Cleanup to prevent setting state after unmount
    };
  }, [icon]);

  if (loading || !iconAvailable) {
    return <div>Loading...</div>;
  }

  return <FontAwesomeIcon icon={icon as IconProp} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;
