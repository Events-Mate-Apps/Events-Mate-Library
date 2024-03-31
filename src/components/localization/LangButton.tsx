import { Box, Flex, Tag, TagLabel, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Vendor } from '../../interfaces/vendor';
import { isEventsMate } from '~/utils/orientation';

interface LangButtonProps {
  vendor?: Vendor,
  title?: string,
  isSelected?: boolean,
  onClick?: () => void
}

const LangButton: React.FC<LangButtonProps> = (
  { title, isSelected, onClick }) => {

  const bgColor = useColorModeValue(
    isEventsMate() ? 'brand.900' : '#e13784', 
    isEventsMate() ? 'brand.400' : '#e13784', 
  ) 

  return (
    <Box
      maxW='100%'
      overflowX="scroll"
    >
      <Flex
        whiteSpace="nowrap"
        maxW='100%'
        p="2"     
      >
        <Tag
          minW='100%'
          size='lg'
          borderRadius='full'
          bgColor={isSelected ? bgColor : ''}
          color={isSelected ? 'white' : ''}
          colorScheme='blackAlpha'
          onClick={onClick}
          cursor='pointer'
          textTransform='uppercase'
        >
          <TagLabel mx='5px'>{ title }</TagLabel>
        </Tag>
      </Flex>
    </Box>
  );
}

export default LangButton;
