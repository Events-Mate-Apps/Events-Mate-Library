import {
    Flex,
    Icon,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { MdStar, MdStarHalf } from 'react-icons/md';
import React from 'react';

interface ReviewStarsProps {
    score: number,
    isPremium: boolean
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ score, isPremium }) => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const iconColor = useColorModeValue('gray.300', 'gray.700');

    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <Flex w='min-content'>
            {isPremium && <>
                <Stack
                    direction='row'
                    spacing='4px'
                    me='6px'
                    color='orange.300'
                    mb='30px'
                >
                    {Array(fullStars)
                        .fill(0)
                        .map((_, index) => (
                            <Icon key={index} as={MdStar} w='23px' h='23px' />
                        ))}
                    {halfStar ? <Icon as={MdStarHalf} w='23px' h='23px' /> : null}
                    {Array(emptyStars)
                        .fill(0)
                        .map((_, index) => (
                            <Icon
                                key={index + fullStars + halfStar}
                                as={MdStar}
                                w='23px'
                                h='23px'
                                color={iconColor}
                            />
                        ))}
                </Stack>
                <Text fontWeight='500' color={textColor}>
                    {score}
                </Text>
            </>}
        </Flex>
    );
}

export default ReviewStars;