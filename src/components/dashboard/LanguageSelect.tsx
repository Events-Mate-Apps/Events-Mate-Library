import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const LanguageSelector: FC = () => {
  const router = useRouter();

  const languages = [
    { flag: '🇺🇸', title: 'English (US)', value: 'en' },
    { flag: '🇸🇰', title: 'Slovenčina', value: 'sk' },
    { flag: '🇨🇿', title: 'Čeština', value: 'cs' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const onSelect = (value: string) => {
    const selected = languages.find((lang) => lang.value === value) || languages[0];
    setSelectedLanguage(selected);
    router.push(router.pathname, router.asPath, { locale: value });
  };

  const selectBg = useColorModeValue('rgba(228, 228, 231, 0.3)', 'purple.700');
  const textColor = useColorModeValue('white', 'white');
  
  const selectedBg = useColorModeValue('blue.200', 'blue.700');

  return (
    <Box
      p={4}
      borderRadius="16px"
      bgGradient="transparent"
      w="fit-content"
      display="flex"
      alignItems="center"
    >
      <Menu>
        <MenuButton
          border="1px solid rgba(212, 212, 216, 0.2)"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="transparent"
          color={textColor}
          borderRadius="16px"
          _hover={{ bg: selectBg }}
          _active={{ bg: selectBg }}
        >
          <Flex alignItems="center">
            <Text fontSize="lg" fontWeight="500">
              {selectedLanguage.flag}
            </Text>
            <Text fontSize="14px" fontWeight="500" ml="2">
              {selectedLanguage.title}
            </Text>
          </Flex>
        </MenuButton>
        <MenuList border="none" borderRadius="12px" bg={selectBg} boxShadow="md">
          {languages.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => onSelect(lang.value)}
              bg={selectedLanguage.value === lang.value ? selectedBg : 'transparent'}
              _hover={{ bg: selectedLanguage.value === lang.value ? selectedBg : 'gray.200' }}
            >
              <Flex alignItems="center" bg="transparent">
                <Text bg="transparent">{lang.flag}</Text>
                <Text ml={3}>{lang.title}</Text>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;