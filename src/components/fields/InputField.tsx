import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputProps,
    Text,
  } from '@chakra-ui/react';
  import React, { forwardRef } from 'react';
  import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
  import FormLabel from './FormLabel';
  
  export default forwardRef(function InputField(
    props: {
      id?: string;
      label?: string;
      extra?: React.JSX.Element;
      placeholder?: string;
      value?: string;
      type?: string;
      error?:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined;
      helperText?: string;
      autoComplete?: string;
    } & Omit<InputProps, 'ref'>,
    ref
  ) {
    const {
      id,
      label,
      extra,
      placeholder,
      type,
      value,
      mb,
      error,
      helperText,
      isRequired,
      autoComplete = 'on',
  
      ...rest
    } = props;
  
    return (
      <Flex direction="column" mb={mb ? mb : '30px'}>
        <FormControl isInvalid={!!error} isRequired={isRequired}>
          <FormLabel htmlFor={id} display={label ? 'flex' : 'none'}>
            {label}
            {extra && (
              <Text fontSize="sm" fontWeight="400" ms="2px">
                {extra}
              </Text>
            )}
          </FormLabel>
          <Input
            {...rest}
            ref={ref}
            type={type}
            id={id}
            autoComplete={autoComplete}
            fontWeight="500"
            variant="main"
            placeholder={placeholder}
            display='flex'
            _placeholder={{ fontWeight: '400', color: 'secondaryGray.600' }}
            value={value}
            h={{base: '38px', md: '44px'}}
            maxH="44px"
          />
          {helperText && (
            <FormHelperText ms="10px" fontSize="sm" fontWeight="400">
              {helperText}
            </FormHelperText>
          )}
          {error && (
            <FormErrorMessage mx={rest.mx} w={rest.w} fontSize={{base: '2xs', md: 'md'}}>
              <Flex ps={{base: '15px', md: '20px'}}>
                {typeof error === 'string' && error}
              </Flex>
            </FormErrorMessage>
          )}
        </FormControl>
      </Flex>
    );
  });
  