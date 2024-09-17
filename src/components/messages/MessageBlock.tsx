import React from 'react';
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { MdDoneAll } from 'react-icons/md';

interface MessageBlockProps {
  content: any;
  time: string;
  side?: 'left' | 'right';
  isLast?: boolean;
  seen?: boolean;
}

const MessageBlock: React.FC<MessageBlockProps> = ({
  content,
  time,
  side,
  isLast,
  seen,
  ...rest
}) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const blockBg = useColorModeValue('secondaryGray.300', 'navy.700');
  const brandBlockBg = useColorModeValue('brand.500', 'brand.400');
  const brandColor = useColorModeValue('brand.500', 'white');
  
  return (
    <Box
      borderRadius={
        side === 'left' ? '0px 20px 20px 20px' : '20px 0px 20px 20px'
      }
      bg={side === 'left' ? blockBg : brandBlockBg}
      justifyContent="center"
      alignItems="center"
      px="24px"
      py="16px"
      w="max-content"
      maxW={{ base: '100%', lg: '65%', xl: '52%' }}
      mb={isLast ? "20px"}
      style={side === 'right' ? { marginLeft: 'auto' } : {marginRight: 'auto'}}
      {...rest}
    >
      <Text
        color={side === 'left' ? textColor : 'white'}
        fontSize={{ base: 'md', '2xl': 'md' }}
        me="6px"
        mb="8px"
        fontWeight="400"
        whiteSpace="pre-line"

      >
        {content}
      </Text>
      <Flex>
        <Icon
          display={seen ? 'flex' : 'none'}
          as={MdDoneAll}
          color={side === 'left' ? brandColor : 'white'}
          w="18px"
          h="18px"
          me="8px"
        />
        <Text
          color={side === 'left' ? 'secondaryGray.600' : 'white'}
          fontSize={{ base: 'xs', '2xl': 'md' }}
          fontWeight="500"
          style={side === 'right' ? { marginLeft: 'auto' } : {}}

        >
          {time}
        </Text>
      </Flex>
    </Box>
  );
};

export default MessageBlock;
