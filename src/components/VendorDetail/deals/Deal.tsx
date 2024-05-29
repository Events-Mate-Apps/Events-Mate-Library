import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Flex, Icon, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import { FaRegClock, FaEdit } from 'react-icons/fa';
import { DealType } from '../../../interfaces/deals';
import dayjs from '../../../utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import DeleteDealDialog from './DeleteDealDialog';
import DealThumbnail from './DealThumbnail';
import { isEventsMate } from '../../../utils/orientation';

interface DealProps {
    deal: DealType;
    vendorId: string;
    isInDashboard: boolean;
    isNotVisible: (newState: boolean) => void;
    refetch: () => void; 
}

const Deal: React.FC<DealProps> = ({ deal, vendorId, isNotVisible, isInDashboard, refetch }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const backgroundColor = useColorModeValue('gray.100', 'navy.700');
    const borderColor = useColorModeValue('secondaryGray.200', 'navy.900');
    const bgWm = useColorModeValue('#e13784', 'brand.400');
    const bgEm = useColorModeValue('brand.900', 'brand.400');
    const tagBorderColor = useColorModeValue('white', 'navy.700');


    const [isActive, setIsActive] = useState<boolean>(false);
    const { t } = useTranslation();
    
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

    if (isVisible) return (
        <Card
            w='100%'
            background={backgroundColor}
            border={`1px solid`}
            borderRadius={`25px`}
            borderColor={borderColor}
            opacity={isActive ? '1' : '0.5'}
        >
            <CardHeader>
                <Flex flexDirection='row'>
                    {deal.image != undefined && <DealThumbnail dealImage={deal.image} />}
                    <Flex
                        justifyContent='space-around'
                        flexWrap='wrap'
                        flexDirection='column'
                    >
                        <Tag
                            w='min'
                            whiteSpace='nowrap'
                            bgColor={tagBorderColor}
                            color={isEventsMate() ? bgEm : bgWm}
                            border={'1px solid'}
                            borderColor={isEventsMate() ? bgEm : bgWm}
                            backdropFilter='auto'
                            backdropBlur='md'
                        >
                            {isActive ? t('vendors:detail.deals.tagDeal') : t('vendors:detail.deals.tagExpired')}
                        </Tag>
                        <Text
                            color={textColor}
                            fontSize={{ base: 'lg', md: '2xl' }}
                            fontWeight='500'
                        >
                            {deal.title}
                        </Text>
                    </Flex>
                    {isInDashboard && <Flex ml='auto' mt='4' me='4' h='min'>
                        <NextLink href={`/app/vendors/edit/${vendorId}/deals/${deal.id}`}>
                            <Icon as={FaEdit} fontSize='18' color={isEventsMate() ? bgEm : bgWm} />
                        </NextLink>
                        <DeleteDealDialog vendorId={vendorId} dealId={deal.id} onDelete={refetch}/>
                    </Flex>}
                </Flex>
            </CardHeader>
            <CardBody justifyContent='space-between' pt='0'>
                <Text color={textColor}
                      fontSize='sm'
                      fontWeight='300'> 
                    {deal.description}
                </Text>
                <Flex alignItems='center' pt='3'>
                    <Icon as={FaRegClock} fontSize={{ base: '8', md: '13' }} mr='1' mt={{ md: '1px' }} />
                    <Text color={textColor} fontWeight='500' fontSize={{ base: '8', md: '13' }}>
                        {deal.isPermanent ? t('vendors:detail.deals.permanent') :
                            isActive ? t('vendors:detail.deals.timingEnds') + formattedDate :
                                t('vendors:detail.deals.timingEnded') + formattedDate}.
                    </Text>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default Deal;
