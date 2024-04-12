import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp, findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
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
  const [iconExists, setIconExists] = useState(true);

  useEffect(() => {
    const iconDefinition = findIconDefinition({ prefix: 'fas', iconName: icon as any });
    if (!iconDefinition) {
      console.error(`Icon ${icon} not found in FontAwesome library.`);
      setIconExists(false);
    }
    setLoading(false);
  }, [icon]);   

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!iconExists) {
    return <div>Icon not available</div>;
  }

  return <FontAwesomeIcon icon={icon as IconProp} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;
