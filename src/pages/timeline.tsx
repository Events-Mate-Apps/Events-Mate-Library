import React from 'react';
import { Box, Text, Icon, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const TimeLine = () => {
  const questions = [
    'Liší se funkce u měsíčního a ročního předplatného?',
    'Liší se funkce u měsíčního a ročního předplatného?',
    'Liší se funkce u měsíčního a ročního ?'
  ];

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Accordion allowToggle>
        {questions.map((question, index) => (
          <AccordionItem key={index} border="none" mb={4}>
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  _hover={{ bg: 'gray.50' }}
                  p={4}
                >
                  <Box flex="1" textAlign="left">
                    <Text color="#4A5568" fontWeight="medium">{question}</Text>
                  </Box>
                  <Icon
                    as={ChevronDownIcon}
                    transform={isExpanded ? 'rotate(-180deg)' : undefined}
                    transition="transform 0.2s"
                    color="#4A5568"
                  />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text color="gray.600">
                    Here you can add the answer to the question. This text is just a placeholder.
                  </Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default TimeLine;