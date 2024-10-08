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

const AboutApp: React.FC<BoxProps> = () => {
  return (
    <Box maxWidth="1200px" margin="auto" p={8} >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
        <Box maxW={{ base: '100%', md: '50%' }} mb={{ base: 8, md: 0 }}>
          <Heading size="2xl" mb={4}>Plánujte svatby snadno s EventsMate</Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            EventsMate je vaším spolehlivým partnerem pro organizaci dokonalé svatby. S našimi zkušenostmi a širokou sítí dodavatelů vám pomůžeme vytvořit nezapomenutelný den.
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
            <StatBox
              title="Nových nevěst měsíčně"
              value="300+"
              description="Každý měsíc nám důvěřuje více než 300 nových nevěst s plánováním jejich svatby."
            />
            <StatBox
              title="Aktivních nevěst"
              value="2000"
              description="Aktuálně pomáháme 2000 nevěstám s přípravou jejich vysněného dne."
            />
            <StatBox
              title="Prověřených dodavatelů"
              value="150+"
              description="Spolupracujeme s více než 150 kvalitními dodavateli pro všechny aspekty vaší svatby."
            />
            <StatBox
              title="Let zkušeností"
              value="5+"
              description="Již více než 5 let pomáháme párům uskutečnit jejich svatební sny."
            />
          </SimpleGrid>
        </Box>
        <Box maxW={{ base: '100%', md: '45%' }}>
          <Image 
            src="/icon.png" 
            alt="Svatební pár"
            borderRadius="xl"
            boxShadow="xl"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutApp;