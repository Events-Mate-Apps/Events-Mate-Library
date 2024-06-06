import { Flex, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import Card from '../../card/Card';
import { User } from '@sentry/nextjs';
import { FC } from 'react';

interface ProfileProps {
  user: User;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  return (
    <Card mb="20px">
      <Flex align="center">
        <Avatar src={user.avatar} h="87px" w="87px" me="20px" />
        <Flex direction="column">
          <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl">
            {user.name}
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
