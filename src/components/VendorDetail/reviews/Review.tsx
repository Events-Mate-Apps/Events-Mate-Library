import {
    Avatar, Box,
    Card,
    CardBody, CardHeader,
    Flex, Heading,
    Text, useColorModeValue
} from '@chakra-ui/react';

import React from "react";
import ReviewStars from '../ReviewStars';

interface ReviewProps { 
    title: string; 
    authorEmail: string;
    description: string;
    rating: number;
}

const Review: React.FC<ReviewProps> = ({ title, authorEmail, description, rating }) => {

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const backgroundColor = useColorModeValue('white', 'navy.800');
    const borderColor = useColorModeValue('secondaryGray.200', 'navy.900');

    return (
        <Card
            w='md'
            background={backgroundColor}
            border={`1px solid`}
            borderColor={borderColor}
        >
            <CardHeader>
                <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={authorEmail} />
                        <Box>
                            <Heading size='sm' color={textColor}>{title}</Heading>
                            <Text color={textColor}>{authorEmail}</Text>
                        </Box>
                    </Flex>
                    {/* @ts-ignore */}
                    <ReviewStars rating={rating}/>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text color={textColor}>
                    {description}
                </Text>
            </CardBody>

            {/*TODO date*/}
            {/*<CardFooter*/}
            {/*    justify='space-between'*/}
            {/*    flexWrap='wrap'*/}
            {/*    sx={{*/}
            {/*        '& > button': {*/}
            {/*            minW: '136px',*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            {/*</CardFooter>*/}
        </Card>
    )
}

export default Review;