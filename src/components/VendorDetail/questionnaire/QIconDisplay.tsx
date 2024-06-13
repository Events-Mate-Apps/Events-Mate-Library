import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';

const QIconDisplay: FC<QDisplayComponentProps> = ({ responses, options }) => {

  return (
    <Box p='10px'>
      <p>{JSON.stringify(options?.map(e => e.faIcon))}</p>
      <p>{responses && JSON.stringify(responses[0].optionIds)}</p>
    </Box>
  );
}
  
export default QIconDisplay;