import { Flex, Heading, Text, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ThemeSwitch from '~/components/utils/ThemeSwitch';

interface AuthLayoutProps {
  form: JSX.Element,
  animatedContent: JSX.Element
  isEventsMate?: boolean
}

const AuthLayout: FC<AuthLayoutProps> = ({ form, animatedContent, isEventsMate }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';

  const { pathname } = useRouter();
  const { t } = useTranslation();
  
  const textMap: Map<string, { title: string, subtitle: string }> = new Map([
    ['sign-in', { 
      title: 'auth:signIn.title',
      subtitle: 'auth:signIn.subtitle'
    }],
    ['signup', { 
      title: 'auth:signIn.title',
      subtitle: 'auth:signIn.subtitle'
    }],
    ['forgot-password', { 
      title: 'auth:signIn.title',
      subtitle: 'auth:signIn.subtitle'
    }],
  ]);

  const bgGradient = isEventsMate ? 'linear(to-tr, brand.900, brand.400)' : 'linear-gradient(to right, #003973, #E5E5BE)';
  
  const text = textMap.get(pathname.split('/').slice(-1)[0]);

  // Determine whether to show animated content based on screen width
  const showAnimatedContent = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex h="100vh" position='relative'>
      <ThemeSwitch isEventsMate />
      <Flex 
        w={showAnimatedContent ? '50%' : '100%'} 
        justifyContent='center' 
        alignItems='center'
        px={{ base: 'none', sm: '10px' }}
        pb={{ base: '100px', lg: '0px' }}
      >
        <Flex w="400px" flexFlow="column">
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
      {showAnimatedContent && (
        <Flex w='50%' justifyContent='center' alignItems='center' bgGradient={bgGradient} borderBottomLeftRadius='100px'>
          {animatedContent}
        </Flex>
      )}
    </Flex>
  );
}

export default AuthLayout;
