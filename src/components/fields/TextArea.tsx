import { Flex, FormLabel, Textarea, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export interface CustomTextareaProps {
  id?: string;
  label?: string;
  extra?: string;
  placeholder?: string;
  mb?: string;
  onChange?: (value: string) => void;
  [x: string]: any;
}

const TextArea: React.FC<CustomTextareaProps> = ({
  id,
  label,
  extra,
  placeholder,
  mb = '30px',
  onChange,
  ...rest
}) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const bgPrimary = useColorModeValue('transparent', 'navy.800');
  const borderPrimary = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Flex direction="column" mb={mb}>
      <FormLabel
        textAlign="start"
        opacity={1}
        display="flex"
        paddingTop="16px"
        paddingLeft="16px"
        fontSize="sm"
        color={textColorPrimary}
        fontWeight="bold"
        _hover={{ cursor: 'pointer' }}
      >
        {label}
        <Text fontSize="sm" fontWeight="normal" ms="2px">
          {extra}
        </Text>
      </FormLabel>
      <Textarea
        id={id}
        placeholder={placeholder}
        h="44px"
        color={textColorPrimary}
        fontSize="sm"
        bg={bgPrimary}
        border="1px solid"
        borderColor={borderPrimary}
        borderRadius="16px"
        onChange={handleChange}
        {...rest}
        _placeholder={{ color: 'secondaryGray.500' }}
      />
    </Flex>
  );
};

export default TextArea;
