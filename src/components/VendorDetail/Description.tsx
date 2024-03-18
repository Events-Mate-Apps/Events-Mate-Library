import { Text, useColorModeValue } from '@chakra-ui/react';

import Card from '../../components/card/Card';

import MarkdownReader from './MarkdownReader';
import { DescriptionWithLabel } from '../../interfaces/vendor';
import useTranslation from 'next-translate/useTranslation';

interface DescriptionProps { 
	desc: DescriptionWithLabel
}

const VendorDescription: React.FC<DescriptionProps> = ({ desc }) => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const { t } = useTranslation();

	return (
		<Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
				{t('vendors:detail.aboutUs')}
			</Text>
			<MarkdownReader source={desc.value} />
		</Card>
	);
}

export default VendorDescription;