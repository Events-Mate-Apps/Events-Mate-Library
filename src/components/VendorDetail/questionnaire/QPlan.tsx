import { FC } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { QuestionnairePlan } from '../../../interfaces/questionnaire';
import { useLocalization } from '../../../service/LocalizationService';
import useTranslation from 'next-translate/useTranslation';

interface QPlanProps {
  plan: QuestionnairePlan
}

const QPlan: FC<QPlanProps> = ({ plan }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');
  const { t } = useTranslation()

  const { getCurrentTranslation, getCurrentPrice } = useLocalization();
  const currentPrice = getCurrentPrice(plan.prices);

  return (
    <Flex p='10px' justifyContent='space-between' alignItems='center'>
      <Box>
        {plan.titleContent.translations && (
          <Text color={textColor} fontSize='14px' fontWeight='700'>
            {getCurrentTranslation(plan.titleContent)}
          </Text>
        )}
        {plan.descriptionContent.translations && (
          <Text color={secondaryTextColor} fontSize='12px' fontWeight='700'>
            {getCurrentTranslation(plan.descriptionContent)}
          </Text>
        )}
      </Box>
      <Text fontWeight='700'>
        {plan.unitVolume} {t(`questionnaire:priceUnits.${plan.unit}`)} /{' '}
        {currentPrice?.amount ? currentPrice.amount : 'No amount :P'}{' '}
        {currentPrice?.currencyISO ? currentPrice.currencyISO : 'No ISO :P'}
      </Text>
    </Flex>
  );
};

export default QPlan;