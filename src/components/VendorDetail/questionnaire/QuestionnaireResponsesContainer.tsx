import { FC } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import { Card, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QSectionDisplay from './QSectionDisplay';
  


const QuestionnaireResponsesContainer: FC<{ questionnaire: Questionnaire }> = ({ questionnaire }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
      {questionnaire.titleContent.translations && <Text color={textColor} fontSize='xl' fontWeight='700' mb='20px'>
        {getCurrentTranslation(questionnaire.titleContent)}
      </Text>}
      {questionnaire.descriptionContent.translations && <Text color={textColor} fontSize='36px' fontWeight='700' mb='20px'>
        {getCurrentTranslation(questionnaire.descriptionContent)}
      </Text>}
      {questionnaire.sections.map(section => (<QSectionDisplay section={section} key={section.id} />))}
    </Card>
  );
}
  
export default QuestionnaireResponsesContainer;