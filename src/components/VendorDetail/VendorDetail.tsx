import {
  Tag,
  Flex,
  Text,
  useColorModeValue,
  Box,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { darken } from '@chakra-ui/theme-tools';
import Card from '../../components/card/Card';
import LanguageList from 'language-list';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Description, DescriptionWithLabel, Language, Vendor } from '../../interfaces/vendor';
import VendorDescription from './Description';
import FAQ from './FAQ';
import VendorLocation from './Location';
import useTranslation from 'next-translate/useTranslation';
import Links from './Links';
import ReviewStars from './ReviewStars';
import { NextSeo } from 'next-seo';
import MarkdownReader from './MarkdownReader';
import DealsCard from './deals/DealsCard';
import { UserData } from '../../interfaces/user';
import { api } from '../../utils/api';
import Contacts from './Contacts';
import ReviewsCard from './reviews/ReviewsCard';
import VendorImages from './VendorImages';
import { CURRENT_PROJECT, isEventsMate } from '../../utils/orientation';

interface VendorDetailProps {
  vendor: Vendor;
  user?: UserData,
  sendStats?: (vendorId: string, event: string) => Promise<void>
}

const VendorDetail: React.FC<VendorDetailProps> = ({ vendor, user, sendStats }) => {
  const languages: Language[] = LanguageList().getData();
  const langs = [{ code: 'all', language: 'All' }, ...languages]
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { t } = useTranslation();

  const router = useRouter();
  const goToPricings = (vendorId: string) => {
    router.push(`/main/pricing?vendorId=${vendorId}`);
  }

  const [descriptions, setDescriptions] = useState<DescriptionWithLabel[]>([])
  const [currentDescription, setCurrentDescription] = useState<DescriptionWithLabel | null>(null)

  const getDescriptions = async (): Promise<void> => {
    try {
        const { data } = await api.get(`vendors/${vendor.id}/getDescriptions`);
        setDescriptions(data.map((e: Description) => {
            return {
              ...e,
              label: langs.find((l) => l.code === e.language)?.language || '',
            }
        }));
    } catch (error) {
        console.error("Error fetching descriptions: ", error);
    }
  }

  useEffect(() => {
    console.log(isEventsMate, 'isEventsMate')
    console.log(CURRENT_PROJECT, 'CURRENT_PROJECT')
    getDescriptions()
  }, [])

  useEffect(() => {
    const d: DescriptionWithLabel | undefined = descriptions.find((e) => e.language === router.locale)

    if (d) {
      setCurrentDescription(d)
      return
    }

    setCurrentDescription(descriptions[0])
  }, [descriptions])

  return (
    <Flex direction="column" w="100%">
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
      <Card mt={{ sm: '50px', md: '75px' }} me={{ lg: '60px' }} mb={{ sm: '50px', md: '75px' }}>
        <Flex direction="column" w="100%">
          {user && vendor.userId === user.id && <div>
            <Tag
              variant="solid"
              bgColor="blackAlpha.500"
              backdropFilter="auto"
              backdropBlur="md"
              float="right"
            >
              {t('vendors:detail.myVendor')}
            </Tag>
            {vendor.isPremium ? <Tag
              variant="solid"
              bgColor="whiteAlpha.500"
              backdropFilter="auto"
              backdropBlur="md"
              float="right"
              marginRight="1"
            >
              {t('vendors:detail.subscriptionActive')}
            </Tag>
            : <Tag
              variant="solid"
              background="#E13784"
              _hover={{
                background: darken('#E13784', 5),
              }}
              backdropFilter="auto"
              backdropBlur="md"
              float="right"
              marginRight="1"
              cursor="pointer"
              onClick={() => goToPricings(vendor.id)}
            >
            {t('vendors:detail.buySubscription')}
            </Tag>}
          </div>}
          <Flex direction={{ sm: 'column', lg: 'column', xl: 'row' }}>
            <VendorImages vendor={vendor} />
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize="3xl"
                fontWeight="bold"
                mb="12px"
                mt={{ sm: '20px', md: '50px', '2xl': '20px', '3xl': '50px' }}
              >
                {vendor.name}
              </Text>
              <ReviewStars vendor={vendor} />
              {/* <Flex gap="5px" flexWrap="wrap" mb="20px">
                {vendor.categories.map((cat) => (
                  <Tag
                    variant="solid"
                    bgColor="blackAlpha.500"
                    backdropFilter="auto"
                    backdropBlur="md"
                    key={cat}
                  >
                    {t('vendors:categories.' + cat)}
                  </Tag>
                ))}
              </Flex> */}
              <Box>
                {descriptions.length !== 1 && <ButtonGroup size='sm' isAttached variant='outline'>
                  {descriptions.map((e) => {
                    return (
                      <Button
                        key={e.id}
                        onClick={() => setCurrentDescription(e)}
                        variant={currentDescription?.id === e.id ? 'darkBrand' : 'outline'}
                      >
                        {e.label}
                      </Button>
                    )
                  })}
                </ButtonGroup>}
              </Box>
              <Contacts sendStats={sendStats} vendor={vendor} />
              <Text
                color="secondaryGray.600"
                pe={{ base: '0px', '3xl': '200px' }}
                mb="40px"
                mt='20px'
              >
                {currentDescription && <MarkdownReader source={currentDescription.value} />}
              </Text>
              <Links vendor={vendor} />
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {currentDescription && <VendorDescription desc={currentDescription} />}
      {(vendor.faq.length !== 0 && vendor.isPremium) && <FAQ vendor={vendor} />}
      <DealsCard vendor={vendor} />
      <VendorLocation vendor={vendor} />
      <ReviewsCard vendorId={vendor.id}/>
    </Flex>
  );
}

export default VendorDetail;