import { FC } from 'react';
import { Question, QuestionType } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  
import QTextDisplay from './QTextDisplay';
import QIconDisplay from './QIconDisplay';
import QPriceDisplay from './QPriceDisplay';
import QLinkDisplay from './QLinkDisplay';

const QQuestionDisplay: FC<{ question: Question }> = ({ question }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  const getResponseComponent = () => {
    if ([QuestionType.TEXT, QuestionType.YES_NO, QuestionType.NUMERIC].includes(question.type)) {
      return QTextDisplay;
    }
    if ([QuestionType.MULTIPLE_CHOICE, QuestionType.SINGLE_CHOICE].includes(question.type)) {
      return QIconDisplay;
    }
    if (question.type === QuestionType.PRICE_ENTRY) return QPriceDisplay;
    if (question.type === QuestionType.VENDOR_LINK) return QLinkDisplay;
    return QTextDisplay;
  };

  const ResponseComponent = getResponseComponent();

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
      {question.responses && question.responses.map((response, index) => (
        <ResponseComponent response={response} key={index} />
      ))}
      {question.subQuestions && question.subQuestions.map((q) => (
        <QQuestionDisplay question={q} key={q.id} />
      ))}
    </Box>
  );
}

export default QQuestionDisplay;