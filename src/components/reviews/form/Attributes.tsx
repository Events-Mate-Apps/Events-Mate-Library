import React from 'react';
import { Flex } from '@chakra-ui/react';
import StarRating from '~/components/vendors/reviews/form/StarRating';

// TODO components are missing red star, to show they are mandatory
const Attributes: React.FC = () => {
  const attributes = [
    'qualityOfService',
    'responsiveness',
    'professionalism',
    'value',
    'flexibility'
  ]

  return (
    <Flex direction='column' ms={{ base: '0', md: '5' }}>
      {attributes.map(attribute => (
        <StarRating
          attribute={attribute}
          key={attribute}
        />
      ))}
    </Flex>
  )
}

export default Attributes;