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

const ContactPage: FC = () => {
  const { t } = useTranslation();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('navy.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('purple.500', 'purple.300');
  const linkColor = useColorModeValue('purple.500', 'purple.300');

  return (
    <LandingLayout>
      <Container maxW="100%" centerContent bg={bgColor} minH="100vh">
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

          {/* Commented out form section
          <Box width="100%" mt={16}>
            <Box bg={useColorModeValue('white', 'gray.700')} p={8} borderRadius="xl" boxShadow="lg" width="100%">
              <VStack spacing={6} align="stretch">
                <Heading as="h2" size="lg" color={textColor}>
                  {t('auth:contact.form.title')}
                </Heading>
                <Box>
                  <Text mb={2} fontWeight="medium" color={subTextColor}>{t('auth:contact.form.firstName')}</Text>
                  <Input placeholder={t('auth:contact.form.firstNamePlaceholder')} size="lg" />
                </Box>
                <Box>
                  <Text mb={2} fontWeight="medium" color={subTextColor}>{t('auth:contact.form.email')}</Text>
                  <Input placeholder={t('auth:contact.form.emailPlaceholder')} size="lg" />
                </Box>
                <Box>
                  <Text mb={2} fontWeight="medium" color={subTextColor}>{t('auth:contact.form.message')}</Text>
                  <Textarea placeholder={t('auth:contact.form.messagePlaceholder')} rows={4} size="lg" />
                </Box>
                <Button colorScheme="purple" size="lg" borderRadius="xl">
                  {t('auth:contact.form.submit')}
                </Button>
              </VStack>
            </Box>
          </Box>
          */}
        </Flex>
      </Container>
    </LandingLayout>
  );
};

export default ContactPage;