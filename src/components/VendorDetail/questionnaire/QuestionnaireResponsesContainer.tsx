import { FC } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QSectionDisplay from './QSectionDisplay';

const QuestionnaireResponsesContainer: FC<{ questionnaire: Questionnaire }> = ({ questionnaire }) => {
  const { getCurrentTranslation } = useLocalization();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box p='10px'>
      {(questionnaire.titleContent && questionnaire.titleContent.translations) && (
        <Text color={textColor} fontSize='22px' fontWeight='700'>
          {getCurrentTranslation(questionnaire.titleContent)}
        </Text>
      )}
      {(questionnaire.descriptionContent && questionnaire.descriptionContent.translations) && (
        <Text color={textColor} fontSize='22px' fontWeight='700'>
          {getCurrentTranslation(questionnaire.descriptionContent)}
        </Text>
      )}
      <Flex wrap="wrap">
        {questionnaire.sections.map((section, index) => (
          <Box
            key={section.id}
            flex={{ base: '0 0 100%', lg: '0 0 50%' }}
            maxW={{ base: '100%', lg: '50%' }}
            p='10px'
          >
            <QSectionDisplay
              section={section}
              isLast={questionnaire.sections.length - 1 === index}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default QuestionnaireResponsesContainer;