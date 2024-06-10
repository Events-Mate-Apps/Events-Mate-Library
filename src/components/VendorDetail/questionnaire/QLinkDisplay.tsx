import { FC } from 'react';
import { QuestionResponse } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';

const QLinkDisplay: FC<{ response: QuestionResponse }> = ({ response }) => {

  return (
    <Box p='10px'>
      <p>{JSON.stringify(response.vendorPartnerships)}</p>
    </Box>
  );
}
  
export default QLinkDisplay;