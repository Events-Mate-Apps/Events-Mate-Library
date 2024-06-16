import { FC } from 'react';
import { QDisplayComponentProps, QuestionType } from '../../../interfaces/questionnaire';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import useTranslation from 'next-translate/useTranslation';


const QTextDisplay: FC<QDisplayComponentProps> = ({ responses, fsTitle }) => {
  const { getCurrentTranslation } = useLocalization()
  const { t } = useTranslation()
  const brandColor = useColorModeValue('brand.900', 'brand.400')

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

  const color = responses[0].questionType !== QuestionType.YES_NO ? (
    brandColor
  ) : (
    responses[0].booleanResponse ? 'green.300' : 'red.500'
  )
  
  return (
    <Box p='10px'>
      <Text as='p' color={color} fontWeight='bold' fontSize={`${fsTitle}px`}>{displayedValue}</Text>
    </Box>
  );
}
  
export default QTextDisplay;