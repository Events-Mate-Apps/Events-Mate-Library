import React, { FC, useState, useEffect } from 'react';
import { Box, Heading, Text, FormControl, Flex, Button, Card } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { api } from '../../../utils/api';
import useTranslation from 'next-translate/useTranslation';
import { isEventsMate } from '../../../utils/orientation';
import { UserSettingsInterface } from '../../../interfaces/user';
import useNotificationStore from '../../../stores/notification';

interface Language {
  iso: string;
  name: string;
}

interface Currency {
  ISOdigits: number;
  ISOnum: number;
  decimals: number;
  demonym: string;
  iso: string;
  majorPlural: string;
  majorSingle: string;
  minorPlural: string;
  minorSingle: string;
  name: string;
  numToBasic: number;
  symbol: string;
  symbolNative: string;
}

const LanguageSettings: FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettingsInterface | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(undefined);

  const { t } = useTranslation();
  const { showError, showSuccess } = useNotificationStore();

  const fetchLanguages = async () => {
    try {
      const { data } = await api.get<Language[]>('support/languages');
      setLanguages(data);
    } catch (error) {
      showError({ error })
    }
  };

  const fetchCurrencies = async () => {
    try {
      const { data } = await api.get<Currency[]>('support/currencies');
      setCurrencies(data);
    } catch (error) {
      showError({ error })
    }
  };

  const fetchUserSettings = async () => {
    try {
      const { data } = await api.get<UserSettingsInterface>('users/settings');
      setUserSettings(data);
      setSelectedLanguage(data.preferredLanguageISO);
      setSelectedCurrency(data.preferredCurrencyISO);
    } catch (error) {
      showError({ error })
    }
  };

  const handleSaveChanges = async () => {
    if (selectedLanguage && selectedCurrency) {
      const requestBody = {
        allowMarketingEmails: userSettings?.allowMarketingEmails || false,
        allowSystemEmails: userSettings?.allowSystemEmails || false,
        preferredLanguageISO: selectedLanguage,
        preferredCurrencyISO: selectedCurrency,
      };
      try {
        await api.put('users/settings/', requestBody);
        setUserSettings(prev => prev ? { ...prev, preferredLanguageISO: selectedLanguage, preferredCurrencyISO: selectedCurrency } : null);
        showSuccess();
      } catch (error) {
        showError({ error });
      }
    } else {
      console.error('Language or Currency not selected');
    }
  };

  const handleLanguageChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setSelectedLanguage(selectedOption.value);
    }
  };

  const handleCurrencyChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setSelectedCurrency(selectedOption.value);
    }
  };

  useEffect(() => {
    fetchLanguages();
    fetchCurrencies();
    fetchUserSettings();
  }, []);

  if (!userSettings || languages.length === 0 || currencies.length === 0) {
    return <Text>{t('common:loading')}</Text>;
  }

  return (
    <FormControl>
      <Card mb="20px">
        <Heading as="h2" size="lg" mb={4}>
          {t('user:settings.accountSettings')}
        </Heading>
        <Text mb={6}>
          {t('user:settings.changeInformation')}
        </Text>
        <Flex mb={4} gap={4}>
          <Box flex="1">
            <Text mb={2}>
              {t('common:language')}
            </Text>
            <Select
              placeholder={languages.find(lang => lang.iso === userSettings.preferredLanguageISO)?.name || 'Select language...'}
              options={languages.map((language) => ({
                label: language.name,
                value: language.iso
              }))}
              menuPortalTarget={document.getElementById('menu-portal')}
              onChange={handleLanguageChange}
              value={selectedLanguage ? { label: languages.find(lang => lang.iso === selectedLanguage)?.name || '', value: selectedLanguage } : null}
              defaultValue={userSettings.preferredLanguageISO ? { label: languages.find(lang => lang.iso === userSettings.preferredLanguageISO)?.name || '', value: userSettings.preferredLanguageISO } : undefined}
            />
          </Box>
          <Box flex="1">
            <Text mb={2}>
              {t('common:currency')}
            </Text>
            <Select
              placeholder={currencies.find(curr => curr.iso === userSettings.preferredCurrencyISO)?.name || 'Select currency...'}
              options={currencies.map((currency) => ({
                label: currency.name,
                value: currency.iso
              }))}
              menuPortalTarget={document.getElementById('menu-portal')}
              onChange={handleCurrencyChange}
              value={selectedCurrency ? { label: currencies.find(curr => curr.iso === selectedCurrency)?.name || '', value: selectedCurrency } : null}
              defaultValue={userSettings.preferredCurrencyISO ? { label: currencies.find(curr => curr.iso === userSettings.preferredCurrencyISO)?.name || '', value: userSettings.preferredCurrencyISO } : undefined}
            />
          </Box>
        </Flex>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={handleSaveChanges}
          backgroundColor={isEventsMate() ? 'brand.900' : '#e13784'}
          color="white"
          _hover={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
          _active={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
        >
          {t('common:saveChanges')}
        </Button>
      </Card>
    </FormControl>
  );
};

export default LanguageSettings;
