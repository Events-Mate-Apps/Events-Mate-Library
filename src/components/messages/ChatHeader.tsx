import { FC } from 'react';
import { Avatar, Box, Flex, Text, useColorModeValue, Button, Progress } from '@chakra-ui/react';
import Upsell from '../upsell/Upsell';
import { Vendor } from '../../interfaces/vendor';
import useNotificationStore from '../../stores/notification';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';

interface ChatHeaderProps {
  lastMessage: string;
  avatar: string;
  name: string;
  time: string;
  vendorId: string;
  id: string;
  refetch: () => void;
  handleActiveConversation: (id: string) => void;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  lastMessage,
  avatar,
  name,
  time,
  vendorId,
  id,
  refetch,
  handleActiveConversation,
}) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { showError } = useNotificationStore();

  const getVendor = async () => {
    try {
      const { data } = await api.get(`vendors/${vendorId}`);
      setVendor(data);
    } catch (error) {
      showError({ error });
    }
  };
  
  const formatLastMessage = (mes: string) => {
    return mes.length <= 20 ? mes : mes.slice(0, 20) + '...';
  };
  const newLastMessage = formatLastMessage(lastMessage);

  useEffect(() => {
    getVendor();
  }, [vendorId, refetch]);

  if (vendor) {
    return (
      <Box position="relative" h="90px">
        <Flex
          onClick={() => handleActiveConversation(id)}
          position="absolute"
          alignItems="center"
          zIndex="1"
          cursor="pointer"
          justifyContent="center"
          h="90px"
          w="100%"
          px={!vendor.isPremium ? '5px' : '0px'}
          filter={!vendor.isPremium ? 'auto' : 'none'}
          blur={!vendor.isPremium ? 'sm' : 'none'}
        >
          <Avatar
            h={{ base: '30px', '2xl': '50px' }}
            w={{ base: '30px', '2xl': '50px' }}
            src={avatar}
            me="16px"
          />
          <Flex direction="column" align="start" w="80%" me="auto">
            <Text
              color={textColor}
              fontSize={{ base: 'lg', '2xl': 'lg' }}
              me="6px"
              fontWeight="700"
            >
              {name}
            </Text>
            <Text
              display={{ base: 'none', xl: 'unset' }}
              color={textColor}
              fontSize={{ base: 'md', '2xl': 'md' }}
              fontWeight="400"
              maxW="80%"
              whiteSpace="pre-line"
              overflow="hidden"
            >
              {newLastMessage}
            </Text>
            <Text
              display={{ base: 'unset', xl: 'none' }}
              color={textColor}
              fontSize={{ base: 'md', '2xl': 'md' }}
              fontWeight="400"
              maxW="80%"
              whiteSpace="pre-line"
            >
              {newLastMessage}
            </Text>
          </Flex>
          <Flex flexDir="row">
            <Text
              color="secondaryGray.600"
              fontSize={{ base: 'md', '2xl': 'md' }}
              fontWeight="500"
            >
              {time}
            </Text>
          </Flex>
        </Flex>
        {!vendor.isPremium && (
          <Flex
            h="90px"
            alignItems="center"
            justifyContent="center"
            flexFlow="column"
            zIndex="2"
            position="absolute"
            width="100%"
            placeContent="center"
          >
            <Text mb="2px">Toto je premiová funkce!</Text>
            <Upsell vendor={vendor} onClick={() => handleActiveConversation(id)} isEnabled>
              <Button variant="darkBrand" size="sm">
                Koupit předplatné
              </Button>
            </Upsell>
          </Flex>
        )}
      </Box>
    );
  } else {
    return <Progress isIndeterminate />;
  }
};

export default ChatHeader;