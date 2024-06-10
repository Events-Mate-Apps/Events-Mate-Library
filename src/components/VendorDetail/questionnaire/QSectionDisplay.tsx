import { FC } from 'react';
import { Section } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QQuesstionDisplay from './QQuestionDisplay'

const QSectionDisplay: FC<{ section: Section }> = ({ section }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Box p='10px' mb='10px'>
      {(section.titleContent && section.titleContent.translations) && <Text color={textColor} fontSize='xl' fontWeight='700' mb='20px'>
        {getCurrentTranslation(section.titleContent)}
      </Text>}
      {(section.descriptionContent && section.descriptionContent.translations) && <Text color={secondaryTextColor} fontSize='lg' fontWeight='500' mb='20px'>
        {getCurrentTranslation(section.descriptionContent)}
      </Text>}
      {section.questions.map((question) => <QQuesstionDisplay question={question} key={question.id} />)}
    </Box>
  );
}
  
export default QSectionDisplay;