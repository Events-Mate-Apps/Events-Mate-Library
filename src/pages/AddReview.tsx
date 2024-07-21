import {
  Box,
  Button,
  Card,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { VendorReviewPost } from '../interfaces/review';
import useTranslation from 'next-translate';
import { FormProvider, useForm } from 'react-hook-form';
import Confetti from 'react-confetti';
import NextLink from 'next/link';
import Attributes from '../components/reviews/form/Attributes';
import Recommendation from '../components/reviews/form/Recommendation';
import Email from '../components/reviews/form/Email';
import MoreInfo from '../components/reviews/form/MoreInfo';
import { Vendor } from '../interfaces/vendor'
import ReviewVendorImage from '../components/reviews/form/ReviewVendorImage';
import useNotificationStore from '../stores/notification';
import { api } from '../utils/api';
import AsyncButton from '../components/buttons/AsyncButton';

export type NewReviewFormValues = {
  qualityOfService: number,
  responsiveness: number,
  professionalism: number,
  value: number,
  flexibility: number,
  recommend: boolean,
  didWeHelp: boolean,
  title: string,
  description?: string,
  amountSpent?: number,
  guestsAttended?: number,
  authorEmail: string,
};

const AddReview: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const form = useForm<NewReviewFormValues>({
    mode: 'onChange',
    defaultValues: {
      recommend: true,
      didWeHelp: true
    }
  });

  const { formState } = form;
  const { showError } = useNotificationStore();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { t } = useTranslation();
  const tabs = [
    t('vendors:detail.reviews.form.tabs.rateIt'),
    t('vendors:detail.reviews.form.tabs.commentIt'),
    t('vendors:detail.reviews.form.tabs.moreInfo'),
    t('vendors:detail.reviews.form.tabs.finalStep'),
    t('vendors:detail.reviews.form.tabs.done'),
  ]
  const tabTitles = [
    t('vendors:detail.reviews.form.tabTitles.rateIt'),
    t('vendors:detail.reviews.form.tabTitles.recommendation'),
    t('vendors:detail.reviews.form.tabTitles.moreInfo'),
    t('vendors:detail.reviews.form.tabTitles.finalStep'),
    t('vendors:detail.reviews.form.tabTitles.done'),
  ]

  const sendReview = async (values: NewReviewFormValues) => {

    const roundTo = function (num: number, places: number) {
      const factor = 10 ** places;
      return Math.round(num * factor) / factor;
    };

    const review: VendorReviewPost = {
      rating: roundTo((values.qualityOfService + values.responsiveness + values.professionalism + values.value + values.flexibility) / 5, 1),
      authorIp: '0.0.0.0', //TODO needs to be redone, so the user doesn't send more than one review
      qualityOfService: values.qualityOfService,
      responsiveness: values.responsiveness,
      professionalism: values.professionalism,
      value: values.value,
      flexibility: values.flexibility,
      recommend: values.recommend,
      didWeHelp: values.didWeHelp,
      title: values.title,
      description: values.description || '',
      amountSpent: values.amountSpent || 0,
      guestsAttended: values.guestsAttended || 0,
      authorEmail: values.authorEmail,
    };
    try {
      await api.post(`vendors/${vendor.id}/reviews`, review);

      setCurrentTab(4);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      showError({ error });
    }
  }

  //TODO instead of form.watch, StarRating component should re-render index.tsx automatically using formContext somehow
  const watchedFields = form.watch(['qualityOfService', 'responsiveness', 'professionalism', 'value', 'flexibility']);
  let nextStepEnabled = true;

  watchedFields.forEach((rating) => {
    if (!rating) {
      nextStepEnabled = false
    }
  })

  const onSubmit = (values: NewReviewFormValues) => {
    if (currentTab === 3) sendReview(values);
    else setCurrentTab(currentTab + 1);
  }

  return (
    <Box p='2%'>
      <Flex
        pt={{ base: '70px', md: '85px', lg: '75px' }}
        mx={'5vh'}
        justifyContent='center'
      >
        {vendor.images.length > 0 && <ReviewVendorImage vendor={vendor} />}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex
              direction='column'
              minH='100vh'
              align='center'
              position='relative'
            >
              <Box
                h={{ base: '200px', md: '240px', '2xl': '300px' }}
                bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
                position='absolute'
                w='100%'
                borderRadius='30px'
                display={{ base: 'none', md: 'block' }}
              />
              <Tabs
                isLazy
                index={currentTab}
                zIndex='0'
                mt={{ md: '40px' }}
                flexDirection='column'
                variant='unstyled'
              >
                <TabList
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='center'
                  alignSelf='center'
                  justifySelf='center'
                >
                  {tabs.map((tab, idx) => {
                    return (
                      <Tab
                        key={idx}
                        w={{
                          sm: '600px',
                          md: '134px',
                          lg: '174px',
                          xl: '144px',
                          '2xl': '174px'
                        }}
                        isDisabled={idx > currentTab}
                      >
                        <Flex
                          direction='column'
                          justify='center'
                          align='center'
                          position='relative'
                          w='100%'
                          _before={{
                            display: tabs.length - 1 === idx ? 'none' : 'block',
                            content: '\'\'',
                            width: {
                              sm: '44px',
                              md: '118px',
                              lg: '158px',
                              xl: '128px',
                              '2xl': '158px'
                            },
                            height: '3px',
                            bg: currentTab > idx ? 'white' : '#8476FF',
                            left: {
                              sm: '22px',
                              md: '59px',
                              lg: '79px',
                              xl: '64px',
                              '2xl': '79px'
                            },
                            top: {
                              sm: '6px',
                              md: undefined,
                            },
                            position: 'absolute',
                            transition: 'all .3s ease'
                          }}
                        >
                          <Box
                            zIndex='1'
                            border='2px solid'
                            borderColor={currentTab >= idx ? 'white' : '#8476FF'}
                            bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
                            w='16px'
                            h='16px'
                            mb='8px'
                            borderRadius='50%'
                          />
                          <Text
                            color={currentTab >= idx ? 'white' : 'gray.300'}
                            fontWeight={currentTab >= idx ? 'bold' : 'normal'}
                            display={{ sm: 'none', md: 'block' }}
                          >
                            {tab}
                          </Text>
                        </Flex>
                      </Tab>
                    );
                  })}
                </TabList>
                <Card
                  p={{ base: '20px', md: '30px' }}
                  mt={{ md: '35px' }}
                  w={{ base: '90vw', md: '75%', xl: '85%' }}
                  mx='auto'
                >
                  <Text
                    color={textColor}
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight='700'
                    mb='20px'
                    ps={4}
                  >
                    {tabTitles[currentTab]}
                  </Text>
                  <TabPanels>
                    <TabPanel>
                      <Attributes />
                    </TabPanel>
                    <TabPanel>
                      <Recommendation />
                    </TabPanel>
                    <TabPanel>
                      <MoreInfo />
                    </TabPanel>
                    <TabPanel>
                      <Email />
                    </TabPanel>
                    <TabPanel>
                      <Text>
                        {t('vendors:detail.reviews.form.done')}
                      </Text>
                    </TabPanel>
                  </TabPanels>
                  <Flex
                    justify='flex-end'
                    mt='24px'
                    display={currentTab === 4 ? 'flex' : 'none'}
                  >
                    <Button
                      as={NextLink}
                      fontSize='sm'
                      borderRadius='16px'
                      href={`/vendors/${vendor.id}`}
                      w={{ base: '128px', md: '148px' }}
                      h='46px'
                    >
                      {t('common:view')}
                    </Button>
                  </Flex>
                  <Flex
                    justify='space-between'
                    mt='24px'
                    display={currentTab === 4 ? 'none' : 'flex'}
                  >
                    <Button
                      color=''
                      fontSize={{ base: 'xs', md: 'sm' }}
                      borderRadius={{ base: '12px', md: '16px' }}
                      w={{ base: '100px', md: '125px', lg: '148px' }}
                      h={{ base: '34px', md: '40px', lg: '46px' }}
                      visibility={currentTab === 0 ? 'hidden' : 'visible'}
                      onClick={() => setCurrentTab(currentTab - 1)}
                    >
                      {t('common:actions.back')}
                    </Button>
                    <AsyncButton
                      variant='darkBrand'
                      fontSize={{ base: 'xs', md: 'sm' }}
                      borderRadius={{ base: '10px', md: '16px' }}
                      w={{ base: '100px', md: '125px', lg: '148px' }}
                      h={{ base: '34px', md: '40px', lg: '46px' }}
                      ms='auto'
                      type='submit'
                      isDisabled={!formState.isValid || !nextStepEnabled}
                    >
                      {currentTab === 3 ? t('common:done') : t('common:next')}
                    </AsyncButton>
                  </Flex>
                </Card>
              </Tabs>
            </Flex>
          </form>
        </FormProvider>
        {showConfetti && <Confetti />}
      </Flex>
    </Box>
  );
}

export default AddReview;