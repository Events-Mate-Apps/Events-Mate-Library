import React, { FC } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Container,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import LandingLayout from '../components/dashboard/LandingLayout';
import useTranslation from 'next-translate/useTranslation';
import { isEventsMate } from '../utils/orientation';

const ContactPage: FC = () => {
  const { t } = useTranslation();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('navy.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = isEventsMate() ? '#7551FF' : 'rgb(225, 55, 132)';
  const linkColor = isEventsMate() ? '#7551FF' : 'rgb(225, 55, 132)';

  return (
    <LandingLayout>
      <Container maxW="100%" centerContent bg={bgColor}>
        <Flex 
          direction="column"
          justify="center" 
          align="center"
          maxWidth="800px" 
          width="100%" 
          py={20}
          px={4}
        >
          <VStack spacing={12} align="center" textAlign="center">
            <Box>
              <Heading as="h1" size="2xl" color={textColor} mb={4}>
                {t('auth:contact.title')}
              </Heading>
              <Text fontSize="lg" color={subTextColor} mb={6}>
                {t('auth:contact.subtitle')}
              </Text>
            </Box>
          
            <VStack spacing={6} align="center">
              <Icon as={MdEmail} boxSize={12} color={iconColor} />
              <Text fontWeight="bold" fontSize="xl" color={textColor}>{t('auth:contact.email.label')}</Text>
              <Link href="mailto:info@events-mate.com" color={linkColor} fontSize="lg">
                info@events-mate.com
              </Link>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </LandingLayout>
  );
};

export default ContactPage;