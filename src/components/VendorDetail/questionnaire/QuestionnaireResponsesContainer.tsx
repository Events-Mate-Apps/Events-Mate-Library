import { FC } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
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
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        {questionnaire.sections.map((section, index) => (
          <QSectionDisplay
            section={section}
            key={section.id}
            isLast={questionnaire.sections.length - 1 === index}
          />))}
      </SimpleGrid>
    </Box>
  );
}
  
export default QuestionnaireResponsesContainer;