import { FC } from 'react';
import { Question } from '../../../interfaces/questionnaire';
import { Card, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  


const QQuestionDisplay: FC<{ question: Question }> = ({ question }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
      {(question.titleContent && question.titleContent.translations) && <Text color={textColor} fontSize='xl' fontWeight='700' mb='20px'>
        {getCurrentTranslation(question.titleContent)}
      </Text>}
      {(question.descriptionContent && question.descriptionContent.translations) && <Text color={secondaryTextColor} fontSize='lg' fontWeight='500' mb='20px'>
        {getCurrentTranslation(question.descriptionContent)}
      </Text>}
      <p>{question.responses && JSON.stringify(question.responses[0])}</p>
      {question.subQuestions && question.subQuestions.map((q) => <QQuestionDisplay question={q} key={q.id} />)}
    </Card>
  );
}
  
export default QQuestionDisplay;