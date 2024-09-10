import { Button, Box, useColorModeValue, Text } from '@chakra-ui/react';
import { useEffect, useRef, useCallback, FC } from 'react';
import { FaApple } from 'react-icons/fa';
import { UserData } from '../../interfaces/user';
import useUserStore from '../../stores/auth';
import useNotificationStore from '../../stores/notification';
interface LoginResponse {
  user: UserData;
  token: {
    value: string;
    createdAt: string;
    expiresAt: string;
  };
}

const SignInWithAppleButton: FC = () => {
  const siwaButtonBg = useColorModeValue('white', 'black');
  const { showError } = useNotificationStore()
  const btnRef = useRef<HTMLDivElement | null>(null);

  const userStore = useUserStore();

  const inited = useRef(false);

  useEffect(() => {
    if (inited.current || typeof window === 'undefined') return;
    const redirectURI = `${process.env.NEXT_PUBLIC_APPLE_CALLBACK}`;

    const existingScript = document.getElementById('apple-auth-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.id = 'apple-auth-sdk';
      document.body.appendChild(script);

      script.onload = () => {
        if (window.AppleID) {
          window.AppleID.auth.init({
            clientId: 'com.weddmate.siwa.service',
            scope: 'name email',
            redirectURI: redirectURI,
            state: Math.random().toString(36).substr(2, 40),
            usePopup: true,
          });
          inited.current = true;
        }
      };
    } else {
      if (window.AppleID) {
        window.AppleID.auth.init({
          clientId: 'com.weddmate.siwa.service',
          scope: 'name email',
          redirectURI: redirectURI,
          state: Math.random().toString(36).substr(2, 40),
          usePopup: true,
        });
        inited.current = true;
      }
    }
  }, []);

  const handleSuccessfulLogin = useCallback(
    (response: LoginResponse) => {
      const userWithNames = {
        ...response,
        user: {
          ...response.user,
          firstName: response.user.firstName || '',
          lastName: response.user.lastName || '',
        },
      };

      userStore.signInWithApple(userWithNames);
    },
    [userStore]
  );

  const handleAppleLogInEvent = (status: string, message: string) => {
    console.log(`Apple login event: ${status} - ${message}`);
  };

  useEffect(() => {
    const callback = async (e: Event) => {
      const detail = (e as CustomEvent).detail;
      // eslint-disable-next-line camelcase
      const id_token = detail.authorization.id_token;
      const name = detail.user?.name;
      const username = name?.firstName
        ? `${name.firstName}${name.middleName ? ` ${name.middleName} ` : ' '}${name.lastName}`
        : undefined;
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const req = await fetch(`${BASE_URL}auth/login/callback`, {
          method: 'POST',
          // eslint-disable-next-line camelcase
          body: JSON.stringify({ id_token: id_token, username }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res: LoginResponse = await req.json();
        handleSuccessfulLogin(res);
      } catch (error) {
        showError({error});
        handleAppleLogInEvent('error', (error as { raw?: { message?: string }, message?: string }).raw?.message || (error as { message?: string }).message || 'An error occurred');
      }
    };
    document.addEventListener('AppleIDSignInOnSuccess', callback);
    return () => {
      document.removeEventListener('AppleIDSignInOnSuccess', callback);
    };
  }, [handleSuccessfulLogin]);

  const clickOnButton = () => {
    btnRef.current?.click();
  };

  return (
    <Box pos="relative">
      <Box
        pos="absolute"
        h="50px"
        id="appleid-signin"
        data-color={siwaButtonBg}
        data-border="true"
        data-type="sign-in"
        response-type="code"
        ref={btnRef}
        display="none"
      />
      <Button
        onClick={clickOnButton}
        w="100%"
        alignItems="center"
        justifyContent="center"
        h="50px"
        flexDirection="row"
        backgroundColor="rgba(26, 32, 44, 0.07)"
        mb="10px"
        borderRadius="16px"
      >
        <FaApple size="20" />
        <Text size="14" ml="10px" fontWeight="400">
          Sign in with Apple
        </Text>
      </Button>
    </Box>
  );
}
export default SignInWithAppleButton