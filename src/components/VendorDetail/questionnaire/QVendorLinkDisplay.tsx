import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';

const QLinkDisplay: FC<QDisplayComponentProps> = ({ responses }) => {

  return (
    <Box p='10px'>
      <p>{JSON.stringify(responses[0].partnerVendorIds)}</p>
    </Box>
  );
}
  
export default QLinkDisplay;