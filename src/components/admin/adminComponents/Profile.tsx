import { Flex, Text, Avatar, Card } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { UserData } from '../../../interfaces/user';

interface ProfileProps {
  user: UserData;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <Card mb="20px">
      <Flex align="center">
        <Avatar src={user.username} h="87px" w="87px" me="20px" />
        <Flex direction="column">
          <Text color='#1B2559' fontWeight="bold" fontSize="2xl">
            {user.username}
          </Text>
          <Text mt="1px" color='#1B2559' fontSize="md">
            {user.email}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Profile;
