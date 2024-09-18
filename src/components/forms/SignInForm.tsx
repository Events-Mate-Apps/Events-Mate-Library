
import { Divider, Flex, FormControl, Icon, Input, InputGroup, InputRightElement, Text, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { TrackGoogleAnalyticsEvent } from '../../utils/analytics/googleAnalytics/init';
import FormLabel from '../fields/FormLabel';
import SignInWithAppleButton from '../buttons/SignInWithAppleButton';
import NavLink from '../utils/NavLink';
import AsyncButton from '../buttons/AsyncButton';
import useUserStore from '../../stores/auth';
import { SignInRequest } from '../../interfaces/user';

interface SignInFormProps {
  isEnabledSIWA?: boolean
  isEventsMate?: boolean
}

const SignInForm: FC<SignInFormProps> = ({ isEnabledSIWA, isEventsMate }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorSecondary = 'gray.400';
  const brandColor = isEventsMate ? 'brand.500' : '#FF328F'
  const [show, setShow] = useState<boolean>(false);

  const userStore = useUserStore()

  const handleSignUpRedirectEvent = () => {
    TrackGoogleAnalyticsEvent({
      action: 'sign_up',
      label: 'Sign Up',
      page: 'Sign In'
    });
  }

  const { t } = useTranslation()

  const { register, getValues } = useForm<SignInRequest>({});

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
      {isEnabledSIWA && <>
        <SignInWithAppleButton />
        <Flex align="center" my="10px">
          <Divider />
          <Text color={textColorSecondary} mx="14px">
            {t('common:or')}
          </Text>
          <Divider />
        </Flex>
      </>}
      <FormControl>
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
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: '0px', md: '0px' }}
          type="email"
          placeholder={t('common:emailPlaceholder')}
          mb="24px"
          fontWeight="500"
          size="lg"
          data-cy="email-input"
          {...register('email', {
            required: true,
          })}
        />
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
            isRequired={true}
            fontSize="sm"
            placeholder={t('auth:passwordMinimum')}
            mb="24px"
            size="lg"
            type={show ? 'text' : 'password'}
            data-cy="password-input"
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
              onClick={() => setShow(prevState => !prevState)}
            />
          </InputRightElement>
        </InputGroup>

        <Flex justifyContent="space-between" align="center" mb="24px">
          <NavLink href="/auth/forgot-password">
            <Text
              color={brandColor}
              fontSize="sm"
              w="180px"
              fontWeight="500"
            >
              {t('auth:forgotPassword.title')}
            </Text>
          </NavLink>
        </Flex>
        <AsyncButton
          fontSize="sm"
          bg={brandColor}
          color="white"
          fontWeight="500"
          w="100%"
          h="50"
          mb="24px"
          data-cy="submit-button"
          onClick={() => userStore.signIn(getValues())}
        >
          {t('auth:signIn.title')}
        </AsyncButton>
      </FormControl>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        maxW="100%"
        mt="0px"
      >
        <Text color={textColorDetails} fontWeight="400" fontSize="14px">
          {t('auth:dontHaveAnAccount')}
          <NavLink href="/auth/signup" onClick={handleSignUpRedirectEvent}>
            <Text
              color={brandColor}
              as="span"
              ms="5px"
              fontWeight="500"
            >
              {t('auth:actions.signUp')}
            </Text>
          </NavLink>
        </Text>
      </Flex>
    </Flex>
  );
}
  
export default SignInForm;
  