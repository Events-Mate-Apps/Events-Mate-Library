import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  ImageProps as ChakraImageProps,
  IconButton,
  useToast,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Image as ImageType } from '../../../interfaces/vendor';
import { api } from '../../../utils/api';
import Image from '../../image/Image';

export interface DraggableImageProps {
  index: number;
  image: ImageType;
  moveImage: (fromIndex: number, toIndex: number) => void;
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>,
  refetch: () => Promise<void> 
};

const DraggableImage: React.FC<DraggableImageProps> = ({ 
  index, moveImage, image, setCurrentImage, refetch
}) => {

  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { index, image },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (dragged: { index: number }) => {
      if (dragged.index !== index) {
        moveImage(dragged.index, index);
        dragged.index = index;
      }
    },
  });

  const toast = useToast()
  const { t } = useTranslation()

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const onCloseDeleteAlert = () => setIsDeleteAlertOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const showDeleteAlert = () => {
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteImage = async (id?: string) => {
    setIsDeleteAlertOpen(false);  // Close the alert dialog
    await deleteImage(id);
  }

  const deleteImage = async (id?: string) => {
    try {
      await api.delete(`vendors/images/${id}`)

      toast({
        title: t('edit:success'),
        description: t('edit:editHasBeenSuccessful'),
        status: 'success',
      })
    } catch (e) {
      toast({
        title: t('edit:error'),
        description: `${t('edit:error')}: ${e}`,
        status: 'error',
      })
    } finally {
      await refetch()
    }
  }

  return (
    <div>
      <Box
        key={index}
        ref={(node) => ref(drop(node))}
        cursor="move"

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
        <IconButton
          aria-label='Delete'
          size="xs"
          isRound={true}
          fontSize="10px"
          onClick={showDeleteAlert}
          icon={<DeleteIcon />}
          position='absolute'
          top="3px"
          right="3px"
          variant="darkBrand"
        />
      </Box>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Image
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => confirmDeleteImage(image.id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default DraggableImage;
