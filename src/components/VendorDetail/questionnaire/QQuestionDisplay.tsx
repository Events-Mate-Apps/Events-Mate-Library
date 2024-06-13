import { FC } from 'react';
import { Question } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  
import { QUESTION_DISPLAY_COMPONENT } from '../../../constants/questionnaire';

const QQuestionDisplay: FC<{ question: Question }> = ({ question }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  const ResponseComponent = QUESTION_DISPLAY_COMPONENT[question.type];

  return (
    <Box p='10px'>
      {(question.titleContent && question.titleContent.translations) && (
        <Text color={textColor} fontSize='16px' fontWeight='700'>
          {getCurrentTranslation(question.titleContent)}
        </Text>
      )}
      {(question.descriptionContent && question.descriptionContent.translations) && (
        <Text color={secondaryTextColor} fontSize='16px' fontWeight='500'>
          {getCurrentTranslation(question.descriptionContent)}
        </Text>
      )}
      {question.responses && <ResponseComponent 
        responses={question.responses}
        options={question.options} 
      />}
      {question.subQuestions && question.subQuestions.map((q) => (
        <QQuestionDisplay question={q} key={q.id} />
      ))}
    </Box>
  );
}

export default QQuestionDisplay;