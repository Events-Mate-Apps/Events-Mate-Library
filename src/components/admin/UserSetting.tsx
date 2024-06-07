import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Connected from '../admin/adminComponents/Connected';
import Delete from './adminComponents/Delete';
import Information from './adminComponents/Information';
import Newsletter from './adminComponents/Newsletter';
import Password from './adminComponents/Password';
import Profile from './adminComponents/Profile';
import { FC } from 'react';
import { UserData } from '~/interfaces/user';

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
          <Password />
        </Flex>
        <Flex direction="column">
          <Newsletter mb="20px" />
          <Connected mb="20px" />
          <Delete />
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default UserSettings;
