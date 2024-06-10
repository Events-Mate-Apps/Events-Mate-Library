import { FC } from 'react';
import { Question } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  


const QQuestionDisplay: FC<{ question: Question }> = ({ question }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Box p='5px 10px'>
      {(question.titleContent && question.titleContent.translations) && <Text color={textColor} fontSize='16px' fontWeight='700'>
        {getCurrentTranslation(question.titleContent)}
      </Text>}
      {(question.descriptionContent && question.descriptionContent.translations) && <Text color={secondaryTextColor} fontSize='16px' fontWeight='500'>
        {getCurrentTranslation(question.descriptionContent)}
      </Text>}
      <p>{question.responses && JSON.stringify(question.responses[0])}</p>
      {question.subQuestions && question.subQuestions.map((q) => <QQuestionDisplay question={q} key={q.id} />)}
    </Box>
  );
}
  
export default QQuestionDisplay;