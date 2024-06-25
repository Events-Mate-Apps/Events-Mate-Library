import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Delete from './adminComponents/Delete';
import Information from './adminComponents/Information';
import Newsletter from './adminComponents/Newsletter';
import Password from './adminComponents/Password';
import Profile from './adminComponents/Profile';
import LanguageSettings from './adminComponents/Language';
import { FC } from 'react';
import { UserData } from '../../interfaces/user';

interface UserSettingsProps {
  user: UserData;
}

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Flex direction="column">
          <Profile user={user} />
          <Information />
          <Password user={user} />
        </Flex>
        <Flex direction="column">
          <LanguageSettings />
          <Newsletter/>
          <Delete user={user}/>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default UserSettings;
