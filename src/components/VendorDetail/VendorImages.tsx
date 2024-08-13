import { Flex, Box } from '@chakra-ui/react';

import React, { useState } from 'react';

import ImageList from './image/ImageList';
import EditableImageList from './image/EditableImageList';
import { Vendor } from '../../interfaces/vendor';
import Image from '../image/Image';


interface VendorImagesProps  { 
  vendor: Vendor, 
  editable?: boolean,
  refetch?: () => Promise<void> 
}

const VendorImages: React.FC<VendorImagesProps> = ({ vendor, editable, refetch }) => {
  const [currentImage, setCurrentImage] = useState(vendor.images[0]?.src || '/placeholder.png');

  return (
    <Flex
      direction="column"
      me={editable ? { lg: '0px', xl: '0px' } : { lg: '40px', xl: '60px' }}
      mb={{ sm: '24px', lg: '0px' }}
    >
      <Box
        w={
          editable ? { base: '100%' } :
            {
              sm: '100%',
              md: '100%',
              lg: '800px',
              xl: '555px',
              '2xl': '745px',
            }
        }
        aspectRatio={editable ? 1 : 'auto'}
        h={
          editable ? { base: 'auto' } :
            {
              sm: '450px',
              md: '670px',
              lg: '600px',
              xl: '555px',
              '2xl': '745px',
            }
        }
        mb="26px"
        mx={{ sm: 'auto', lg: 'auto', xl: '0px' }}
      >
        <Image
          src={currentImage}
          w="100%"
          h="100%"
          borderRadius="15px"
          alt=""
        />
      </Box>
      <Box w={
        editable ? { base: '100%' } :
          {
            sm: '100%',
            md: '100%',
            lg: '800px',
            xl: '555px',
            '2xl': '745px',
          }
      }>
        {
          (editable && refetch) ? (
            <EditableImageList
              vendor={vendor} 
              setCurrentImage={setCurrentImage}
            />
          ) : (
            <ImageList
              vendor={vendor} 
              setCurrentImage={setCurrentImage}
            />
          )
        }
      </Box>
    </Flex>
  );
}

export default VendorImages;