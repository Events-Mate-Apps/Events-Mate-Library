import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

interface ThemeSwitchProps {
  isEventsMate?: boolean
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ isEventsMate }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label='color-mode'
      h='60px'
      w='60px'
      bg={isEventsMate ? 'white' : 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
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
  );
}

export default ThemeSwitch;