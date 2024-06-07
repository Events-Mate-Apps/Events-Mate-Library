import { Flex, Text, Avatar } from '@chakra-ui/react';
import Card from '../../card/Card';
import { FC, useEffect } from 'react';
import { UserData } from '~/interfaces/user';

interface ProfileProps {
  user: UserData;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  useEffect(()=>{
    console.log(user)
  },[user])
  //sync
  return (
    <Card mb="20px">
      <Flex align="center">
        <Avatar src={user.username} h="87px" w="87px" me="20px" />
        <Flex direction="column">
          <Text color='gray.400' fontWeight="bold" fontSize="2xl">
            {user.username}
          </Text>
          <Text mt="1px" color='gray.400' fontSize="md">
            {user.email}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Profile;
