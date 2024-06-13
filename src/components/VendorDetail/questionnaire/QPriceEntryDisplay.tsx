import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';

const QPriceDisplay: FC<QDisplayComponentProps> = ({ responses }) => {

  return (
    <Box p='10px'>
      <p>{JSON.stringify(responses[0].plans)}</p>
    </Box>
  );
}
  
export default QPriceDisplay;