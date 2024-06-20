import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box, Divider } from '@chakra-ui/react';
import QPlan from './QPlan';



const QPriceEntryDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  return (
    <Box p='10px'>
      {responses[0].plans.map((plan, idx) => (
        <>
          {idx !== 0 && <Divider />} 
          <QPlan key={plan.id} plan={plan} />
        </>
      ))}
    </Box>
  );
}
  
export default QPriceEntryDisplay;