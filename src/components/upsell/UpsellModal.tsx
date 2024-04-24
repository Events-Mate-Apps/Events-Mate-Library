
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Progress, Stat, StatHelpText, StatNumber, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useMemo, useState } from 'react';
import Card from '~/components/card/Card';
import { useNotification } from '../../service/NotificationService';
import { Invoice, Price, ProductWithPrices } from '../../interfaces/stripe';
import { Vendor } from '../../interfaces/vendor';
import { api } from '~/utils/api';

interface UpsellModalProps {
  vendor: Vendor,
  isOpen: boolean,
  onClose: () => void,
}

export enum Interval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

const UpsellModal: React.FC<UpsellModalProps> = ({ vendor, onClose, isOpen }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [pickedOption, setPickedOption] = useState<Interval>(Interval.MONTHLY)
  const [isLoading, setIsLoading] = useState<boolean>(false) 

  const closeModal = () => {
    onClose()
    location.reload()
  }

  const { t, lang } = useTranslation();

  const bgColor = useColorModeValue('white', 'navy.700');
  const titleFontSize = useBreakpointValue({ base: '1xl', md: '4xl' });
  const flexFlow = useBreakpointValue({ base: 'column', md: 'row' });
  const modalSize = useBreakpointValue({ base: 'md', md: '3xl' });
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.800', 'whiteAlpha.700');
  const brandColor = useColorModeValue('brand.900', 'brand.200');

  const { showError } = useNotification()

  const languageToCurrency: { [key: string]: string } = {
    en: 'usd',
    cs: 'czk',
    sk: 'eur'
  };

  const [currency] = useState(languageToCurrency[lang]);

  const [defaultPrices, setDefaultPrices] = useState<{ current: ProductWithPrices | null, platinum: ProductWithPrices | null }>({
    current: null,
    platinum: null
  })

  const [proratedPrices, setProratedPrices] = useState<{ monthly: Invoice | null, yearly: Invoice | null }>({
    monthly: null,
    yearly: null
  })

  const monthlyPrice = useMemo(() => defaultPrices.platinum && (defaultPrices.platinum.prices.find(price => price.recurring.interval === 'month')), [defaultPrices]);
  const yearlyPrice = useMemo(() => defaultPrices.platinum && (defaultPrices.platinum.prices.find(price => price.recurring.interval === 'year')), [defaultPrices]);

  const currentMontlyPrice = useMemo(() => defaultPrices.current && (defaultPrices.current.prices.find(price => price.recurring.interval === 'month')), [defaultPrices]);
  const currentYearlyPrice = useMemo(() => defaultPrices.current && (defaultPrices.current.prices.find(price => price.recurring.interval === 'year')), [defaultPrices]);

  useEffect(() => {
    calculateProration(Interval.YEARLY)
    calculateProration(Interval.MONTHLY)
  }, [monthlyPrice, yearlyPrice])

  useEffect(() => {
    loadPrices()
  }, [])

  const loadPrices = async () => {
    if (!vendor.premiumSubscription) return
    try {
      const { data } = await api.get('payments/products-prices');

      const p: ProductWithPrices[] = data;
      const filteredProducts = p.filter(product => product.product.name !== 'WeddMate+');

      const current = filteredProducts.find(e => ((e.product.metadata.priority as number) == vendor.premiumSubscription.priority)) as ProductWithPrices
      const platinum = filteredProducts.find(e => ((e.product.metadata.priority as number) == 4)) as ProductWithPrices

      setDefaultPrices({ current, platinum });
    } catch (error) {
      showError({ error });
    }
  }

  const calculateProration = async (interval: Interval) => {
    if (!(monthlyPrice && yearlyPrice)) return

    try {
      const vendorId = vendor.id;

      const { data } = await api.post(`payments/calculate-proration`, {
        newPriceId: interval === Interval.MONTHLY ? monthlyPrice.id : yearlyPrice.id,
        vendorId: vendorId,
      });
      
      setProratedPrices(prevState => ({ ...prevState, [interval]: data }));
    } catch (error) {
      showError({ error })
    } 
  };

  const displayAmount = (price: Price) => {
    return (price?.currency_options?.[currency]?.unit_amount_decimal / 100).toFixed()
  }

  // TODO: Move GoogleAnalytics into the submodul
  // const handlePlanSelectionEvent = (category: string, priceId: string, error?: string) => {
  //   TrackGoogleAnalyticsEvent({
  //     action: 'plan_selected',
  //     label: 'Plan Selected',
  //     page: 'Pricing',
  //     params: {
  //       /* eslint-disable-next-line */
  //       selected_plan: priceId,
  //       error: error
  //     }
  //   });
  // }

  const upgradeSubscription = async (price: Price) => {
    setIsLoading(true)

    try {
      const vendorId = vendor.id;

      await api.post(`payments/upgrade-subscription`, {
        newPriceId: price.id,
        vendorId,
      });

    //   handlePlanSelectionEvent('event', price.id)
    } catch (error) {
      showError({ error })
    } finally {
      setIsLoading(false)
      setCurrentTab(2)
    }
  };

  return (
    <Modal 
      isCentered
      isOpen={isOpen}
      onClose={closeModal}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent background={bgColor} pt='25px' pb='10px'>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            index={currentTab}
          >
            <TabPanels>
              <TabPanel>
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  flexFlow='column'
                >
                  <Text
                    color={textColor}
                    fontWeight='bolder'
                    textAlign='center'
                    fontSize='1.25rem'
                  >
                    {`Your Subscription type isn't enough for this feature :(`}
                  </Text>
                  <Text
                    color={textColorSecondary}
                    textAlign='center'
                    mb='20px'
                  >
                    {`But don't you worry, here's an offer for you!`}
                  </Text>
                  <Flex
                    gap='25px'
                    flexFlow={flexFlow}
                  >
                    <Card w='300px'>
                      <Text
                        color={textColor}
                        fontWeight='bolder'
                        textAlign='center'
                      >
                        {defaultPrices.current?.product.name}
                      </Text>
                      <Text
                        color={textColorSecondary}
                        textAlign='center'
                      >
                        {t('common:upsell.yourCurrentPlan')}
                      </Text>
                      <Stat textAlign='center' my='25px'>
                        {!(currentMontlyPrice && currentYearlyPrice) ? <Progress size='xs' isIndeterminate /> :
                          <Box>
                            <StatNumber>{displayAmount(currentMontlyPrice)} {currency.toUpperCase()}/mo</StatNumber>
                            <StatHelpText>{displayAmount(currentYearlyPrice)} {currency.toUpperCase()}/yr</StatHelpText>
                          </Box>
                        }
                      </Stat>
                    </Card>
                    <Card w='300px'>
                      <Text
                        color={textColor}
                        fontWeight='bolder'
                        textAlign='center'
                      >
                        {defaultPrices.platinum?.product.name}
                      </Text>
                      <Text
                        color={textColorSecondary}
                        textAlign='center'
                      >
                        {t('common:upsell.betterPlan')}
                      </Text>
                      <Stat textAlign='center' my='25px'>
                        {!(monthlyPrice && yearlyPrice) ? <Progress size='xs' isIndeterminate /> :
                          <Box>
                            <StatNumber>{monthlyPrice && displayAmount(monthlyPrice)} {currency.toUpperCase()}/mo</StatNumber>
                            <StatHelpText>{yearlyPrice && displayAmount(yearlyPrice)} {currency.toUpperCase()}/yr</StatHelpText>
                          </Box>
                        }
                      </Stat>
                    </Card>
                  </Flex>
                  <Button
                    mt='20px'
                    variant='darkBrand'
                    onClick={() => setCurrentTab(1)}
                  >
                    {t('common:upsell.calculateProration')}
                  </Button>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  flexFlow='column'
                >
                  <Flex
                    gap='25px'
                    flexFlow={flexFlow}
                  >
                    <Card w='300px'>
                      <Text
                        color={textColor}
                        fontWeight='bolder'
                        textAlign='center'
                      >
                        {t('common:upsell.platinumPlan')}
                      </Text>
                      <Stat textAlign='center' my='50px'>
                        <StatNumber color={textColor}>{proratedPrices.monthly?.amount_due && proratedPrices.monthly?.amount_due / 100} {proratedPrices.monthly?.currency.toUpperCase()}</StatNumber>
                        <StatHelpText color={textColorSecondary}>Monthly</StatHelpText>
                      </Stat>
                      <Button
                        variant='darkBrand'
                        onClick={() => {
                          monthlyPrice && upgradeSubscription(monthlyPrice)
                          setPickedOption(Interval.MONTHLY)
                        }}
                        isLoading={isLoading}
                      >
                        {t('common:upsell.goPremium')}
                      </Button>
                    </Card>
                    <Card w='300px'>
                      <Text
                        color={textColor}
                        fontWeight='bolder'
                        textAlign='center'
                      >
                        {t('common:upsell.platinumPlan')}
                      </Text>
                      <Stat textAlign='center' my='50px'>
                        <StatNumber color={textColor}>{proratedPrices.yearly?.amount_due && proratedPrices.yearly?.amount_due / 100} {proratedPrices.yearly?.currency.toUpperCase()}</StatNumber>
                        <StatHelpText color={textColorSecondary}>Yearly</StatHelpText>
                      </Stat>
                      <Button
                        variant='darkBrand'
                        onClick={() => {
                          yearlyPrice && upgradeSubscription(yearlyPrice)
                          setPickedOption(Interval.YEARLY)
                        }}
                        isLoading={isLoading}
                      >                          
                        {t('common:upsell.goPremium')}
                      </Button>
                    </Card>
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  flexFlow='column'
                >
                  <Flex
                    w='200px'
                    h='200px'
                    borderRadius='full'
                    bgColor={brandColor}
                    alignItems='center'
                    justifyContent='center'
                    mt='70px'
                  >
                    <Icon color='white' boxSize='28' as={CheckIcon} />
                  </Flex>
                  <Text
                    mt='20px'
                    fontSize={titleFontSize}
                    fontWeight='bolder'
                  >
                    {t('common:upsell.paymentSuccessful')}
                  </Text>
                  <Text
                    fontSize='lg'
                    fontWeight='bolder'
                    color={brandColor}
                    mb='90px'
                  >
                    {t('common:upsell.thankYouForPayment')}
                  </Text>
                  <Text
                    fontWeight='bolder'
                  >
                    {t('common:upsell.amountPay')} <Text as='span' color={brandColor}>{`${(proratedPrices?.[`${pickedOption}`]?.amount_due || 0) / 100} ${proratedPrices?.[`${pickedOption}`]?.currency.toUpperCase()}`}</Text>
                  </Text>
                  <Text
                    fontWeight='bolder'
                  >
                    {pickedOption} 
                    <Text as='span' color={brandColor}> {t('common:upsell.premium')}</Text> {t('common:upsell.plan')}
                  </Text>
                  <Button mt='70px' mb='20px' onClick={() => closeModal()}>
                    {t('common:upsell.close')}
                  </Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpsellModal;
