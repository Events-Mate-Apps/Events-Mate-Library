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
import useTranslation from '@/misc/i18n/useTranslation';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NewVendorForValues } from '@/interfaces/vendor';
import { simpleUploadVendorImage, compressImage } from '../../../service/ImageService'; 

export interface Image {
  src: string;
  hash: string;
  alt: string;
  id?: string;
  position?: number;
};

export interface AddImageProps {
  vendorId: string
}

const AddImage: React.FC<AddImageProps> = ({ vendorId }) => {
  const toast = useToast();
  const { formState: { errors } } = useFormContext<NewVendorForValues>();
  const { t } = useTranslation();
  const [isUploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File, onChange: (value: Image | null) => void) => {
    setUploading(true);
    try {
      const MAX_SIZE = 700 * 1024; // 700 KB

      let compressedFile = file;
      if (file.size > MAX_SIZE) {
        compressedFile = await compressImage(file, MAX_SIZE);
      }

      const imgResponse = await simpleUploadVendorImage(compressedFile, vendorId);

      const img: Image = {
        ...imgResponse,
        alt: imgResponse.alt || 'Default Alt Text',
      };
      onChange(img);

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
                        setSelectedFile(file);
                        handleImageUpload(file, onChange);
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