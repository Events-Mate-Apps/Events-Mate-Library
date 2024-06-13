import { FC } from 'react';
import { Section } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QQuestionDisplay from './QQuestionDisplay'

const QSectionDisplay: FC<{ section: Section }> = ({ section }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Box p='10px'>
      {(section.titleContent && section.titleContent.translations) && <Text color={textColor} fontSize='16px' fontWeight='700'>
        {getCurrentTranslation(section.titleContent)}
      </Text>}
      {(section.descriptionContent && section.descriptionContent.translations) && <Text color={secondaryTextColor} fontSize='16px' fontWeight='500'>
        {getCurrentTranslation(section.descriptionContent)}
      </Text>}
      {section.questions.map((question) => <QQuestionDisplay question={question} key={question.id} />)}
    </Box>
  );
}
  
export default QSectionDisplay;