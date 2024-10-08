import React from 'react';
import { Box, Flex, Heading, Text, Image, SimpleGrid, BoxProps } from '@chakra-ui/react';

interface StatBoxProps {
  title: string;
  value: string;
  description: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, value, description }) => (
  <Box>
    <Heading size="lg" mb={2}>{value}</Heading>
    <Text fontWeight="bold" mb={1}>{title}</Text>
    <Text fontSize="sm" color="gray.500">{description}</Text>
  </Box>
);

const HorizonStats: React.FC<BoxProps> = () => {
  return (
    <Box maxWidth="1200px" margin="auto" p={8} >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
        <Box maxW={{ base: '100%', md: '50%' }} mb={{ base: 8, md: 0 }}>
          <Heading size="2xl" mb={4}>Boost your workflow with Horizon</Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Uma duis convallis convallis tellus interdum velit laoreet pentesque
            aliquam tortor consequat porta.
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
            <StatBox
              title="Successful Projects"
              value="340+"
              description="Uma duis convallis convallis tellus interdum velit laoreet."
            />
            <StatBox
              title="Annual Percentage Rate"
              value="$10m"
              description="Uma duis convallis convallis tellus interdum velit laoreet."
            />
            <StatBox
              title="Clients Worldwide"
              value="2.8k+"
              description="Uma duis convallis convallis tellus interdum velit laoreet."
            />
            <StatBox
              title="Daily Visits"
              value="7000+"
              description="Uma duis convallis convallis tellus interdum velit laoreet."
            />
          </SimpleGrid>
        </Box>
        <Box maxW={{ base: '100%', md: '45%' }}>
          <Image 
            src="/api/placeholder/400/400" 
            alt="Lightning bolt"
            borderRadius="xl"
            boxShadow="xl"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HorizonStats;