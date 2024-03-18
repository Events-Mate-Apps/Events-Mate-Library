// TODO: This is not the final solution, when we implement axios in this submodule, we will use it here
import {
    Button,
    Flex,
    Spacer,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';import Card from '~/components/card/Card';
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {darken} from "@chakra-ui/theme-tools";
import Review from './Review';

export type VendorReviewResponse = {
    reviews: VendorReview[];
    totalPages: number;
    totalReviews: number;
};

export type VendorReview = {
    id: string;
    rating: number;
    qualityOfService: number;
    responsiveness: number
    professionalism: number;
    value: number;
    flexibility: number;
    recommend: boolean;
    didWeHelp: boolean;
    title: string;
    description?: string;
    amountSpent?: number;
    guestsAttended?: number;
    authorEmail: string;
    createdAt: Date;
};

export type VendorReviewPost = {
    rating: number;
    authorIp: string;
    qualityOfService: number;
    responsiveness: number;
    professionalism: number;
    value: number;
    flexibility: number;
    recommend: boolean;
    didWeHelp: boolean;
    title: string;
    description?: string;
    amountSpent?: number;
    guestsAttended?: number;
    authorEmail: string;
};

export default function ReviewsCard(props: { vendorId: string }) {
    // Color settings and translation
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const { t } = useTranslation();
    const [reviews, setReviews] = useState<VendorReviewResponse | null>(null)


    const getReviews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vendors/${props.vendorId}/reviews?take=3&skip=0`)
            setReviews(await res.json())
        } catch (e) {
            
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    //TODO "take" and "skip" based on relevant conditions, not only last three


    //TODO add a button to "See all"
    //TODO deprecated "darken"
    return (
        <Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
            <Flex w="100%" mb='20px'>
                <Text color={textColor} fontSize='2xl' fontWeight='700'>
                    {t('vendors:detail.reviews.label')}
                </Text>
                <Spacer />
                <NextLink href={`/vendors/${props.vendorId}/add-review`}>
                    <Button
                        borderRadius="16px"
                        background="#e13784"
                        _hover={{
                            background: darken('#E13784', 5),
                        }}
                        color="#FFF"
                        lineHeight="16px"
                        px="28px"
                        h="48px"
                        fontWeight={600}>
                        {t('vendors:detail.reviews.button')}
                    </Button>
                </NextLink>
            </Flex>
            <Flex w="100%" justify='space-between'>
            {/*TODO ts-ignore => better condition in order to avoid undefined*/}
            {reviews &&
                reviews?.totalReviews > 0 &&
                reviews?.reviews.map((review, key) => {
                    return (
                        <Review
                            rating={review.rating}
                            // @ts-ignore
                            title={review.title}
                            authorEmail={review.authorEmail}
                            // @ts-ignore
                            description={review.description}
                            key={key}
                        />
                    );
                })}
            </Flex>
        </Card>
    );
}
