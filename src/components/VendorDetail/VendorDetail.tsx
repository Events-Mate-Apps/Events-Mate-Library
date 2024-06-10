import {
  Tag,
  Flex,
  Text,
  useColorModeValue,
  Box,
  useDisclosure,
  Card,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Vendor } from '../../interfaces/vendor';
import VendorDescription from './Description';
import FAQ from './FAQ';
import VendorLocation from './Location';
import useTranslation from 'next-translate/useTranslation';
import Links from './Links';
import ReviewStars from './ReviewStars';
import { NextSeo } from 'next-seo';
import DealsCard from './deals/DealsCard';
import { UserData } from '../../interfaces/user';
import Contacts from './Contacts';
import ReviewsCard from './reviews/ReviewsCard';
import VendorImages from './VendorImages';
import { TinyColor } from '@ctrl/tinycolor/dist';
import LanguageBar from '../localization/LanguageBar';
import LocalizedText from '../localization/LocalizedText';
import VendorPriorityBadge from '../VendorPriorityBadge';
import VerificationDialog from '../fields/VerificationDialog';
import StartMesssage from './StartMessage';
import VendorDetailQuestionnaireResponses from './questionnaire/VendorDetailQuestionnaireResponses';

interface VendorDetailProps {
  vendor: Vendor;
  user?: UserData,
  sendStats?: (vendorId: string, event: string) => Promise<void>,
  userId?: string,
  weddingId?: string
}

const VendorDetail: React.FC<VendorDetailProps> = ({ vendor, user, sendStats, userId, weddingId }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const { push, replace, query, pathname } = useRouter();
  const goToPricings = (vendorId: string) => {
    push(`/main/pricing?vendorId=${vendorId}`);
  }

  const reviewConfirmedToken = query.confirmReviewToken;
  const [langToDisplay, setLangToDisplay] = useState<string | null>(null)

  useEffect(() => {
    if (reviewConfirmedToken !== undefined
            && !isOpen) {
      onOpen();
    }
  }, [reviewConfirmedToken, isOpen])

  const turnOffDialog = () => {
    onClose();
    delete query.confirmReviewToken;
    replace({ pathname: pathname, query });
  }

  return (
    <Flex direction='column' w='100%'>
      <NextSeo
        title={vendor.name}
        openGraph={{
          title: vendor.name,
          images: [
            {
              url:
                `https://www.weddmate.com/api/vendors/${vendor.id}/og` ??
                vendor.images[0]?.src,
              width: 630,
              height: 1200,
              alt: '',
            },
          ],
          url: `https://weddmate-web.vercel.app/vendors/${vendor.alias}`,
        }}
      />
      <VerificationDialog
        path={`vendors/reviews/confirmReview?token=${reviewConfirmedToken}`}
        isOpen={isOpen}
        turnOffDialog={turnOffDialog}
        desc={(t('vendors:detail.reviews.confirmText'))}
      />
      <Card mt={{ sm: '50px', md: '75px' }} me={{ lg: '60px' }} mb={{ sm: '50px', md: '75px' }}>
        <Flex direction='column' w='100%'>
          {user && vendor.userId === user.id && <div>
            <Tag
              variant='solid'
              bgColor='blackAlpha.500'
              backdropFilter='auto'
              backdropBlur='md'
              float='right'
            >
              {t('vendors:detail.myVendor')}
            </Tag>
            {vendor.isPremium ? <Tag
              variant='solid'
              bgColor='whiteAlpha.500'
              backdropFilter='auto'
              backdropBlur='md'
              float='right'
              marginRight='1'
            >
              {t('vendors:detail.subscriptionActive')}
            </Tag>
              : <Tag
                variant='solid'
                background={'#e13784'}
                _hover={{
                  background: new TinyColor('#e13784').darken(5).toString(),
                }}
                backdropFilter='auto'
                backdropBlur='md'
                float='right'
                marginRight='1'
                cursor='pointer'
                onClick={() => goToPricings(vendor.id)}
              >
                {t('vendors:detail.buySubscription')}
              </Tag>}
          </div>}
          <LanguageBar
            obj={vendor.faq}
            langToDisplay={langToDisplay}
            setLangToDisplay={setLangToDisplay}
          />
          <Flex direction={{ sm: 'column', lg: 'column', xl: 'row' }}>
            <VendorImages vendor={vendor} />
            <Flex direction='column' w='100%'>
              <Flex
                alignItems='center'
                mb='12px'
                mt={{ sm: '20px', md: '50px', '2xl': '20px', '3xl': '50px' }}
              >
                <Text
                  color={textColor}
                  fontSize='3xl'
                  fontWeight='bold'
                  mr='15px'
                >
                  {vendor.name}
                </Text>
                <VendorPriorityBadge
                  priority={vendor.priority}
                  size='35px'
                />
              </Flex>
              <ReviewStars
                score={vendor.rating}
                isPremium={!!vendor.isPremium && vendor.priority >= 2 && vendor.isPremium}
              />
              {/* <Flex gap='5px' flexWrap='wrap' mb='20px'>
                                {vendor.categories.map((cat) => (
                                  <Tag
                                    variant='solid'
                                    bgColor='blackAlpha.500'
                                    backdropFilter='auto'
                                    backdropBlur='md'
                                    key={cat}
                                  >
                                    {t('vendors:categories.' + cat)}
                                  </Tag>
                                ))}
                              </Flex>
                            */}
              <Contacts sendStats={sendStats} vendor={vendor} />
              {userId &&
                            <StartMesssage vendorId={vendor.id} userId={userId|| ''} weddingId={weddingId || ''}/>}
              <Box
                color='secondaryGray.600'
                pe={{ base: '0px', '3xl': '200px' }}
                mb='40px'
                mt='20px'
              >
                {(langToDisplay && vendor.descriptionContent) && <LocalizedText
                  content={vendor.descriptionContent}
                  language={langToDisplay}
                  markdown
                />}

              </Box>
              <Links vendor={vendor} />
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {
        (langToDisplay && vendor.descriptionContent) &&
                <VendorDescription
                  description={vendor.descriptionContent}
                  language={langToDisplay}
                />
      }
      {
        (vendor.faq.length !== 0 && vendor.isPremium && langToDisplay) &&
                <FAQ language={langToDisplay} vendor={vendor} />
      }
      <DealsCard vendor={vendor} />
      <VendorLocation vendor={vendor} />
      <ReviewsCard vendor={vendor} />
      <div>
        <VendorDetailQuestionnaireResponses />
      </div>
    </Flex>
  );
}

export default VendorDetail;