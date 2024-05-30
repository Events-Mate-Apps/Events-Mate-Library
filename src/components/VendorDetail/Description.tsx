import { Card, Text, useColorModeValue } from '@chakra-ui/react';
import { TranslationTextContent } from '../../interfaces/vendor';
import useTranslation from 'next-translate/useTranslation';
import LocalizedText from '../localization/LocalizedText';

interface DescriptionProps { 
	description: TranslationTextContent,
	language: string
}

const VendorDescription: React.FC<DescriptionProps> = ({ description, language }) => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const { t } = useTranslation();

	return (
		<Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
				{t('vendors:detail.aboutUs')}
			</Text>
			<LocalizedText 
				markdown
				language={language}
				content={description}
			/>
		</Card>
	);
}

export default VendorDescription;