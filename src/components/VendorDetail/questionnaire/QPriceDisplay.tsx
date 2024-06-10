import { FC } from 'react';
import { QuestionResponse } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';

const QPriceDisplay: FC<{ response: QuestionResponse }> = ({ response }) => {

  return (
    <Box p='10px'>
      <p>{JSON.stringify(response.optionIds)}</p>
    </Box>
  );
}
  
export default QPriceDisplay;