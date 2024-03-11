import { PropsWithChildren } from 'react';
import {
  FormLabel as ChakraFormLabel,
  FormLabelProps,
  useColorModeValue,
} from '@chakra-ui/react';

export default function FormLabel(props: PropsWithChildren<FormLabelProps>) {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const { children, ...rest } = props;
  return (
    <ChakraFormLabel
      display="flex"
      ms="10px"
      fontSize="sm"
      color={textColorPrimary}
      fontWeight="bold"
      _hover={{ cursor: 'pointer' }}
      {...rest}
    >
      {children}
    </ChakraFormLabel>
  );
}
