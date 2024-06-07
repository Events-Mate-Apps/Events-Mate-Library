import React, { FC, useState, useEffect } from "react";
import { Box, Heading, Text, Select, FormControl } from "@chakra-ui/react";
import Card from '../../card/Card';
import { api } from "~/utils/api";

const LanguageSettings: FC = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);

  const fetchCurrencies = async () => {
    try {
      const { data } = await api.get('support/currencies');
      setCurrencies(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
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
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </Select>
        </Box>
        <Box mb={4}>
          <Text mb={2}>Currency</Text>
          <Select placeholder="Select Currency">
            {/* {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))} */}
          </Select>
        </Box>
      </Card>
    </FormControl>
  );
}

export default LanguageSettings;
