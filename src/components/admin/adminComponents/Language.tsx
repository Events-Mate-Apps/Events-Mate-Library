import React, { FC, useState, useEffect } from "react";
import { Box, Heading, Text, Select, FormControl } from "@chakra-ui/react";
import Card from '../../card/Card';
import { api } from "~/utils/api";

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

  const fetchLanguages = async () => {
    try {
      const { data } = await api.get<Language[]>('support/languages');
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const { data } = await api.get<Currency[]>('support/currencies');
      setCurrencies(data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
    fetchCurrencies();
  }, []);

  return (
    <FormControl>
      <Card mb="20px">
        <Heading as="h2" size="lg" mb={4}>
          Account Settings
        </Heading>
        <Text mb={6}>Here you can change your account information</Text>
        <Box mb={4}>
          <Text mb={2}>Language</Text>
          <Select placeholder="Select Language">
            {languages.map((language) => (
              <option key={language.iso} value={language.iso}>
                {language.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box mb={4}>
          <Text mb={2}>Currency</Text>
          <Select placeholder="Select Currency">
            {currencies.map((currency) => (
              <option key={currency.iso} value={currency.iso}>
                {currency.name}
              </option>
            ))}
          </Select>
        </Box>
      </Card>
    </FormControl>
  );
}

export default LanguageSettings;
