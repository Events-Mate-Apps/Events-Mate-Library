import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { ChatIcon } from '@chakra-ui/icons';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

interface StartMessageProps {
  vendorId: string;
  userId: string;
  weddingId: string;
}

const StartMessage: React.FC<StartMessageProps> = ({ vendorId, userId, weddingId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  
  const startConversation = async () => {
    await api.post("messages/conversations", {
      userId: userId,
      vendorId: vendorId,
      weddingId: weddingId
    });
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
          color="#1B2559"
          fontWeight="500"
        >
          {t('vendors:messages.yourChats')}
        </Text>
        <ChatIcon ml={2}color="#e13784" />
      </Flex>
    </Box>
  );
};

export default StartMessage;
