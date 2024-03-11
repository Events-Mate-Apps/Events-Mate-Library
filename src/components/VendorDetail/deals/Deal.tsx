import {
    Card,
    CardBody, CardHeader,
    Flex, Icon, Tag,
    Text, useColorModeValue
} from '@chakra-ui/react';

// Assets
import {FaRegClock, FaEdit} from 'react-icons/fa';
import { DealType } from "@/interfaces/deals";
import dayjs from "@/utils/dayjs";
import React, { useEffect, useState } from "react";
import useTranslation from "@/misc/i18n/useTranslation";
import NextLink from "next/link";
import DeleteDealDialog from './DeleteDealDialog';
import DealThumbnail from './DealThumbnail';

interface DealProps {
    deal: DealType;
    vendorId: string;
    isInDashboard: boolean;
    isNotVisible: (newState: boolean) => void;
}

export const Deal: React.FC<DealProps> = ({ deal, vendorId, isNotVisible, isInDashboard }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const backgroundColor = useColorModeValue('gray.100', 'navy.700');
    const borderColor = useColorModeValue('secondaryGray.200', 'navy.900');
    const bg = useColorModeValue('#e13784', 'brand.400');
    const tagBorderColor = useColorModeValue('white', 'navy.700');

    const { t } = useTranslation();

    // For testing, use the following: dayjs('2023-01-30T16:02:00.000Z')
    const date = dayjs(deal.endsAt);
    const today = dayjs(new Date());

    useEffect(() => {
        let minutes = today.diff(date, 'minutes');
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        minutes -= (hours * 60)
        hours -= (days * 24);

        if (deal.isPermanent ||
            days < 0 ||
            (days == 0 && hours < 0) ||
            (days == 0 && hours == 0 && minutes <= 0)) {
            setIsVisible(true);
            setIsActive(true);
            isNotVisible(true);
            return;
        }
        if (days <= 14) {
            setIsVisible(true);
            isNotVisible(true);
        }
    }, []);

    const formattedDate = date.format('dddd, MMMM D, YYYY');

    return (
        <Card
            w='49%'
            mb='2%'
            background={backgroundColor}
            border={`2px solid`}
            borderRadius={`25px`}
            borderColor={borderColor}
            opacity={isActive ? '1' : '0.5'}
            display={isVisible ? 'block' : 'none'}
        >
            <CardHeader>
                <Flex flexDirection='row'>
                    {deal.image != undefined && <DealThumbnail dealImage={deal.image}/>}
                    <Flex justifyContent='space-between' flexWrap='wrap' flexDirection='column' pt='4' pb='1'>
                        <Tag
                            w='min'
                            whiteSpace='nowrap'
                            bgColor={tagBorderColor}
                            color={bg}
                            border={'1px solid'}
                            borderColor={bg}
                            backdropFilter="auto"
                            backdropBlur="md"
                        >
                            {isActive ? t('vendors:detail.deals.tagDeal') : t('vendors:detail.deals.tagExpired')}
                        </Tag>
                        <Text
                            color={textColor}
                            fontSize='2xl'
                            fontWeight='500'
                        >
                            {deal.title}
                        </Text>
                    </Flex>
                    { isInDashboard && <Flex ml='auto' mt='4' me='4' h='min'>
                        <NextLink href={`/app/vendors/edit/${vendorId}/deals/${deal.id}`}>
                            <Icon as={FaEdit} fontSize='18' color={bg} />
                        </NextLink>
                        <DeleteDealDialog vendorId={vendorId} dealId={deal.id}/>
                    </Flex> }
                </Flex>
            </CardHeader>
            <CardBody justifyContent='space-between' pt='0'>
                <Text color={textColor}
                      fontSize='sm'
                      fontWeight='300'>
                    {deal.description}
                </Text>
                <Flex alignItems='center' pt='3'>
                    <Icon as={FaRegClock} fontSize='13' mr='1' mt='1px' />
                    <Text color={textColor} fontWeight='500'>
                        {deal.isPermanent ? t('vendors:detail.deals.permanent') :
                            isActive ? t('vendors:detail.deals.timingEnds') + formattedDate :
                            t('vendors:detail.deals.timingEnded') + formattedDate }.
                    </Text>
                </Flex>
            </CardBody>
        </Card>
    )
}