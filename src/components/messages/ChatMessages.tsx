import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { messagesRenderThumb, messagesRenderTrack, messagesRenderView } from '../scrollbar/ScrollBar';
import { Message } from '../../interfaces/messages';
import dayjs from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import useUserStore from '../../stores/auth';
import MessageBlock from './MessageBlock';
import { isEventsMate } from '../../utils/orientation';
import { api } from '../../utils/api'
import useNotificationStore from '../../stores/notification';
import { Vendor } from '../../interfaces/vendor'

interface ChatMessagesProps {
  status: string;
  name: string;
  messages: Message[];
  vendorId?: string | null
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ name, messages, vendorId }) => {
  const scrollbarsRef = useRef<Scrollbars | null>(null);
  const userStore = useUserStore();
  const { t } = useTranslation();

  const [isVendorAbleToUseMessages, setIsVendorAbleToUseMessages] = useState<boolean>(false)

  const isEM = isEventsMate();
  const nameColor = useColorModeValue('gray.700', 'white');

  const { showError } = useNotificationStore()

  const getVendor = async () => {
    setIsVendorAbleToUseMessages(false)
    try {
      const { data } = await api.get<Vendor>(`vendors/${vendorId }`);
      setIsVendorAbleToUseMessages(data.isPremium)
    } catch (error) {
      showError({ error })
    }
  };

  useEffect(() => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  }, [messages]);

  useEffect(() => { 
    if(!isEM){
      vendorId && getVendor() 
    }
  }, [vendorId])

  return (
    <Box 
      h="400px" 
      minH="90%" 
      maxH="100%"
    >
      <Flex 
        px="34px" 
        pb="25px" 
        align="center"
      >
        {/* TODO */}
        {/* Avatar and name section */}
        {/* Active */}
      </Flex>

      <Box 
        h="100%" 
        px={{ base: '10px', md: '20px' }} 
        position="relative" 
        pb="52px"
      >
        <Flex>
          {!isEM ? (
            <>
              <Text 
                color={nameColor} 
                fontWeight="700"
                fontSize="xl"
              >
                {name}
              </Text>
              {!isVendorAbleToUseMessages && (
                <Box 
                  position='absolute'
                  left='50%'
                  top='50%'
                  transform='translate(-50%, -50%)'
                  textAlign='center' 
                  bg='none'
                  width={{ base: '90%', md: '600px', '2xl': '700px' }}
                  maxWidth='100%'
                  borderRadius='10px'
                  backdropFilter='auto'
                  backdropBlur='200px'
                  zIndex='1'
                  p={4}
                >
                  <Text
                    fontWeight='600'
                    fontSize={{ base: '1rem', '2xl': '1.25rem' }}
                    bg='transparent'
                    mb={2}
                  >
                    {t('vendors:messages.vendorDoesNotHavePremiumTitle')}
                  </Text>
                  <Text bg='transparent'>
                    {t('vendors:messages.vendorDoesNotHavePremiumSubTitle')}
                  </Text>
                </Box>
              )}
            </>
          ) : (
            <Text 
              color={nameColor} 
              fontWeight="700"
              fontSize="xl"
            >
              {name}
            </Text>
          )}
        </Flex>
        <Scrollbars
          ref={scrollbarsRef} 
          autoHide={true}
          renderTrackVertical={messagesRenderTrack}
          renderThumbVertical={messagesRenderThumb}
          renderView={messagesRenderView}
        >
          <Flex
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            h="100%"
          >
            {messages.length === 0 ? (
              <Text fontSize="lg" color="gray.500" mt="20px">
                {t('vendors:messages.noMessages')}
              </Text>
            ) : (
              messages.map((message, index) => (
                <MessageBlock
                  key={index}
                  content={message.content}
                  time={
                    dayjs(message.createdAt)
                      .subtract(1, 'day')
                      .isBefore(dayjs(), 'day')
                      ? dayjs(message.createdAt).format('DD ') +
                        t('vendors:messages.months.' + message.createdAt.split('-')[1])
                      : dayjs(message.createdAt).format('hh:mm A')
                  }
                  side={isEM ? message.senderId !== userStore.user?.id ? 'left' : 'right' : message.senderId !== userStore.user?.id ? 'right' : 'left'}
                />
              ))
            )}
          </Flex>
        </Scrollbars>
        {/* TODO */}
        {/* Input area */}
        {/* ... */}
      </Box>
    </Box>
  );
}

export default ChatMessages;