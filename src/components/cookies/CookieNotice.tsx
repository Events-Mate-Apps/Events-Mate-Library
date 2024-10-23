import { Flex, Button, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import { FC, useEffect, useState } from 'react';
import useCookieStore from '../../stores/cookies';
import { isEventsMate } from '~/utils/orientation';

const CookieNotice: FC = () => {
  const [isCookieNoticeVisible, setIsCookieNoticeVisible] = useState(false);
  const cookiesStore = useCookieStore()
  const bg = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.7)')
  const text = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')
  const color = isEventsMate() ? 'brand.900' : 'pink.500'
  const { t } = useTranslation()

  useEffect(() => {
    setIsCookieNoticeVisible(cookiesStore.cookieNoticedAccepted === null)
  }, [cookiesStore.cookieNoticedAccepted]);

  return (
    <div>
      {isCookieNoticeVisible && <Flex
        justifyContent="center"
        alignItems="center"
        gap="18px"
        w="100%"
        minH="100px"
        position="fixed"
        bottom="0"
        left="0"
        zIndex="100"
        padding="20px"
        bg={bg}
        textColor={text}
        backdropFilter="blur(10px)"
        flexFlow={{ base: 'column', md: 'row' }}
      >
        <Flex marginRight="20px">
          {t('common:cookieNotice.message')}
        </Flex>
        <Flex gap="2">
          <Button
            variant="solid"
            bgColor={color}
            color="white"
            size="md"
            background="#aaa"
            onClick={() => cookiesStore.accept()}
          >
            {t('common:cookieNotice.accept')}
          </Button>
          <Button
            variant="outline"
            colorScheme='black'
            size="md"
            onClick={() => cookiesStore.decline()}
          >
            {t('common:cookieNotice.decline')}
          </Button>
        </Flex>
      </Flex>}
    </div>
  );
}

export default CookieNotice;