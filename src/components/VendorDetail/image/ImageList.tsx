import { Box, Stack } from '@chakra-ui/react';
import { Vendor } from '../../../interfaces/vendor'
import Image from '../../image/Image';

interface ImageListProps {
  vendor: Vendor,
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>
}

const ImageList: React.FC<ImageListProps> = ({ vendor, setCurrentImage }) => {

  return (
    <Stack
      direction="row"
      spacing={{ sm: '20px', md: '35px', lg: '20px' }}
      justifyContent="flex-start"
      width="fit-content"
    >
      {vendor.images.map((image, index) => (
        <Box
          key={index}
          w={{
            sm: '42px',
            md: '104px',
            lg: '70px',
            xl: '90px',
            '2xl': '130px',
          }}
          h={{
            sm: '42px',
            md: '104px',
            lg: '70px',
            xl: '90px',
            '2xl': '130px',
          }}
          justifyContent='center'
          position='relative'
        >
          <Image
            src={image.src}
            w="100%"
            h="100%"
            borderRadius="15px"
            cursor="pointer"
            onClick={() => setCurrentImage(image.src)}
            alt={image.alt || ''}
          />
        </Box>
      ))}
    </Stack>
  )
}

export default ImageList;