import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Image,
  Input,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NewVendorForValues } from '../../../interfaces/vendor';
import { useImage } from '../../../service/ImageService';

export interface Image {
  src: string;
  hash: string;
  alt: string;
  id?: string;
  position?: number;
};

export interface AddImageProps {
  vendorId: string,
}

const AddImage: React.FC<AddImageProps> = ({ vendorId }) => {
  const toast = useToast();
  const { formState: { errors } } = useFormContext<NewVendorForValues>();
  const { t } = useTranslation();
  const { uploadImage } = useImage()

  const [isUploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      uploadImage({
        endpointPath: `images/vendors/${vendorId}`,
        file
      })

      toast({
        title: t('edit:success'),
        description: t('edit:editHasBeenSuccessful'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (e) {
      toast({
        title:  t('edit:error'),
        description: `${t('edit:error')}: ${e}`,
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormControl isInvalid={errors['image'] != null}>
      <Flex h="100%" flexDir="column" alignItems="center">
        {errors['image'] && (
          <FormErrorMessage mb={4}>
            {String(errors.image.message)}
          </FormErrorMessage>
        )}
        <Controller
          name="image"
          render={({ field: { onChange, ref, value } }) => (
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
            </>
          )}
        />
      </Flex>
    </FormControl>
  );
}

export default AddImage;