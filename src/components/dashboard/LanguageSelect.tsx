import { FC, useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const LanguageSelector: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const languages = [
    { flag: '🇺🇸', title: 'English (US)', value: 'en' },
    { flag: '🇸🇰', title: 'Slovenčina', value: 'sk' },
    { flag: '🇨🇿', title: 'Čeština', value: 'cs' },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const bgGradient = useColorModeValue(
    'linear(to-r, pink.400, purple.500)',
    'linear(to-r, pink.700, purple.900)'
  );
  const buttonBg = useColorModeValue('white', 'purple.800');
  const textColor = useColorModeValue('purple.900', 'white');

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bgGradient={bgGradient}
      p={6}
      borderRadius="16px"
      w="fit-content"
    >
      {/* Language Selector */}
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg={buttonBg}
          borderRadius="16px"
          color={textColor}
          fontWeight="500"
          px={6}
          _hover={{ bg: buttonBg }}
          _active={{ bg: buttonBg }}
        >
          <Flex alignItems="center">
            <Text>{selectedLanguage.flag}</Text>
            <Text ml={2}>{selectedLanguage.title}</Text>
          </Flex>
        </MenuButton>
        <MenuList bg={buttonBg} border="none" borderRadius="12px">
          {languages.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => setSelectedLanguage(lang)}
              justifyContent="space-between"
            >
              <Text>{lang.flag}</Text>
              <Text>{lang.title}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Theme Toggle Button */}
      <IconButton
        ml={4}
        onClick={toggleColorMode}
        bg={buttonBg}
        borderRadius="full"
        icon={colorMode === 'light' ? <SunIcon color="pink.500" /> : <MoonIcon color="pink.300" />}
        aria-label="Toggle Theme"
        size="lg"
        _hover={{ bg: buttonBg }}
      />
    </Flex>
  );
};

export default LanguageSelector;
