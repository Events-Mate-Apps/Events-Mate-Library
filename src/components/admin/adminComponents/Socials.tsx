import { Flex, FormControl, Text, useColorModeValue, FormLabel, Input, Box } from '@chakra-ui/react';
import Card from '../../card/Card';

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

export default function Socials(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';

  return (
    <FormControl>
      <Card mb='20px' {...rest}>
        <Flex direction='column' mb='30px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Social Profiles
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can set user social profiles
          </Text>
        </Flex>
        <InputField mb='25px' id='twitter_username' label='Twitter Username' placeholder='Twitter Username' />
        <InputField mb='25px' id='facebook_username' label='Facebook Username' placeholder='Facebook Username' />
        <InputField mb='25px' id='github_username' label='Github Username' placeholder='Github Username' />
        <InputField mb='25px' id='dribbble_username' label='Dribbble Username' placeholder='Dribbble Username' />
      </Card>
    </FormControl>
  );
}
