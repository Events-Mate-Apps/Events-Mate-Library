import { Flex, Heading, Text, useColorModeValue, useBreakpointValue, HStack } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ThemeSwitch from '../components/utils/ThemeSwitch';
import LanguageSelect from '../components/dashboard/LanguageSelect';

interface AuthLayoutProps {
  form: JSX.Element;
  animatedContent: JSX.Element;
  isEventsMate?: boolean;
}

const AuthLayout: FC<AuthLayoutProps> = ({ form, animatedContent, isEventsMate }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';

  const { pathname } = useRouter();
  const { t } = useTranslation();

  const textMap: Map<string, { title: string; subtitle: string }> = new Map([
    ['signin', { 
      title: 'auth:signIn.title',
      subtitle: 'auth:signIn.subtitle'
    }],
    ['signup', { 
      title: 'auth:signUp.title',
      subtitle: 'auth:signUp.subtitle'
    }],
    ['forgot-password', { 
      title: 'auth:signIn.title',
      subtitle: 'auth:signIn.subtitle'
    }],
  ]);

  const bgGradient = isEventsMate 
    ? 'linear(to-tr, brand.900, brand.400)' 
    : 'linear-gradient(to right, #FF328F, #6D055A)';
  
  const text = textMap.get(pathname.split('/').slice(-1)[0]);

  const isAnimationVisible = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex h="100vh" position="relative">
      <HStack
        position="absolute"
        bottom="4"
        right="4"
        spacing="4"
        zIndex="10"
        sx={{
          '.chakra-button': {
            position: 'static !important',
            right: 'auto !important',
            bottom: 'auto !important',
          },
        }}
      >
        <LanguageSelect />
        <ThemeSwitch isEventsMate={isEventsMate} isOnGradient={isAnimationVisible} />
      </HStack>

      <Flex 
        w={isAnimationVisible ? '50%' : '100%'} 
        justifyContent="center" 
        alignItems="center"
        px={{ base: 'none', sm: '10px' }}
        pb={{ base: '100px', lg: '0px' }}
      >
        <Flex w="400px" flexDirection="column">
          <Heading color={textColor} fontSize="36px">
            {text && t(text.title)}
          </Heading>
          <Text
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
            mb="1rem"
          >
            {text && t(text.subtitle)}
          </Text>
          {form}
        </Flex>
      </Flex>

      {/* Animated Content */}
      {isAnimationVisible && (
        <Flex 
          w="50%" 
          justifyContent="center" 
          alignItems="center" 
          bgGradient={bgGradient} 
          borderBottomLeftRadius="100px"
        >
          {animatedContent}
        </Flex>
      )}
    </Flex>
  );
};

export default AuthLayout;
