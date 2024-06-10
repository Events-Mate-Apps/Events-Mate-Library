import { FC } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import { Card, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
  


const QuestionnaireResponsesContainer: FC<{ questionnaire: Questionnaire }> = ({ questionnaire }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
      <Text color={textColor} fontSize='xl' fontWeight='700' mb='20px'>
        {getCurrentTranslation(questionnaire.titleContent)}
      </Text>
      <p>xvjefniwugjwr</p>
    </Card>
  );
}
  
export default QuestionnaireResponsesContainer;