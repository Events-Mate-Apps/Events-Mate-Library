import { Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue, Card } from '@chakra-ui/react';
import { useState, FC } from 'react';
import { api } from '~/utils/api';
import { UserData } from '../../../interfaces/user';
import { isEventsMate } from '../../../utils/orientation';
import useTranslation from 'next-translate/useTranslation';
import useUserStore from '../../../stores/auth';
import { useRouter } from 'next/router';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  mb?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const InputField: FC<InputFieldProps> = ({ id, label, placeholder, mb, type = 'password', value, onChange, errorMessage }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const errorColor = 'red.500';
  
  return (
    <FormControl mb={mb}>
      <FormLabel htmlFor={id} color={textColorPrimary}>
        {label}
      </FormLabel>
      <Input id={id} placeholder={placeholder} type={type} value={value} onChange={onChange} />
      {errorMessage && <Text color={errorColor}>{errorMessage}</Text>}
    </FormControl>
  );
};

interface PasswordProps {
  user: UserData;
}

const Password: FC<PasswordProps> = () => {
  const { t } = useTranslation();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const authStore = useUserStore();
  const { push } = useRouter();
  
  const signIn = async (email: string, password: string) => {
    try {
      await authStore.signIn({ email, password });
      push('/app');
    } catch (error) {
      console.error(error);
      setErrorMessage(t('user:settings.signInError'));
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage(t('user:settings.passwordMismatch'));
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
      confirmPassword
    };

    try {
      await api.post('auth/change-password', payload);
      setSuccessMessage(t('user:settings.passwordChangeSuccess'));
      setErrorMessage('');

    

    } catch (error) {
      console.error(t('settings.passwordChangeError'), error);
      setErrorMessage(t('user:settings.passwordChangeError'));
      setSuccessMessage('');
    }
    finally{
      if (authStore.user) {
        await signIn(authStore.user.email, newPassword);
      } else {
        setErrorMessage(t('user:settings.signInError'));
      }
    }
  };

  return (
    <Card>
      <Flex direction="column" mb="30px" ms="10px">
        <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
          {t('user:settings.changePassword')}
        </Text>
        <Text fontSize="md" color={textColorSecondary}>
          {t('user:settings.setNewPassword')}
        </Text>
      </Flex>
      <FormControl>
        <Flex flexDirection="column">
          <InputField
            mb="25px"
            id="old"
            label={t('user:settings.oldPassword')}
            placeholder={t('user:settings.oldPasswordPlaceholder')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            mb="25px"
            id="new"
            label={t('user:settings.newPassword')}
            placeholder={t('user:settings.newPasswordPlaceholder')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputField
            mb="25px"
            id="confirm"
            label={t('user:settings.confirmPassword')}
            placeholder={t('user:settings.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            errorMessage={errorMessage}
          />
        </Flex>
      </FormControl>
      <Button
        borderRadius="16px"
        minW="183px"
        h="44px"
        ms="auto"
        mt="33px"
        variant="brand"
        fontSize="sm"
        fontWeight="500"
        backgroundColor={isEventsMate() ? 'brand.900' : '#e13784'}
        color="white"
        _hover={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
        _active={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
        onClick={changePassword}
      >
        {t('user:settings.changePasswordButton')}
      </Button>
      {errorMessage && <Text color="red.500" mt="10px">{errorMessage}</Text>}
      {successMessage && <Text color="green.500" mt="10px">{successMessage}</Text>}
    </Card>
  );
};

export default Password;
