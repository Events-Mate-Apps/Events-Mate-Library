import { FC, useState } from 'react';
import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Select } from 'chakra-react-select';

interface LanguageOption {
  flag: string;
  locale: string;
  title: string;
}

const LanguageSelect: FC = () => {
  const router = useRouter();
  const { asPath, pathname, query, locale: initialLocale } = router;

  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLocale ?? 'en');

  const isMobile = useBreakpointValue({ base: true, md: false });

  const darkBg = useColorModeValue('gray.800', 'gray.800');
  const darkText = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const darkBorder = useColorModeValue('gray.600', 'gray.600');

  const onSelect = (value: string) => {
    setSelectedLanguage(value);
    router.push({ pathname, query }, asPath, { locale: value });
  };

  const languages: LanguageOption[] = [
    {
      flag: `🇺🇸`,
      locale: `en`,
      title: `English (US)`,
    },
    {
      flag: `🇸🇰`,
      locale: `sk`,
      title: `Slovenčina`,
    },
    {
      flag: `🇨🇿`,
      locale: `cs`,
      title: `Čeština`,
    },
  ];

  const languageOptions = languages.map((language) => ({
    label: `${language.flag} ${language.title}`,
    value: language.locale,
  }));

  const languageOptionsSmall = languages.map((language) => ({
    label: `${language.flag}`,
    value: language.locale,
  }));

  return (
    <>
      <Box display={{ base: 'none', lg: 'flex' }}>
        <Select
          menuPlacement="top"
          classNamePrefix="react-select"
          placeholder={isMobile ? undefined : 'Select Language'}
          options={languageOptions}
          closeMenuOnSelect={true}
          onChange={(selected) => {
            onSelect(selected?.value || `en`);
          }}
          inputId={'large-language-picker'}
          instanceId={'large-language-picker'}
          name={'large-language-picker'}
          defaultValue={
            selectedLanguage
              ? {
                label: languageOptions.find((a) => a.value === selectedLanguage)?.label,
                value: selectedLanguage,
              }
              : undefined
          }
          chakraStyles={{
            container: (provided) => ({
              ...provided,
              bg: darkBg,
              color: darkText,
            }),
            control: (provided) => ({
              ...provided,
              bg: darkBg,
              borderColor: darkBorder,
            }),
            menu: (provided) => ({
              ...provided,
              bg: darkBg,
            }),
            option: (provided, state) => ({
              ...provided,
              bg: state.isSelected ? darkBorder : darkBg,
              color: darkText,
              _hover: {
                bg: darkBorder,
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: darkText,
            }),
          }}
        />
      </Box>
      <Box display={{ base: 'flex', lg: 'none' }}>
        <Select
          menuPlacement="top"
          classNamePrefix="react-select"
          options={languageOptionsSmall}
          closeMenuOnSelect={true}
          onChange={(selected) => {
            onSelect(selected?.value || `en`);
          }}
          inputId={'small-language-picker'}
          instanceId={'small-language-picker'}
          name={'small-language-picker'}
          defaultValue={
            selectedLanguage
              ? {
                label: languageOptionsSmall.find((a) => a.value === selectedLanguage)?.label,
                value: selectedLanguage,
              }
              : undefined
          }
          chakraStyles={{
            container: (provided) => ({
              ...provided,
              bg: darkBg,
              color: darkText,
            }),
            control: (provided) => ({
              ...provided,
              bg: darkBg,
              borderColor: darkBorder,
            }),
            menu: (provided) => ({
              ...provided,
              bg: darkBg,
            }),
            option: (provided, state) => ({
              ...provided,
              bg: state.isSelected ? darkBorder : darkBg,
              color: darkText,
              _hover: {
                bg: darkBorder,
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: darkText,
            }),
          }}
        />
      </Box>
    </>
  );
};

export default LanguageSelect;