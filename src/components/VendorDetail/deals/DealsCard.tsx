import {
  Box,
  Button,
  Card,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import dayjs from '../../../utils/dayjs';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AddIcon } from '@chakra-ui/icons';
import { api } from '../../../utils/api';
import Deal from './Deal';
import { DealType } from '../../../interfaces/deals';
import { Vendor } from '../../../interfaces/vendor';
import Upsell from '../../../components/upsell/Upsell';
import { useNotification } from '../../../service/NotificationService';

const DealsCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const [isAnyActive, setIsAnyActive] = useState<boolean>(false);
  const [isInDashboard, setIsInDashboard] = useState<boolean>(false);
  const { t } = useTranslation();
  const { showError } = useNotification()

  const router = useRouter();

  const [deals, setDeals] = useState<DealType[]>([])
  const getDeals = async (): Promise<void> => {
    try {
      const { data } = await api.get(`vendors/${vendor.id}/deals`)
      const sortedDeals = (data as DealType[]).slice().sort((a, b) => {
        const isPermanentComparison = b.isPermanent ? 1 : -1;
    
        if (a.isPermanent !== b.isPermanent) {
          return isPermanentComparison;
        }
        
        return dayjs(b.endsAt).diff(dayjs(a.endsAt));
      });
      setDeals(sortedDeals)
    } catch (error) {
      showError({ error })
    }
  }

  useEffect(() => {
    getDeals()
  }, [])

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
      bgColor={!isInDashboard ? 'navy.00' : 'transparent'}
    >
      <Box w='100%' mb='20px'>
        <Text 
          ml="2"
          fontSize="2xl"
          fontWeight="600"
        >
          {deals.length == 1 ? t('vendors:detail.deals.titleSingular') : t('vendors:detail.deals.titleMultiple')}
        </Text>
        {isInDashboard && <Text 
          mb="6"
          ml="2"
        >
          {t('edit:dealsSubTitle')}
        </Text>}
      </Box> 
      <SimpleGrid
        columns={
          isInDashboard ? 1 : { 
            base: 1, lg: 2, xl: 3 
          }
        }
        spacing='15px'
      >
        {deals[0] &&
          deals.map((deal, key) => {
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
      </SimpleGrid>
      {isInDashboard &&
        <Flex w='100%' justifyContent='center' mt='15px'>
          <Upsell
            vendor={vendor}
            isEnabled={vendor.priority < 2}
          >
            <Button
              pointerEvents={vendor.priority < 2 ? 'none' : 'all'}
              as={NextLink}
              href={`${vendor.id}/deals/new`}
              variant='darkBrand'
              leftIcon={<AddIcon />}
              letterSpacing='normal'
              size='md'
              m='auto'
            >
              {t('vendors:detail.deals.create.header')}
            </Button>
          </Upsell>
        </Flex>
      }
    </Card>
  );
}

export default DealsCard;