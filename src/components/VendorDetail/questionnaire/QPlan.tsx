import { FC } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { QuestionnairePlan } from '../../../interfaces/questionnaire';
import { useLocalization } from '../../../service/LocalizationService';

interface QPlanProps {
  plan: QuestionnairePlan
}

const QPlan: FC<QPlanProps> = ({ plan }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  const { getCurrentTranslation, getCurrentPrice } = useLocalization()
  console.log(getCurrentPrice(plan.prices))
  return (
    <Flex p='10px' justifyContent='space-between'>
      <Box>
        {plan.titleContent.translations && <Text color={textColor} fontSize={`${14}px`} fontWeight='700'>
          {getCurrentTranslation(plan.titleContent)}
        </Text>}
        {plan.descriptionContent.translations && <Text color={secondaryTextColor} fontSize={`${12}px`} fontWeight='700'>
          {getCurrentTranslation(plan.descriptionContent)}
        </Text>}
      </Box>
      <Text fontSize='2xl'>{plan.unitVolume} {plan.unit}</Text>
      {/* <Text fontSize='2xl'>{plan.unitVolume} {plan.unit} / {getCurrentPrice(plan.prices).amount} {getCurrentPrice(plan.prices).currencyISO}</Text> */}
    </Flex>
  );
}
  
export default QPlan;