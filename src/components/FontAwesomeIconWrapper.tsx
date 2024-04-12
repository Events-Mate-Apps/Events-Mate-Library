import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp, library } from '@fortawesome/fontawesome-svg-core';
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

  useEffect(() => {
    const checkIcon = async () => {
      try {
        // Simulate async loading of icon
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay for demonstration
        setLoading(false); // Set loading to false once the icon is loaded
      } catch (error) {
        console.error("Error loading icon:", error);
        setLoading(false);
      }
    };

    checkIcon();
  }, [icon]); // Dependency array includes icon to re-check whenever the icon prop changes

  if (loading) {
    return <div>Loading...</div>; // Render a loading state or a spinner
  }

  return <FontAwesomeIcon icon={icon as IconProp} color={color} size={size} />;
};

export default FontAwesomeIconWrapper;
