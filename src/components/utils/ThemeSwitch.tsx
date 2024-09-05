import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

interface ThemeSwitchProps {
  isEventsMate?: boolean,
  isOnGradient?: boolean
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ isEventsMate, isOnGradient }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgGradient = isEventsMate 
    ? 'linear(to-tr, brand.900, brand.400)' 
    : 'linear-gradient(to right, #FF328F, #6D055A)'

  const background = isOnGradient ? { bg: 'white' } : { bgGradient }

  return (
    <>
      <IconButton
        aria-label='color-mode'
        h='60px'
        w='60px'
        {...background}
        zIndex='2' 
        position='absolute'
        variant='no-effects'
        right='30px'
        bottom='30px'
        borderRadius='full'
        onClick={toggleColorMode}
        icon={
          <Icon
            h='24px'
            w='24px'
            color={isEventsMate ? 'brand.900' : 'white'}
            as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
          />
        }
      />
    </>
  );
}

export default ThemeSwitch;