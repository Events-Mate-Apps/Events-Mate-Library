import React, { FC } from "react";
import { ChakraProvider, Box, Heading, Text, Select } from "@chakra-ui/react";

const LanguageSettings: FC = () => {
  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt={8}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
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
            {/* Add more languages as needed */}
          </Select>
        </Box>
        <Box mb={4}>
          <Text mb={2}>Currency</Text>
          <Select placeholder="Select Currency">
            <option value="dollars">Dollars</option>
            <option value="euros">Euros</option>
            <option value="yen">Yen</option>
            {/* Add more currencies as needed */}
          </Select>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LanguageSettings;
