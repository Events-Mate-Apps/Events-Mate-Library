
import { Button, Divider, Flex, FormControl, Icon, Input, InputGroup, InputRightElement, SkipNavLink, Text, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { TrackGoogleAnalyticsEvent } from '~/utils/analytics/googleAnalytics/init';
import FormLabel from '../fields/FormLabel';
import SignInWithAppleButton from '../buttons/SignInWithAppleButton';

interface FormValues {
  email: string,
  password: string
}

interface SignInFormProps {
  isEnabledSIWA?: boolean
}

const SignInForm: FC<SignInFormProps> = ({ isEnabledSIWA }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorSecondary = 'gray.400';
  const [show, setShow] = useState<boolean>(false);

  const handleSignUpRedirectEvent = () => {
    TrackGoogleAnalyticsEvent({
      action: 'sign_up',
      label: 'Sign Up',
      page: 'Sign In'
    });
  }

  const { t } = useTranslation()

  const { register } = useForm<FormValues>({});

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
          <Text color={brandStars}>*</Text>
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
          <Text color={brandStars}>*</Text>
        </FormLabel>
        <InputGroup size="md">
          <Input
            isRequired={true}
            fontSize="sm"
            placeholder={t('auth:passwordMinumum')}
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
              onClick={() => setShow(prevState => !prevState)}
            />
          </InputRightElement>
        </InputGroup>

        <Flex justifyContent="space-between" align="center" mb="24px">
          <SkipNavLink href="/auth/forgot-password">
            <Text
              color={textColorBrand}
              fontSize="sm"
              w="180px"
              fontWeight="500"
            >
              {t('auth:forgotPassword.title')}
            </Text>
          </SkipNavLink>
        </Flex>
        <Button
          fontSize="sm"
          variant="brand"
          fontWeight="500"
          w="100%"
          h="50"
          mb="24px"
          type="submit"
        >
          {t('auth:signIn.title')}
        </Button>
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
          <SkipNavLink href="/auth/signup" onClick={handleSignUpRedirectEvent}>
            <Text
              color={textColorBrand}
              as="span"
              ms="5px"
              fontWeight="500"
            >
              {t('auth:actions.signUp')}
            </Text>
          </SkipNavLink>
        </Text>
      </Flex>
    </Flex>
  );
}
  
export default SignInForm;
  