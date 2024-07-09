import { Button as ChakraButton, ButtonProps, forwardRef } from '@chakra-ui/react';
import { FC, useState } from 'react';
import NextLink from 'next/link';

interface AsyncButtonProps extends ButtonProps {
  onClick: () => Promise<void>;
  href?: string;
}

const AsyncButton: FC<AsyncButtonProps> = forwardRef(({ onClick, href, ...props }, ref) => {
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
    <>
      {
        href ? <ChakraButton 
          ref={ref}
          onClick={handleClick}
          isLoading={isLoading}
          {...props}
        >
          {props.children}
        </ChakraButton> 
          : 
          <ChakraButton
            as={NextLink} 
            ref={ref}
            href={href}
            onClick={handleClick}
            isLoading={isLoading}
            {...props}
          >
            {props.children}
          </ChakraButton>
      }
    </>
  );
});

export default AsyncButton;