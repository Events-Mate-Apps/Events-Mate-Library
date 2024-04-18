import React from 'react';
import { Box, Link, Text, useQuery} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { ChatIcon } from '@chakra-ui/icons';
import { api } from '~/utils/api';
interface StartMessageProps {
    vendorId: string;
    userId: string;
    weddingId: string;
  }
  
const StartMessage: React.FC<StartMessageProps> = ({ vendorId, userId, weddingId }) => {
    const { t }= useTranslation()
    const startConversation = async () => {
        await api.post("messages/conversations",{
            userId: userId,
            vendorId: vendorId,
            weddingId: weddingId
        })
    }
  return (
    <Box>
        <Link href="/app/messages">
            <Text>{t('vendors:messages.yourchats')}</Text>
            <ChatIcon mr={2} />
        </Link>
    </Box>
  );
};

export default StartMessage;