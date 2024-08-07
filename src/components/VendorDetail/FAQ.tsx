import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { Vendor } from '../../interfaces/vendor';
import LocalizedText from '../localization/LocalizedText';

interface FAQProps {
  vendor: Vendor,
  language: string
}

const FAQ: React.FC<FAQProps> = ({ vendor, language }) =>{
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
  const { t } = useTranslation();

  return (
    <Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
      <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
        {t('vendors:detail.faq.title')}
      </Text>
      <Text color={textColor} fontSize='lg' fontWeight='400' lineHeight='180%'>
        {t('vendors:detail.faq.subtitle')}
      </Text>
      <Accordion
        defaultIndex={[0]}
        allowToggle
        w={{ sm: '100%', md: '100%', xl: '94%' }}
        mb="16px"
      >
        {vendor.faq.map((faq, index) => (
          <AccordionItem border="none" key={index}>
            <AccordionButton
              p="20px 0px 20px 0px"
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Box flex="1" textAlign="left">
                <Text
                  color={textColor}
                  fontWeight="700"
                  fontSize={{ sm: 'md', lg: 'md' }}
                >
                  <LocalizedText 
                    content={faq.question}
                    language={language}
                  />
                </Text>
              </Box>
              <AccordionIcon color="gray.500" />
            </AccordionButton>
            <AccordionPanel p="18px 0px 10px 0px">
              <Text
                color="secondaryGray.600"
                fontWeight="500"
                fontSize="md"
                textAlign="left"
                alignSelf="flex-start"
                justifySelf="flex-start"
              >
                <LocalizedText 
                  content={faq.answer}
                  language={language}
                />
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

export default FAQ;