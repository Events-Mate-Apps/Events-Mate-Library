import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Icon,
    Flex,
    Box,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import useTranslation from '@/misc/i18n/useTranslation';

import Card from '@/components/card/Card';

import { Translation, TranslationTextContent, Vendor } from '../../interfaces/vendor';
import LocalizedText from '../localization/LocalizedText';

interface FAQProps {
    vendor: Vendor,
}

const FAQ: React.FC<FAQProps> = ({ vendor }) =>{
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
    const { t } = useTranslation();

    const { lang } = useTranslation()

    const getCurrentTranslation = (ISO: string, content: TranslationTextContent) => {
        const translation = content.translations.find(e => e.languageISO === ISO)?.translation
        if (!translation) return content.defaultTranslation?.translation
        return translation
    }

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
                                    <LocalizedText content={faq.question} />
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
                                <LocalizedText content={faq.question} />
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Card>
    );
}

export default FAQ;