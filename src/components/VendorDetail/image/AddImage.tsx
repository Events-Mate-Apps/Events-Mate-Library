import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Image as ImageType, Vendor } from '../../../interfaces/vendor';
import { useImage } from '../../../service/ImageService';
import { useNotification } from '../../../service/NotificationService';
import Upsell from '../../../components/upsell/Upsell';

export interface AddImageProps {
  vendor: Vendor,
  images: ImageType[]
}

const AddImage: React.FC<AddImageProps> = ({ vendor, images }) => {
  const vendorId = vendor.id
  const { showError } = useNotification()
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
    }
  };

  const isUserAbleToUploadAnotherImage = () => {
    switch (vendor.priority) {
      case 0:
      case 1:
        return images.length < 1
      case 2:
        return images.length < 10
      default:
        return true
    }
  }

  return (
    // <Upsell
    //   vendor={vendor}
    //   isEnabled={!isUserAbleToUploadAnotherImage()}
    // >
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
        border='1px solid red'
        flexDir="column" 
        alignItems="center"
      >
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
          pt={"5px"}
          pl={"5px"}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file);
            }
          }}
          style={{ display: 'none' }}
          id="imageInput"
        />
      </Flex>
    // </Upsell>
  )
}

export default AddImage;