'use client'
// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue, Switch, FormLabel, FormControl, Box } from '@chakra-ui/react';
import Card from '../../card/Card';

interface SwitchFieldProps {
  id: string;
  label: string;
  desc: string;
  mb?: string;
  me?: string;
}

const SwitchField = ({ id, label, desc, mb, me }: SwitchFieldProps) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');

  return (
    <FormControl display='flex' alignItems='center' mb={mb} me={me}>
      <Switch id={id} />
      <Box ms='10px'>
        <FormLabel htmlFor={id} mb='0' fontSize='md' fontWeight='bold' color={textColorPrimary}>
          {label}
        </FormLabel>
        <Text fontSize='sm' color={textColorSecondary}>
          {desc}
        </Text>
      </Box>
    </FormControl>
  );
};

export default function Newsletter(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  // Chakra Color Mode
  return (
    <FormControl>
      <Card p='30px' mb='20px' {...rest}>
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
        <SwitchField
          mb='25px'
          me='30px'
          id='3'
          label='Promotional emails'
          desc='Get personalized offers and emails based on your orders & preferences.'
        />
        <SwitchField
          me='30px'
          id='4'
          label='Product updates'
          desc='Checking this will allow us to notify you when we make updates to products you have downloaded/purchased.'
        />
      </Card>
    </FormControl>
  );
}
