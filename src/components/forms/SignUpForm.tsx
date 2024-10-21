// SignUpForm.tsx
import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  keyframes,
  Box,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { TrackGoogleAnalyticsEvent } from '../../utils/analytics/googleAnalytics/init';
import FormLabel from '../fields/FormLabel';
import SignInWithAppleButton from '../buttons/SignInWithAppleButton';
import NavLink from '../utils/NavLink';
import AsyncButton from '../buttons/AsyncButton';
import useUserStore from '../../stores/auth';
import { SignUpRequest } from '../../interfaces/user';
import { AxiosError } from 'axios'; // Import AxiosError

interface SignUpFormProps {
  isEnabledSIWA?: boolean;
  isEventsMate?: boolean;
}

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const SignUpForm: FC<SignUpFormProps> = ({ isEnabledSIWA, isEventsMate }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorSecondary = 'gray.400';
  const brandColor = isEventsMate ? 'brand.500' : '#FF328F';
  const [show, setShow] = useState<boolean>(false);
  const [shakeEmail, setShakeEmail] = useState<boolean>(false);

  const userStore = useUserStore();

  const handleSignUpRedirectEvent = () => {
    TrackGoogleAnalyticsEvent({
      action: 'sign_up',
      label: 'Sign Up',
      page: 'Sign In',
    });
  };

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError, // Extract setError
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<SignUpRequest>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpRequest) => {
    try {
      await userStore.signUp(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 400 &&
          error.response.data.message === 'A user with this email already exists.'
        ) {
          setError('email', {
            type: 'manual',
            message: 'A user with this email already exists.',
          });
        } else {
          // Optionally handle other specific errors here
        }
      } else {
        // Optionally handle non-Axios errors here
      }
    }
  };

  useEffect(() => {
    if (errors.email) {
      setShakeEmail(true);
      const timer = setTimeout(() => setShakeEmail(false), 500);
      return () => clearTimeout(timer);
    }
  }, [errors.email]);

  return (
    <Flex
      zIndex="2"
      direction="column"
      w={{ base: '100%', md: '420px' }}
      maxW="100%"
      background="transparent"
      borderRadius="15px"
      me="auto"
      mb={{ base: '20px', md: 'auto' }}
    >
      {isEnabledSIWA && (
        <>
          <SignInWithAppleButton />
          <Flex align="center" my="10px">
            <Divider />
            <Text color={textColorSecondary} mx="14px">
              {t('common:or')}
            </Text>
            <Divider />
          </Flex>
        </>
      )}
      <FormControl isInvalid={!!errors.name || !!errors.email || !!errors.password}>
        {/* Name Field */}
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          {t('auth:fields.name')}
          <Text color={brandColor}>*</Text>
        </FormLabel>
        <Input
          isRequired
          variant="auth"
          fontSize="sm"
          placeholder="John Doe"
          mb="24px"
          fontWeight="500"
          size="lg"
          {...register('name', {
            required: true,
          })}
        />
        {errors.name && (
          <FormErrorMessage mb="24px">
            {t('auth:errors.nameRequired')}
          </FormErrorMessage>
        )}

        {/* Email Field */}
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          {t('common:email')}
          <Text color={brandColor}>*</Text>
        </FormLabel>
        <Box animation={shakeEmail ? `${shake} 0.5s` : 'none'}>
          <Input
            isRequired
            variant="auth"
            fontSize="sm"
            type="email"
            placeholder="mail@weddmate.com"
            mb="24px"
            fontWeight="500"
            size="lg"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
            onBlur={() => {
              trigger('email');
            }}
          />
        </Box>
        {errors.email && (
          <FormErrorMessage mb="24px">
            {errors.email.type === 'required'
              ? t('auth:errors.emailRequired')
              : errors.email.message || t('auth:errors.invalidEmail')}
          </FormErrorMessage>
        )}

        {/* Password Field */}
        <FormLabel
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          display="flex"
        >
          {t('auth:password')}
          <Text color={brandColor}>*</Text>
        </FormLabel>
        <InputGroup size="md">
          <Input
            isRequired
            fontSize="sm"
            placeholder={t('auth:passwordMinimum')}
            mb="24px"
            size="lg"
            type={show ? 'text' : 'password'}
            variant="auth"
            {...register('password', {
              required: true,
              minLength: 8,
            })}
          />
          <InputRightElement display="flex" alignItems="center" mt="4px">
            <Icon
              color={textColorSecondary}
              cursor="pointer"
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={() => setShow((prevState) => !prevState)}
            />
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage mb="24px">
            {errors.password.type === 'required'
              ? t('auth:errors.passwordRequired')
              : t('auth:errors.passwordMinLength')}
          </FormErrorMessage>
        )}

        {/* Forgot Password Link */}
        <Flex justifyContent="space-between" align="center" mb="24px">
          <NavLink href="/auth/forgot-password">
            <Text color={brandColor} fontSize="sm" w="180px" fontWeight="500">
              {t('auth:forgotPassword.title')}
            </Text>
          </NavLink>
        </Flex>

        {/* Submit Button */}
        <AsyncButton
          fontSize="sm"
          bg={brandColor}
          color="white"
          fontWeight="500"
          w="100%"
          h="50px"
          mb="24px"
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {t('auth:signUp.title')}
        </AsyncButton>
      </FormControl>

      {/* Sign In Link */}
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        maxW="100%"
        mt="0px"
      >
        <Text color={textColorDetails} fontWeight="400" fontSize="14px">
          {t('auth:alreadyHaveAnAccount')}
          <NavLink href="/auth/signin" onClick={handleSignUpRedirectEvent}>
            <Text color={brandColor} as="span" ms="5px" fontWeight="500">
              {t('auth:actions.signIn')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUpForm;
