import { FC } from 'react';
import { Section } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QQuestionDisplay from './QQuestionDisplay'

const QSectionDisplay: FC<{ section: Section, isLast: boolean }> = ({ section }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Box 
      px='10px'
      pt='10xp'
      mb='60px'
      w={{ base: '100%' }}
      borderColor='chakra-border-color._dark'
      borderBottom='1px'
    >
      {(section.titleContent && section.titleContent.translations) && <Text color={textColor} fontSize='20px' fontWeight='700'>
        {getCurrentTranslation(section.titleContent)}
      </Text>}
      {(section.descriptionContent && section.descriptionContent.translations) && <Text color={secondaryTextColor} fontSize='20px' fontWeight='500'>
        {getCurrentTranslation(section.descriptionContent)}
      </Text>}
      {section.questions.map((question, questionIndex) => <QQuestionDisplay 
        fsTitle={18}
        fsDesc={16}
        question={question}
        key={question.id} 
        isFirst={questionIndex === 0}
      />)}
    </Box>
  );
}
  
export default QSectionDisplay;