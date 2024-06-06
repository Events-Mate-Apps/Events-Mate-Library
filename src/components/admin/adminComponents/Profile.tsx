import { Flex, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import Card from '../../card/Card';
import { User } from '@sentry/nextjs';
import { FC } from 'react';

interface ProfileProps {
  user: User;
}

const Profile: FC<ProfileProps> = ({ user }) => {

  return (
    <Card mb="20px">
      <Flex align="center">
        <Avatar src={user.avatar} h="87px" w="87px" me="20px" />
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
