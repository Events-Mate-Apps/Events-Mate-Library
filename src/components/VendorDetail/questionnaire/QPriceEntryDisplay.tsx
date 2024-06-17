import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';

const QPriceDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  return (
    <Box p='10px'>
      <Text color={textColor} fontSize={`${14}px`} fontWeight='700'>
          Coca-Cola
      </Text>
      <Text color={secondaryTextColor} fontSize={`${12}px`} fontWeight='700'>
          Coca-Cola Popisek
      </Text>
      <p>12 Ks / 300 CZK</p>
      <Divider></Divider>
      <Text color={textColor} fontSize={`${14}px`} fontWeight='700'>
          Fanta
      </Text>
      <Text color={secondaryTextColor} fontSize={`${12}px`} fontWeight='700'>
          Fanta Popisek
      </Text>
      <p>12 Ks / 300 CZK</p>
      <Divider></Divider>
      <Text color={textColor} fontSize={`${14}px`} fontWeight='700'>
          Sprite
      </Text>
      <Text color={secondaryTextColor} fontSize={`${12}px`} fontWeight='700'>
          Sprite
      </Text>
      <p>12 Ks / 300 CZK</p>
    </Box>
  );
}
  
export default QPriceDisplay;