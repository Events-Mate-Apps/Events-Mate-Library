import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconProp,
  SizeProp,
  library,
  findIconDefinition,
  IconPrefix // Importování typu IconPrefix
} from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { FC } from 'react';

// Přidání ikon do knihovny
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
      // Explicitně deklarované prefixy jako IconPrefix[]
      const prefixes: IconPrefix[] = ['fas', 'far', 'fal'];
      let iconDefinition = null;
      for (const prefix of prefixes) {
        iconDefinition = findIconDefinition({ prefix, iconName: icon as any });
        if (iconDefinition) break;
      }
      
      if (iconDefinition) {
        setIconAvailable(true);
        setLoading(false);
      } else {
        setTimeout(checkIconAvailability, 100); // Re-check in 100ms
      }
    };

    setLoading(true);
    setIconAvailable(false);
    checkIconAvailability();

    return () => {
      setLoading(false);
    };
  }, [icon]);

  if (loading || !iconAvailable) {
    return <div>Loading...</div>;
  }

  return <FontAwesomeIcon icon={icon as IconProp} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;
