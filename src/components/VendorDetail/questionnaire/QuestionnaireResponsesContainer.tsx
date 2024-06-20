import { FC } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QSectionDisplay from './QSectionDisplay';
  


const QuestionnaireResponsesContainer: FC<{ questionnaire: Questionnaire }> = ({ questionnaire }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box p='10px'>
      {(questionnaire.titleContent && questionnaire.titleContent.translations) && <Text color={textColor} fontSize='22px' fontWeight='700'>
        {getCurrentTranslation(questionnaire.titleContent)}
      </Text>}
      {(questionnaire.descriptionContent && questionnaire.descriptionContent.translations) && <Text color={textColor} fontSize='22px' fontWeight='700'>
        {getCurrentTranslation(questionnaire.descriptionContent)}
      </Text>}
      <Flex flexWrap='wrap'>
        {questionnaire.sections.map((section, index) => (
          <QSectionDisplay
            section={section}
            key={section.id}
            isLast={questionnaire.sections.length - 1 === index}
          />))}
      </Flex>
    </Box>
  );
}
  
export default QuestionnaireResponsesContainer;