import React from 'react';
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { ChatIcon } from '@chakra-ui/icons';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { Conversation } from '../../interfaces/messages';
interface StartMessageProps {
  vendorId: string;
  userId: string;
  weddingId: string;
}

const StartMessage: React.FC<StartMessageProps> = ({ vendorId, userId, weddingId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const startConversation = async () => {
    try {
      const response = await api.get<Conversation[]>('messages/myConversations');
      
      const existingConversation = response.data.find(
        conversation => conversation.vendorId === vendorId
      );
      
      if (existingConversation) {
        return existingConversation.id;
      } else {
        const newConversation = await api.post('messages/conversations', {
          userId: userId,
          vendorId: vendorId,
          weddingId: weddingId
        });
        
        return newConversation.data.id;
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      throw error;
    }
  };

  const handleStartConversation = async () => {
    await startConversation(); 
    router.push('/app/messages'); 
  };

  return (
    <Box>
      <Flex 
        alignItems="center" 
        cursor="pointer" 
        onClick={handleStartConversation}
      >
        <Text 
          color={textColor}
          fontWeight="500"
        >
          {t('vendors:messages.messageVendor')}
        </Text>
        <ChatIcon ml={2}color="#e13784" />
      </Flex>
    </Box>
  );
};

export default StartMessage;
