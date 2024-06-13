import { FC } from 'react';
import { QDisplayComponentProps, QuestionType } from '../../../interfaces/questionnaire';
import { Box, Text } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import useTranslation from 'next-translate/useTranslation';


const QTextDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  const { getCurrentTranslation } = useLocalization()
  const { t } = useTranslation()
  const displayedValue = (() => {
    switch (responses[0].questionType) {
      case QuestionType.TEXT:
        return getCurrentTranslation(responses[0].textResponseContent);
      case QuestionType.NUMERIC:
        return responses[0].numericResponse;
      case QuestionType.YES_NO:
        return responses[0].booleanResponse ? t('vendors:questionnaire.yes') : t('vendors:questionnaire.no');
      default:
        return 'No response';
    }
  })();
  
  return (
    <Box p='10px'>
      <Text color='brand.900' fontWeight='bold' fontSize='lg'>{displayedValue}</Text>
    </Box>
  );
}
  
export default QTextDisplay;