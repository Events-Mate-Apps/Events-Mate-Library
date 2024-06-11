import { Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../card/Card';
import { isEventsMate } from '../../../utils/orientation';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  mb?: string;
}

const InputField = ({ id, label, placeholder, mb }: InputFieldProps) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  
  return (
    <FormControl mb={mb}>
      <FormLabel htmlFor={id} color={textColorPrimary}>
        {label}
      </FormLabel>
      <Input id={id} placeholder={placeholder} />
    </FormControl>
  );
};

export default function Password(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  // Chakra Color Mode
  return (
    <Card {...rest}>
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
          />
          <InputField
            mb="25px"
            id="new"
            label="New Password"
            placeholder="Your new password"
          />
          <InputField
            mb="25px"
            id="confirm"
            label="New Password Confirmation"
            placeholder="Confirm new password"
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
      >
        Change Password
      </Button>
    </Card>
  );
}
