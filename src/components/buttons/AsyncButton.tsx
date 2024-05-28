import { Button as ChakraButton, ButtonProps, forwardRef } from '@chakra-ui/react';
import { FC, useState } from 'react';

interface AsyncButtonProps extends ButtonProps {
  onClick?: () => Promise<void>;
}

const AsyncButton: FC<AsyncButtonProps> = forwardRef(({ onClick, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      onClick && await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraButton 
      ref={ref}
      onClick={handleClick}
      isLoading={isLoading}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
});

export default AsyncButton;