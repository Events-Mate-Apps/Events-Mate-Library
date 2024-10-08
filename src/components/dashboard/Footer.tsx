import { FC, ReactNode } from 'react';
import {
  Box,
  Container,
  Stack,
  Icon,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  useColorMode,
  Button
} from '@chakra-ui/react';
import { FaInstagram } from 'react-icons/fa';
import StoreLinks from './StoreLinks';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import LanguageSelect from './LanguageSelect';
import useTranslation from 'next-translate/useTranslation';
import dayjs from 'dayjs';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};
const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const currentYear = dayjs().year()
  const { t } = useTranslation();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>{t('common:company')}</ListHeader>
            <Link href={'/main/about-us'}>{t('common:about-us')}</Link>
            <Link href={'/main/about-app'}>{t('common:about-app')}</Link>
            <Link href={'/main/contact'}>{t('common:contact-us')}</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>{t('common:support')}</ListHeader>
            <Link href={'#'}>{t('common:help-center')}</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>{t('common:legal')}</ListHeader>
            <Link href={'/legal/privacy-policy'}>{t('common:privacyPolicy')}</Link>
            <Link href={'/legal/terms-and-conditions'}>{t('auth:termsAndConditions')}</Link>
          </Stack>

          <Stack display={{ lg: 'flex', base: 'none' }} align="start">
            <ListHeader>{t('common:install-app')}</ListHeader>
            <StoreLinks />
          </Stack>
        </SimpleGrid>
      </Container>

      <Box justifyContent='center' mb='20px' display={{ lg: 'none', base: 'flex' }}>
        <StoreLinks />
      </Box>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text>© {currentYear} Events Mate Apps s.r.o | All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            {/*TODO uncomment YouTube as soon as it is relevant*/}
            {/*<SocialButton label={'YouTube'} href={'#'}>*/}
            {/*  <FaYoutube />*/}
            {/*</SocialButton>*/}
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/weddmate_cz/'}>
              <FaInstagram />
            </SocialButton>
            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={8}
              h={8}
              cursor={'pointer'}
              as={'a'}
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}
              onClick={toggleColorMode}
            >
              <Icon
                as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
              />
            </Button>
            <LanguageSelect />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
export default Footer