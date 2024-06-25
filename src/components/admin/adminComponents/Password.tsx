import { Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue, Card } from '@chakra-ui/react';
import { useState, FC } from 'react';
import { api } from '~/utils/api';
import { UserData } from '../../../interfaces/user';
import { isEventsMate } from '../../../utils/orientation';

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

const Password: FC<PasswordProps> = ({ user }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    const payload = {
      token: user.id, // Assuming token is user ID, adjust accordingly
      oldPassword,
      newPassword,
      confirmPassword
    };

    try {
      await api.post('auth/change-password', payload);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  return (
    <Card>
      <Flex direction="column" mb="30px" ms="10px">
        <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
          Change password
        </Text>
        <Text fontSize="md" color={textColorSecondary}>
          Here you can set your new password
        </Text>
      </Flex>
      <FormControl>
        <Flex flexDirection="column">
          <InputField
            mb="25px"
            id="old"
            label="Old Password"
            placeholder="Your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            mb="25px"
            id="new"
            label="New Password"
            placeholder="Your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputField
            mb="25px"
            id="confirm"
            label="New Password Confirmation"
            placeholder="Confirm new password"
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
        Change Password
      </Button>
    </Card>
  );
};

export default Password;
