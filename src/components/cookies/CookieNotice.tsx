import { Flex, Button } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import { FC, useEffect, useState } from 'react';
import useCookieStore from '../../stores/cookies';

const CookieNotice: FC = () => {
  const [isCookieNoticeVisible, setIsCookieNoticeVisible] = useState(false);
  const cookiesStore = useCookieStore()
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
        h="100px"
        borderTop="1px solid gray"
        position="fixed"
        bottom="0"
        left="0"
        zIndex="1000"
        backgroundColor="#ddd"
        padding="20px">
        <Flex marginRight="20px">
          {t('common:cookieNotice.message')}
        </Flex>
        <Button
          variant="solid"
          size="md"
          background="#eee"
          onClick={() => cookiesStore.decline()}
        >
          {t('common:cookieNotice.decline')}
        </Button>
        <Button
          variant="solid"
          size="md"
          background="#aaa"
          onClick={() => cookiesStore.accept()}
        >
          {t('common:cookieNotice.accept')}
        </Button>
      </Flex>}
    </div>
  );
}

export default CookieNotice;