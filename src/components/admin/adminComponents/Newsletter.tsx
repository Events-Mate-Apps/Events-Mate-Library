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
import useTranslation from 'next-translate/useTranslation';
interface SwitchFieldProps {
  id: string;
  label: string;
  desc: string;
  mb?: string;
  me?: string;
}

const SwitchField: FC<SwitchFieldProps> = ({ id, label, desc, mb, me }) => {
  const { t } = useTranslation();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');

  return (
    <FormControl display='flex' alignItems='center' justifyContent='space-between' mb={mb} me={me}>
      <Box ms='10px'>
        <FormLabel htmlFor={id} mb='0' fontSize='md' fontWeight='bold' color={textColorPrimary}>
          {t(`user:settings.${label}`)}
        </FormLabel>
        <Text fontSize='sm' color={textColorSecondary}>
          {t(`user:settings.${desc}`)}
        </Text>
      </Box>
      <Switch id={id} />
    </FormControl>
  );
};

const Newsletter: FC = () => {
  const { t } = useTranslation();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <FormControl>
      <Card p='30px' mb='20px'>
        <Flex mb='40px' justify='space-between' align='center'>
          <Text fontSize='2xl' color={textColorPrimary} fontWeight='bold'>
            {t('user:settings.newsletter')}
          </Text>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing={{ base: '20px', xl: '0px' }}>
          <SwitchField
            mb='25px'
            me='30px'
            id='1'
            label='weeklyNewsletter'
            desc='newsletterDescription'
          />
          <SwitchField
            mb='25px'
            me='30px'
            id='2'
            label='lifecycleEmails'
            desc='lifecycleEmailsDescription'
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
};

export default Newsletter;
