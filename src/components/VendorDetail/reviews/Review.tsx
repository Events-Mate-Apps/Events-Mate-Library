import {
    Avatar,
    Card,
    CardBody, CardFooter, CardHeader,
    Flex, Heading,
    Text, useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import ReviewStars from '../ReviewStars';
import useTranslation from 'next-translate/useTranslation';
import { Vendor } from '../../../interfaces/vendor';

interface ReviewProps {
    title: string;
    authorEmail: string;
    description?: string;
    createDate: Date;
    rating: number;
    vendor: Vendor;
}

const Review: React.FC<ReviewProps> = ({
    title,
    authorEmail,
    description,
    createDate,
    rating,
    vendor
}) => {
    const { t } = useTranslation();

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const backgroundColor = useColorModeValue('white', 'navy.800');
    const borderColor = useColorModeValue('secondaryGray.200', 'navy.900');

    const showDate = new Date(createDate).toLocaleDateString()

    //TODO crop too long texts
    return (
        <Card
            w={{ base: '300px', md: '400px' }}
            mx={{ base: '2', md: '3' }}
            border='1px solid'
            flexShrink='0'
            background={backgroundColor}
            borderColor={borderColor}
        >
            <CardHeader pb='5'>
                <Flex justifyContent='space-between' mb='5'>
                    <Avatar me='8' name={authorEmail} />
                    <ReviewStars score={rating}
                                 isPremium={!!vendor.isPremium && vendor.priority >= 2 && vendor.isPremium} />
                </Flex>
                <Heading size='sm' color={textColor}>{title}</Heading>
                <Text color={textColor}>{authorEmail}</Text>
            </CardHeader>
            <CardBody pt='0'>
                <Text color={textColor}>
                    {description}
                </Text>
            </CardBody>
            <CardFooter pt='0'>
                <Text color='gray.500' fontSize='sm'>
                    {t('vendors:detail.reviews.published', { x: showDate })}
                </Text>
            </CardFooter>
        </Card>
    )
}

export default Review;