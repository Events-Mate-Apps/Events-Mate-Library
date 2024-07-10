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
  Button,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { isEventsMate } from '../../../utils/orientation';
import { api } from '../../../utils/api';
import { UserSettingsInterface } from '../../../interfaces/user';

interface SwitchFieldProps {
  id: string;
  label: string;
  desc: string;
  mb?: string;
  me?: string;
  isChecked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

const SwitchField: FC<SwitchFieldProps> = ({ id, label, desc, mb, me, isChecked, onChange }) => {
  const { t } = useTranslation();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.400');

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.checked);
  };

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
      <Switch id={id} isChecked={isChecked} onChange={handleSwitchChange} />
    </FormControl>
  );
};

const Newsletter: FC = () => {
  const { t } = useTranslation();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const [, setUserSettings] = useState<UserSettingsInterface | null>(null);
  const [allowMarketingEmails, setAllowMarketingEmails] = useState<boolean>(false);
  const [allowSystemEmails, setAllowSystemEmails] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');
  const [currency, setCurrency] = useState<string>('USD');

  const fetchUserSettings = async () => {
    try {
      const { data } = await api.get<UserSettingsInterface>('users/settings');
      setUserSettings(data);
      setAllowMarketingEmails(data.allowMarketingEmails ?? false);
      setAllowSystemEmails(data.allowSystemEmails ?? false);
      setLanguage(data.preferredLanguageISO);
      setCurrency(data.preferredCurrencyISO);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  const handleSaveChanges = async () => {

    const requestBody = {
      allowMarketingEmails: allowMarketingEmails ,
      allowSystemEmails: allowSystemEmails,
      preferredLanguageISO: language, 
      preferredCurrencyISO: currency,
    };
    try {
      await api.put('users/settings/', requestBody);
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const handleSwitchChange = (id: string, checked: boolean) => {
    if (id === '1') {
      setAllowMarketingEmails(checked);
    } else if (id === '2') {
      setAllowSystemEmails(checked);
    }
  };

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
            isChecked={allowMarketingEmails}
            onChange={handleSwitchChange}
          />
          <SwitchField
            mb='25px'
            me='30px'
            id='2'
            label='lifecycleEmails'
            desc='lifecycleEmailsDescription'
            isChecked={allowSystemEmails}
            onChange={handleSwitchChange}
          />
        </SimpleGrid>
        <Button 
          mt={4} 
          colorScheme="teal" 
          onClick={handleSaveChanges}
          backgroundColor={isEventsMate() ? 'brand.900' : '#e13784'}
          color="white"
          _hover={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
          _active={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
        >
          {t('common:saveChanges')}
        </Button>
      </Card>
    </FormControl>
  );
};

export default Newsletter;
