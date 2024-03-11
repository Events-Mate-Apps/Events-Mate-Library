import { Box, Flex, FormLabel, Switch, Text, useColorModeValue } from '@chakra-ui/react';

interface SwitchFieldProps {
  id: string;
  label?: string;
  isChecked?: boolean;
  onChange?: () => void;
  desc?: string;
  textWidth?: string | number;
  fontSize?: string | number;
  [x: string]: any;
}

export default function SwitchField(props: SwitchFieldProps) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth,
    fontSize,
    ...rest
  } = props;

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box w='100%' fontWeight='500' {...rest}>
      <Flex justify='space-between' align='center' borderRadius='16px'>
        <FormLabel
          htmlFor={id}
          _hover={{ cursor: 'pointer' }}
          flexDirection='column'
          maxW={textWidth ? textWidth : '75%'}
        >
          <Text color={textColorPrimary} fontSize='md' fontWeight='500'>
            {label}
          </Text>
          <Text color='secondaryGray.600' fontSize={fontSize ? fontSize : 'md'}>
            {desc}
          </Text>
        </FormLabel>
        <Switch
          isChecked={isChecked}
          id={id}
          onChange={onChange}
          size={{base: 'sm', md: 'md'}} //TODO does not work, even though it is according to the docs
        />
      </Flex>
      
    </Box>
  );
}
