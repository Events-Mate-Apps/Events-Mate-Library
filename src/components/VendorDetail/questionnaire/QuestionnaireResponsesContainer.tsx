import { FC } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QSectionDisplay from './QSectionDisplay';
  


const QuestionnaireResponsesContainer: FC<{ questionnaire: Questionnaire }> = ({ questionnaire }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box p='5px 10px'>
      {(questionnaire.titleContent && questionnaire.titleContent.translations) && <Text color={textColor} fontSize='20px' fontWeight='700'>
        {getCurrentTranslation(questionnaire.titleContent)}
      </Text>}
      {(questionnaire.descriptionContent && questionnaire.descriptionContent.translations) && <Text color={textColor} fontSize='20px' fontWeight='700'>
        {getCurrentTranslation(questionnaire.descriptionContent)}
      </Text>}
      {questionnaire.sections.map(section => (<QSectionDisplay section={section} key={section.id} />))}
    </Box>
  );
}
  
export default QuestionnaireResponsesContainer;