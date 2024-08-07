import { FC, useEffect, useState } from 'react';
import { Flex, FormControl, SimpleGrid, Text, useColorModeValue, Input, FormLabel, Box, Button, Card } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { isEventsMate } from '../../../utils/orientation';
import { api } from '../../../utils/api';
import useNotificationStore from '../../../stores/notification'
import { UserData } from '../../../interfaces/user';
import useUserStore from '../../../stores/auth';

interface InformationProps {
  user: UserData
}

const Information: FC<InformationProps> = ({ user }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  const { t } = useTranslation();
  const { showError, showSuccess } = useNotificationStore();
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userSettings, setUserSettings] = useState<UserData>()

  const fetchUserSettings = async () => {
    try {
      const { data } = await api.get<UserData>('users/settings');
      setFirstName(data.firstName || '')
      setLastName(data.lastName || '')
      setUserSettings(data);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  const saveChanges = async () => {
    const payload = {
      email,
      username,
      firstName,
      lastName,
    };

    try {
      await api.put('users/', payload);
      setUserEmail(email);
      showSuccess();
    } catch (error) {
      console.error('Error updating profile:', error);
      showError({ error });
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  return (
    <FormControl>
      <Card mb="20px">
        <Flex 
          direction="column" 
          mb="30px"
          ms="10px"
        >
          <Text 
            fontSize="xl" 
            color={textColorPrimary} 
            fontWeight="bold"
          >
            {t('user:settings.accountSettings')}
          </Text>
          <Text 
            fontSize="md" 
            color={textColorSecondary}
          >
            {t('user:settings.changeInformation')}
          </Text>
        </Flex>
        <SimpleGrid 
          columns={{ sm: 1, md: 2 }} 
          spacing={{ base: '20px', xl: '20px' }}
        >
          <Box  
            mb="0px"   
            me="30px" 
          >
            <FormLabel 
              htmlFor="username"
            >
              {t('common:username')}
            </FormLabel>
            <Input 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@simmmple.web" 
            />
          </Box>
          <Box>
            <FormLabel htmlFor="email">{t('common:emailAddress')}</FormLabel>
            <Input 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@simmmple.com" 
            />
          </Box>
          <Box mb="20px" me="30px">
            <FormLabel htmlFor="first_name">{t('guests:form.firstName')}</FormLabel>
            <Input 
              id="first_name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={userSettings?.firstName || t('guests:form.firstName')}
            />
          </Box>
          <Box mb="20px">
            <FormLabel htmlFor="last_name">{t('guests:form.lastName')}</FormLabel>
            <Input 
              id="last_name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={userSettings?.lastName || t('guests:form.lastName')}
            />
          </Box>
        </SimpleGrid>
        <Button
          backgroundColor={isEventsMate() ? 'brand.900' : '#e13784'}
          color="white"
          _hover={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
          _active={{ backgroundColor: isEventsMate() ? 'brand.900' : '#e13784' }}
          onClick={saveChanges}
        >
          {t('common:saveChanges')}
        </Button>
      </Card>
    </FormControl>
  );
};

export default Information;
