import {
  Button,
  Card,
  Flex,
  Spacer,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import Review from './Review';
import NextLink from 'next/link';
import { api } from '../../../utils/api';
import { TinyColor } from '@ctrl/tinycolor/dist';
import { VendorReview, VendorReviewResponse } from '../../../interfaces/types/review';
import { Vendor } from '../../../interfaces/vendor';
import dayjs from 'dayjs';
import useNotificationStore from '../../../stores/notification';
import QueryString from 'qs'

const ReviewsCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');
  const [reviews, setReviews] = useState<VendorReviewResponse | null>(null);
  const { t } = useTranslation();

  const { showError } = useNotificationStore();

  const getReviews = async () => {
    const query = QueryString.stringify({ take: 5, skip: 0 });

    try {
      const { data } = await api.get(`vendors/${vendor.id}/reviews?${query}`);
      setReviews(data);
    } catch (error) {
      showError({ error });
    }
  }

  useEffect(() => { 
    getReviews()
  }, []);

  //TODO add a button to 'See all'
  return (
    <Card p='30px' mb='20px' display='flex'>
      <Flex w='100%' mb='20px'>
        <Text color={textColor} fontSize='2xl' fontWeight='700'>
          {t('vendors:detail.reviews.label')}
        </Text>
        <Spacer />
        <Button
          as={NextLink}
          borderRadius='16px'
          background={'#e13784'}
          _hover={{
            background: new TinyColor('#e13784').darken(5).toString(),
          }}
          color='#fff'
          lineHeight='16px'
          px='28px'
          h='48px'
          fontWeight='600'
          href={`/vendors/${vendor.id}/add-review`}
        >
          {t('vendors:detail.reviews.button')}
        </Button>
      </Flex>
      <Flex
        w='100%'
        justify='flex-start'
        overflowX='scroll'
        css={{
          '&': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          },
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {
          (!reviews || !reviews.reviews[0]) && <Text fontWeight='500' color={secondaryTextColor}>{t('vendors:detail.reviews.noReviewsYet')}</Text>
        }
        {
          vendor.priority < 3 ?
            <Text fontWeight='500' color={secondaryTextColor}>{t('vendors:detail.reviews.reviewLowPriorityMessage')}</Text> : (
              reviews &&
              reviews.totalReviews > 0 &&
              reviews.reviews.sort((a: VendorReview, b: VendorReview) => {
                return dayjs(b.createdAt).diff(dayjs(a.createdAt));
              }).map((review, key) => {
                return (
                  <Review
                    rating={review.rating}
                    title={review.title}
                    authorEmail={review.authorEmail}
                    description={review.description}
                    createDate={review.createdAt}
                    key={review.title + key}
                    vendor={vendor}
                  />
                );
              }))
        }
      </Flex>
    </Card>
  );
}

export default ReviewsCard;