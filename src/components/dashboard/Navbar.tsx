import {
  Box,
  Button,
  Flex,
  Text,
  TextProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import styles from 'styles/landing/Navbar.module.scss';
import { TrackGoogleAnalyticsEvent } from '~/utils/analytics/googleAnalytics/init';
import { TinyColor } from '@ctrl/tinycolor';
import { darken } from '@chakra-ui/theme-tools';
import useTranslation from 'next-translate/useTranslation';
import useUserStore from '../../stores/auth';
import { isEventsMate } from '../../utils/orientation';

export default function Navbar() {
  const userStore = useUserStore();
  const [expandedOnMobile, setExpandedOnMobile] = useState(false);
  const [dbButtonLoading, setDbButtonLoading] = useState(false);
  const menuIconFilter = mode('invert(0)', 'invert(.90)');

  const isLoggedIn = useMemo(() => {
    if (!userStore?.user) return false;
    return userStore.isLoggedIn;
  }, [userStore?.user]);

  const { t } = useTranslation('');

  const eventsMateLinks = useMemo(() => [
    {
      text: t('aboutApp:title'),
      href: '/main/about-app',
      underlineOnActive: false,
    },
    {
      text: t('common:blog'),
      href: 'https://blog.weddmate.com',
    },
    {
      text: t('common:pricing'),
      href: '/main/pricing',
    }
  ], [t]);

  const weddMateLinks = useMemo(() => [
    {
      text: t('common:vendors'),
      href: '/vendors',
    },
    {
      text: t('aboutApp:title'),
      href: '/main/about-app',
      underlineOnActive: false,
    },
    {
      text: t('common:blog'),
      href: 'https://blog.weddmate.com',
    }
  ], [t]);

  const activeLinks = isEventsMate() ? eventsMateLinks : weddMateLinks;

  const handleLoginOnClick = () => {
    if (isEventsMate()) {
      TrackGoogleAnalyticsEvent({
        action: 'log_in',
        label: 'Log in',
        page: 'Navigation Bar'
      });
    }
  }

  return (
    <Box
      as={motion.nav}
      position="fixed"
      zIndex={100}
      display="flex"
      alignItems="center"
      h="64px"
      borderRadius="1rem"
      backdropBlur={'16px'}
      backdropSaturate="180%"
      className={styles.nav}
      maxW={{ base: '100%', md: '80vw', lg: '70vw', xl: '60vw' }}
      px=".5rem"
      _dark={{
        border: '1px solid',
        borderColor: 'whiteAlpha.50',
      }}
    >
      <NextLink href="/" passHref>
        <Box
          as="div"
          pos="relative"
          w="3rem"
          h="3rem"
          mr="2"
          overflow="hidden"
          borderRadius={'16px'}
          _hover={{
            transform: 'scale(1.06)',
            transformOrigin: 'center center',
          }}
          transition="transform 0.1s ease-in-out"
        >
          <Image
            alt={isEventsMate() ? 'EventsMate' : 'WeddMate'}
            src="/icon.png"
            quality={100}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            priority
          />
        </Box>
      </NextLink>
      <Box
        as={motion.div}
        className={styles.left}
        display={{ base: 'none', lg: 'flex' }}
      >
        {activeLinks.map(({ text, href, underlineOnActive }, i) => (
          <CustomLink
            text={text}
            href={href}
            key={i}
            underlineOnActive={underlineOnActive}
          />
        ))}
      </Box>

      <Box
        as={motion.div}
        className={styles.right}
        display={{
          base: 'none',
          lg: 'flex',
        }}
      >
        {isLoggedIn ? (
          <>
            <CustomLink
              text={t('auth:signout')}
              href="#"
              aProps={{
                onClick: () => {
                  userStore.signOut();
                },
              }}
            />
            <NextLink href="/app" passHref>
              <Button
                as="span"
                borderRadius="16px"
                background={'#E13784'}
                _hover={{
                  background: new TinyColor('#E13784').darken(5).toString(),
                }}
                color="#FFF"
                lineHeight="19px"
                px="28px"
                h="52px"
                isLoading={dbButtonLoading}
                fontWeight={600}
                onClick={() => {
                  setDbButtonLoading(true);
                }}
              >
                <Text py="18px">{t('common:dashboard')}</Text>
              </Button>
            </NextLink>
          </>
        ) : (
          <>
            <div onClick={handleLoginOnClick}>
              <CustomLink text={t('auth:login')} href="/auth/signin" />
            </div>
            <NextLink href="/auth/signup" passHref>
              <Button
                as="span"
                fontWeight={600}
                borderRadius="16px"
                background={'#E13784'}
                _hover={{
                  background: new TinyColor('#E13784').darken(5).toString(),
                }}
                color="#FFF"
                lineHeight="19px"
                px="28px"
                h="52px"
              >
                <Text py="18px">{t('common:getStarted')}</Text>
              </Button>
            </NextLink>
          </>
        )}
      </Box>
      <AnimatePresence>
        {expandedOnMobile && (
          <Box
            as={motion.div}
            pos="absolute"
            mt="12px"
            pb="12px"
            onClick={() => setExpandedOnMobile(false)}
            initial={{ top: '40px', opacity: 0 }}
            animate={{ top: '64px', opacity: 1 }}
            exit={{ top: '88px', opacity: 0 }}
            bgColor={mode(
              'whiteAlpha.900',
              new TinyColor('black').setAlpha(0.7).toString()
            )}
            borderRadius="1rem"
          >
            {activeLinks.map(({ text, href }, i) => (
              <Box 
                key={i} 
                w="90vw" 
                pos="relative" 
                textAlign="center"
              >
                <CustomLink 
                  text={text} 
                  href={href} 
                  key={i} 
                />
              </Box>
            ))}
            {isLoggedIn ? (
              <Flex 
                w="100%" 
                alignItems="center" 
                flexDir="column"
              >
                <CustomLink
                  text={t('auth:signout')}
                  href="#"
                  aProps={{
                    onClick: () => {
                      userStore.signOut();
                    },
                  }}
                />
                <NextLink href="/app" passHref>
                  <Button
                    as="span"
                    borderRadius="16px"
                    background="#E13784"
                    _hover={{
                      background: darken('#E13784', 5),
                    }}
                    color="#FFF"
                    lineHeight="19px"
                    px="28px"
                    h="52px"
                    isLoading={dbButtonLoading}
                    fontWeight={600}
                    onClick={() => {
                      setDbButtonLoading(true);
                    }}
                  >
                    <Text py="18px">{t('common:dashboard')}</Text>
                  </Button>
                </NextLink>
              </Flex>
            ) : (
              <Flex 
                w="100%" 
                alignItems="center" 
                flexDir="column"
              >
                <div onClick={handleLoginOnClick}>
                  <CustomLink text={t('auth:login')} href="/auth/signin" />
                </div>
                <NextLink href="/auth/signup" passHref>
                  <Button
                    as="span"
                    fontWeight={600}
                    borderRadius="16px"
                    background="#E13784"
                    _hover={{
                      background: darken('#E13784', 5),
                    }}
                    color="#FFF"
                    lineHeight="19px"
                    px="28px"
                    h="52px"
                  >
                    <Text py="18px">{t('common:getStarted')}</Text>
                  </Button>
                </NextLink>
              </Flex>
            )}
          </Box>
        )}
      </AnimatePresence>
      <Box
        as={motion.div}
        className={styles.mobile}
        sx={{ svg: { padding: '.2rem' } }}
        display={{
          base: 'flex',
          lg: 'none',
        }}
      >
        <Button
          variant="unstyled"
          onClick={() => {
            setExpandedOnMobile((s) => !s);
          }}
          className={styles.menu}
          aria-expanded={expandedOnMobile}
          aria-label="Menu"
          h="full"
        >
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 100 100"
            className={expandedOnMobile ? styles.active : ''}
            style={{ filter: menuIconFilter }}
          >
            <path d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path d="M 20,50 H 80" />
            <path d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
          </svg>
        </Button>
      </Box>
    </Box>
  );
}

interface CustomLinkProps {
  text: string;
  href: string;
  underlineOnActive?: boolean;
  aProps?: TextProps;
}

const CustomLink: FC<CustomLinkProps> = ({
  text,
  href,
  underlineOnActive = true,
  aProps,
}) => {
  const router = useRouter();
  return (
    <div style={{ position: 'relative' }} className={styles.customLink}>
      <NextLink href={href}>
        <Text
          as="span"
          _hover={{
            textDecoration: 'none',
          }}
          __dark={{
            color: '#E6E6E6',
          }}
          fontWeight={500}
          href={href}
          className={
            router.pathname.endsWith(href) && underlineOnActive
              ? styles.active
              : ''
          }
          {...aProps}
        >
          {text}
        </Text>
      </NextLink>
    </div>
  );
};
