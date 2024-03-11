import {
    Button,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import useTranslation from '@/misc/i18n/useTranslation';
import Card from '@/components/card/Card';
import React, {useEffect, useState} from "react";
import dayjs from "@/utils/dayjs";
import {useRouter} from "next/router";
import NextLink from "next/link";
import {AddIcon} from "@chakra-ui/icons";
import {TinyColor} from "@ctrl/tinycolor/dist";
import { api } from '@/utils/api';
import { Deal } from './Deal';
import { DealType } from '../../../interfaces/deals';
import { Vendor } from '~/interfaces/vendor';

interface DealsCardProps {
    vendor: Vendor
}

const DealsCard: React.FC<DealsCardProps> = ({ vendor }) => {
    const [isAnyActive, setIsAnyActive] = useState<boolean>(false);
    const [isInDashboard, setIsInDashboard] = useState<boolean>(false);
    const { t } = useTranslation();

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const bgHover = useColorModeValue(
        { bg: new TinyColor('#e13784').darken(5).toString() },
        { bg: 'brand.300' });
    const bg = useColorModeValue('#e13784', 'brand.400');
    const router = useRouter();

    const [deals, setDeals] = useState<DealType[]>([])
    const getDeals = async (): Promise<void> => {
        if (!vendor.isPremium) return

        try {
            const { data } = await api.get(`vendors/${vendor.id}/deals`)
            setDeals(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => { getDeals() }, [])


    const sortedDeals = deals?.slice().sort((a, b) => {
        const isPermanentComparison = b.isPermanent ? 1 : -1;

        if (a.isPermanent !== b.isPermanent) {
            return isPermanentComparison;
        }

        return dayjs(b.endsAt).diff(dayjs(a.endsAt));
    });

    useEffect(() => {
        router.pathname.includes('edit') && setIsInDashboard(true);
    }, []);

    const handleIsNotActive = (newState: boolean) => {
        if (!isAnyActive) {
            setIsAnyActive(newState);
        }
    };

    return (
        <Card
            p='30px'
            mb={{ base: '20px', '2xl': '20px' }}
            display={isAnyActive ? 'block' : 'none'}
            bgColor={!isInDashboard ? 'navy.00' : 'transparent'}
        >
            <Flex w="100%" mb='20px'>
                <Text color={textColor} fontSize='2xl' fontWeight='700'>
                    {sortedDeals?.length == 1 ? t('vendors:detail.deals.titleSingular') : t('vendors:detail.deals.titleMultiple')}
                </Text>
            </Flex>
            <Flex w="100%" justify='space-between' flexWrap='wrap'>
                {sortedDeals != undefined &&
                    sortedDeals?.length > 0 &&
                    sortedDeals?.map((deal, key) => {
                        return (
                            <Deal
                                deal={deal}
                                key={key}
                                vendorId={vendor.id}
                                isNotVisible={handleIsNotActive}
                                isInDashboard={isInDashboard}
                            />
                        );
                    })}
            </Flex>
            { isInDashboard &&
                <Flex w="100%">
                    <Button
                        as={NextLink}
                        href={`${vendor.id}/deals/new`}
                        color='white'
                        background={bg}
                        _hover={bgHover}
                        leftIcon={<AddIcon />}
                        letterSpacing='normal'
                        size="md"
                        m='auto'
                    >
                        {t('vendors:detail.deals.create.header')}
                    </Button>
                </Flex>
            }
        </Card>
    );
}

export default DealsCard;