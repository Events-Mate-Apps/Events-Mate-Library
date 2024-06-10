import { FC } from 'react';
import { Section } from '../../../interfaces/questionnaire';
import { Card, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';
  


const QSectionDisplay: FC<{ section: Section }> = ({ section }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
      <Text color={textColor} fontSize='xl' fontWeight='700' mb='20px'>
        {getCurrentTranslation(section.titleContent)}
      </Text>
      <Text color={secondaryTextColor} fontSize='lg' fontWeight='500' mb='20px'>
        {getCurrentTranslation(section.descriptionContent)}
      </Text>
      <p>question</p>
    </Card>
  );
}
  
export default QSectionDisplay;