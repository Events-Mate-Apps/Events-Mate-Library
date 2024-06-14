import { FC } from 'react';
import { Section } from '../../../interfaces/questionnaire';
import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
import QQuestionDisplay from './QQuestionDisplay'

const QSectionDisplay: FC<{ section: Section }> = ({ section }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Box p='10px' mb='30px'>
      {(section.titleContent && section.titleContent.translations) && <Text color={textColor} fontSize='20px' fontWeight='700'>
        {getCurrentTranslation(section.titleContent)}
      </Text>}
      {(section.descriptionContent && section.descriptionContent.translations) && <Text color={secondaryTextColor} fontSize='20px' fontWeight='500'>
        {getCurrentTranslation(section.descriptionContent)}
      </Text>}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacingX='50px'
        pb='20px'
      >
        {section.questions.map((question, index) => <QQuestionDisplay 
          fsTitle={18}
          fsDesc={16}
          index={index}
          question={question}
          key={question.id} 
          isRoot
        />)}
      </SimpleGrid>
    </Box>
  );
}
  
export default QSectionDisplay;