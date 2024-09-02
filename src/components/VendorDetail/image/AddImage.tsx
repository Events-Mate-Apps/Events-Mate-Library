import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Image as ImageType, Vendor } from '../../../interfaces/vendor';
import { useImage } from '../../../service/ImageService';
import useNotificationStore from '../../../stores/notification';
import Upsell from '../../../components/upsell/Upsell';

export interface AddImageProps {
  vendor: Vendor,
  images: ImageType[],
}

const AddImage: React.FC<AddImageProps> = ({ vendor, images }) => {
  const vendorId = vendor.id
  const { showError } = useNotificationStore()
  const { uploadImage } = useImage()

  const [isUploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      await uploadImage({
        endpointPath: `images/vendors/${vendorId}`,
        file
      })
    } catch (error) {
      showError({ error })
    } finally {
      setUploading(false);
      location.reload()
    }
  };

  const isUserAbleToUploadAnotherImage = () => {
    if (vendor.isPremium){
      return images.length < 10
    } else {
      return images.length < 1
    }
  }

  return (
    <Flex
      cursor="pointer"
      w={{
        sm: '80px',
        md: '104px',
        lg: '70px',
        xl: '90px',
        '2xl': '130px',
      }}
      aspectRatio={1 / 1}
      flexDir="column" 
      alignItems="center"
    >
      <Upsell
        vendor={vendor}
        isEnabled={!isUserAbleToUploadAnotherImage()}
        w='100%'
        h='100%'
      >
        <>
          <IconButton
            aria-label='Add'
            w="100%"
            h="100%"
            size='xl'
            fontSize="25px"
            isLoading={isUploading}
            onClick={() => document.getElementById('imageInput')?.click()}
            icon={<AddIcon />}
          />
          <Input
            type="file"
            accept="image/png, image/jpeg"
            pt={'5px'}
            pl={'5px'}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file);
              }
            }}
            style={{ display: 'none' }}
            id="imageInput"
          />
        </>
      </Upsell>
    </Flex>
  )
}

export default AddImage;