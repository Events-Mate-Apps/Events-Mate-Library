import { Text, useColorModeValue } from '@chakra-ui/react';
import useTranslation from '@/misc/i18n/useTranslation';

import Card from '@/components/card/Card';

import { Vendor } from '@/interfaces/vendor';
import Map from './Map';

interface VendorLocationProps {
	vendor: Vendor
}

const Location: React.FC<VendorLocationProps> = ({ vendor }) => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const { t } = useTranslation();

	return (
		<Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
				{t('vendors:detail.location')}
			</Text>
			{(vendor.address.postalAddress || vendor.address.thoroughfare) && (
				<Text
					mb='10px'
				>
					{vendor.address.postalAddress || vendor.address.thoroughfare}
				</Text>
			)}
			<Card pos="relative" p="0" w="full" h="280px" overflow="hidden">
				<Map
					center={{
						latitude: vendor.location?.latitude ?? 14.2,
						longitude: vendor.location?.longitude ?? 50.1
					}}
					onRegionChangeEnd={(e) => {
					}}
					onAnnotationFocus={(vendorId) => {
					}}
					vendors={[vendor]}
				/>
			</Card>
		</Card>
	);
}

export default Location;