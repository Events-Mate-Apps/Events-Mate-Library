import {
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  Switch,
  FormLabel,
  FormControl,
  Box,
  Card,
} from '@chakra-ui/react';
import { FC } from 'react';

interface SwitchFieldProps {
  id: string;
  label: string;
  desc: string;
  mb?: string;
  me?: string;
}

const SwitchField: FC<SwitchFieldProps> = ({ id, label, desc, mb, me }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');

  return (
    <FormControl display='flex' alignItems='center' justifyContent='space-between' mb={mb} me={me}>
      <Box ms='10px'>
        <FormLabel htmlFor={id} mb='0' fontSize='md' fontWeight='bold' color={textColorPrimary}>
          {label}
        </FormLabel>
        <Text fontSize='sm' color={textColorSecondary}>
          {desc}
        </Text>
      </Box>
      <Switch id={id} />
    </FormControl>
  );
};

const Newsletter: FC = () => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <FormControl>
      <Card p='30px' mb='20px'>
        <Flex mb='40px' justify='space-between' align='center'>
          <Text fontSize='2xl' color={textColorPrimary} fontWeight='bold'>
            Newsletter
          </Text>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing={{ base: '20px', xl: '0px' }}>
          <SwitchField
            mb='25px'
            me='30px'
            id='1'
            label='Weekly newsletter'
            desc='Get notified about articles, discounts and new products.'
          />
          <SwitchField
            mb='25px'
            me='30px'
            id='2'
            label='Lifecycle emails'
            desc='Get personalized offers and emails based on your activity.'
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
};

export default Newsletter;
