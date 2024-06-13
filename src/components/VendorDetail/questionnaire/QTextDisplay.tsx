import { FC } from 'react';
import { QDisplayComponentProps, QuestionType } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import useTranslation from 'next-translate/useTranslation';


const QTextDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  const { getCurrentTranslation } = useLocalization()
  const { t } = useTranslation()
  // TODO: There's should be map when we'll need more than 3 text displays
  const displayedValue = responses && (
    responses[0].questionType === QuestionType.TEXT ? 
      getCurrentTranslation(responses[0].textResponseContent) : 
      responses[0].numericResponse
  )
  
  return (
    <Box p='10px'>
      <p>{displayedValue}</p>
    </Box>
  );
}
  
export default QTextDisplay;