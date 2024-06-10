import { FC } from 'react';
import { QuestionResponse, QuestionType } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';
import { useLocalization } from '~/service/LocalizationService';


const QTextDisplay: FC<{ response: QuestionResponse }> = ({ response }) => {
  const { getCurrentTranslation } = useLocalization()
  const content = (type: QuestionType) => {
    switch (type) {
      case QuestionType.TEXT:
        return getCurrentTranslation(response.textResponseContent)
      case QuestionType.NUMERIC:
        return response.numericResponse
      case QuestionType.YES_NO:
        return response.booleanResponse
    }
  }

  return (
    <Box p='10px'>
      <p>{content(response.questionType)}</p>
    </Box>
  );
}
  
export default QTextDisplay;