import React, { FC, useState, useEffect } from "react";
import { Box, Heading, Text, Select, FormControl, Flex, Button } from "@chakra-ui/react";
import Card from '../../card/Card';
import { api } from "~/utils/api";
import useTranslation from "next-translate/useTranslation";
import UserSettings from "../UserSetting";

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

interface UserSettings {
  language: string;
  currency: string;
  allowMarketingEmails: boolean;
  allowSystemEmails: boolean
}

const LanguageSettings: FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(undefined);

  const { t } = useTranslation();

  const fetchLanguages = async () => {
    try {
      const { data } = await api.get<Language[]>('support/languages');
      setLanguages(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const { data } = await api.get<Currency[]>('support/currencies');
      setCurrencies(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const fetchUserSettings = async () => {
    try {
      const { data } = await api.get<UserSettings>('users/settings');
      setUserSettings(data);
      setSelectedLanguage(data.language);
      setSelectedCurrency(data.currency);
    } catch (error) {
      console.error("Error fetching user settings:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await api.put('users/settings/', {
        preferredLanguageISO: selectedLanguage,
        preferredCurrencyISO: selectedCurrency,
        allowMarketingEmails: userSettings?.allowMarketingEmails,  // Example value, adjust as necessary
        allowSystemEmails: userSettings?.allowSystemEmails      // Example value, adjust as necessary
      });
      setUserSettings(prev => prev ? { ...prev, language: selectedLanguage!, currency: selectedCurrency! } : null);
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };
  
  useEffect(() => {
    fetchLanguages();
    fetchCurrencies();
    fetchUserSettings();
  }, []);

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
            <Text mb={2}>Language</Text>
            <Select 
              placeholder={userSettings?.language ?? "Select Language"} 
              onChange={handleLanguageChange}
              value={selectedLanguage}
            >
              {languages.map((language) => (
                <option key={language.iso} value={language.iso}>
                  {language.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box flex="1">
            <Text mb={2}>Currency</Text>
            <Select 
              placeholder={userSettings?.currency ?? "Select Currency"} 
              onChange={handleCurrencyChange}
              value={selectedCurrency}
              color="black" 
            >
              {currencies.map((currency) => (
                <option key={currency.iso} value={currency.iso}>
                  {currency.name}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
        <Button mt={4} colorScheme="teal" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Card>
    </FormControl>
  );
}

export default LanguageSettings;
