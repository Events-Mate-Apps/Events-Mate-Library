
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Connected from '../admin/adminComponents/Connected';
import Delete from './adminComponents/Delete';
import Information from './adminComponents/Information'
import Newsletter from './adminComponents/Newsletter';
import Password from './adminComponents/Password';
import Profile from './adminComponents/Profile';
import Sessions from './adminComponents/Sessions';
import Socials from './adminComponents/Socials';
import TwoFactor from './adminComponents/TwoFactor';

export default function Settings() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Flex direction="column">
          <Profile />
          <Information />
          <Socials />
          <Password />
        </Flex>
        <Flex direction="column">
          <TwoFactor mb="20px" />
          <Newsletter mb="20px" />
          <Sessions mb="20px" />
          <Connected mb="20px" />
          <Delete />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}