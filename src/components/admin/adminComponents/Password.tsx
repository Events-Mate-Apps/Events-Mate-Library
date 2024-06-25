import { Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue, Card } from '@chakra-ui/react';
import { useState, FC } from 'react';
import { api } from '~/utils/api';
import { UserData } from '../../../interfaces/user';
import { isEventsMate } from '../../../utils/orientation';
import useTranslation from 'next-translate/useTranslation';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  mb?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({ id, label, placeholder, mb, type = 'password', value, onChange }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  
  return (
    <FormControl mb={mb}>
      <FormLabel htmlFor={id} color={textColorPrimary}>
        {label}
      </FormLabel>
      <Input id={id} placeholder={placeholder} type={type} value={value} onChange={onChange} />
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

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert(t('settings.passwordMismatch'));
      return;
    }

    const payload = {
      token: '', 
      oldPassword,
      newPassword,
      confirmPassword
    };

    try {
      await api.post('auth/change-password', payload);
      alert(t('settings.passwordChangeSuccess'));
    } catch (error) {
      console.error(t('settings.passwordChangeError'), error);
      alert(t('settings.passwordChangeError'));
    }
  };

  return (
    <Card>
      <Flex direction="column" mb="30px" ms="10px">
        <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
          {t('settings.changePassword')}
        </Text>
        <Text fontSize="md" color={textColorSecondary}>
          {t('settings.setNewPassword')}
        </Text>
      </Flex>
      <FormControl>
        <Flex flexDirection="column">
          <InputField
            mb="25px"
            id="old"
            label={t('settings.oldPassword')}
            placeholder={t('settings.oldPasswordPlaceholder')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            mb="25px"
            id="new"
            label={t('settings.newPassword')}
            placeholder={t('settings.newPasswordPlaceholder')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputField
            mb="25px"
            id="confirm"
            label={t('settings.confirmPassword')}
            placeholder={t('settings.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        {t('settings.changePasswordButton')}
      </Button>
    </Card>
  );
};

export default Password;
