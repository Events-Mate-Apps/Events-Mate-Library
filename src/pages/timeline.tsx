import React from 'react';
import { Box, VStack, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const FAQTimeline = () => {
  const questions = [
    { text: 'Liší se funkce u měsíčního a ročního předplatného?', time: 'Leden 2023' },
    { text: 'Liší se funkce u měsíčního a ročního předplatného?', time: 'Březen 2023' },
    { text: 'Liší se funkce u měsíčního a ročního ?', time: 'Červen 2023' }
  ];

  const textColor = useColorModeValue('navy.600', 'white');
  const lineColor = useColorModeValue('navy.600', 'gray.500');
  const iconBgColor = useColorModeValue('white', 'gray.700');
  const iconColor = useColorModeValue('navy.600', 'white');

  return (
    <Box maxWidth="800px" margin="auto" padding="0 16px 20px" position="relative">
      <Box
        position="absolute"
        left="50%"
        top="0"
        height="calc(100% + 20px)"
        width="2px"
        borderLeft="2px dashed"
        borderColor={lineColor}
        zIndex={0}
      />
      <VStack spacing="100px" align="stretch">
        {questions.map((item, index) => (
          <Flex 
            key={index} 
            alignItems="center" 
            position="relative"
            justifyContent={!(index % 2 === 0) ? 'flex-end' : 'flex-start'}
            marginTop={index === 0 ? '0' : 'auto'}
          >
            <Box
              width="40px"
              height="40px"
              borderRadius="full"
              bg={iconBgColor}
              boxShadow="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              zIndex={1}
              top={index === 0 ? '0' : 'auto'}
            >
              <Icon as={ChevronDownIcon} color={iconColor} boxSize="20px" />
            </Box>
            <Box 
              width="calc(50% - 30px)" 
              textAlign={index % 2 === 0 ? 'right' : 'left'}
              paddingLeft={index % 2 === 0 ? 0 : 4}
              paddingRight={index % 2 === 0 ? 4 : 0}
            >
              <Text color={textColor} fontSize="sm" fontWeight="bold" mb={2}>{item.time}</Text>
              <Text color={textColor} fontWeight="medium">{item.text}</Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default FAQTimeline;