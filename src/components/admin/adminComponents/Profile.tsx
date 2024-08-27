import { Flex, Text, Avatar, Card, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
import { UserData } from '../../../interfaces/user';

interface ProfileProps {
  user: UserData;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';


  return (
    <Card mb="20px">
      <Flex align="center">
        <Avatar src={user.username} h="87px" w="87px" me="20px" />
        <Flex direction="column">
          <Text color={textColor} fontWeight="bold" fontSize="2xl">
            {user.username}
          </Text>
          <Text mt="1px" color={textColorSecondary} fontSize="md">
            {user.email}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Profile;
