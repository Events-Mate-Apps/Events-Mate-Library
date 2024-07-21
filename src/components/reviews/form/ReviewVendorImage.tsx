
import React from 'react';
import Image from '@em-library/components/image/Image';
import { Box, Flex } from '@chakra-ui/react';
import { Vendor } from '@em-library/interfaces/vendor'

const ReviewVendorImage: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  //TODO more complex selection of image
  const image = vendor.images[0].src;

  return (
    <Flex
      direction='column'
      display={{ base: 'none', xl: 'flex' }}
      me={{ lg: '40px', xl: '60px' }}
      mb={{ sm: '24px', lg: '0px' }}
    >
      <Box
        w='30vw'
        h='620px'
        mb='26px'
        mx={{ sm: 'auto', lg: 'auto', xl: '0px' }}
      >
        <Image
          src={image}
          w='100%'
          h='100%'
          borderRadius='15px'
          alt=''
        />
      </Box>
    </Flex>
  );
}

export default ReviewVendorImage;