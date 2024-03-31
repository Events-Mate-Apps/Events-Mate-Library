import {
    Button,
    Flex,
    Spacer,
    Text,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Card from '~/components/card/Card';
import React, { useEffect, useState } from 'react';
import Review from './Review';
import NextLink from 'next/link';
import { api } from '~/utils/api';
import { TinyColor } from '@ctrl/tinycolor/dist';
import { VendorReview, VendorReviewResponse } from '../../../interfaces/types/review';
import { CustomError } from '../../../interfaces/global';
import { Vendor } from '../../../interfaces/vendor';
import { isEventsMate } from '../../../utils/orientation';
import dayjs from 'dayjs';

const ReviewsCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const [reviews, setReviews] = useState<VendorReviewResponse>();
    const { t } = useTranslation();

    const toast = useToast();

    const getReviews = async () => {
        try {
            const { data } = await api.get(`vendors/${vendor.id}/reviews?take=5&skip=0`);
            setReviews(data);
        } catch (error) {
            const err = error as CustomError;
            console.error('Error occurred. Stack trace: ' + err.raw?.message || err.message);

            toast({
                title: t('common:error'),
                description: t('editors:add.error.title') + ' ' + (err.raw?.message || err.message),
                status: 'error',
            });
        }
    }

    useEffect(() => {
        getReviews()
    }, []);

    //TODO add a button to 'See all'
    return (
        <Card p='30px' mb='20px' display={vendor.priority >= 2 && vendor.isPremium ? 'flex' : 'none'}>
            <Flex w='100%' mb='20px'>
                <Text color={textColor} fontSize='2xl' fontWeight='700'>
                    {t('vendors:detail.reviews.label')}
                </Text>
                <Spacer />
                <NextLink href={`/vendors/${vendor.id}/add-review`}>
                    <Button
                        display={isEventsMate() ? 'none' : 'inline-flex'}
                        borderRadius='16px'
                        background={'#e13784'}
                        _hover={{
                            background: new TinyColor('#e13784').darken(5).toString(),
                        }}
                        color='#fff'
                        lineHeight='16px'
                        px='28px'
                        h='48px'
                        fontWeight='600'>
                        {t('vendors:detail.reviews.button')}
                    </Button>
                </NextLink>
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
                {reviews != undefined &&
                    reviews?.totalReviews > 0 &&
                    reviews?.reviews.sort((a: VendorReview, b: VendorReview) => {
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
                    })}
            </Flex>
        </Card>
    );
}

export default ReviewsCard;