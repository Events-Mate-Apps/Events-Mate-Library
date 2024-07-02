import { Button, Tooltip, Wrap } from '@chakra-ui/react';
import { Image, Vendor } from '../../../interfaces/vendor'
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useTranslation from 'next-translate/useTranslation';
import { api } from '../../../utils/api';
import AddImage from './AddImage';
import DraggableImage from './DraggableImage';
import useNotificationStore from '../../../stores/notification';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface EditableImageListProps {
  vendor: Vendor,
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>,
}

const EditableImageList: React.FC<EditableImageListProps> = ({ vendor, setCurrentImage  }) => {
  const { t } = useTranslation()
  const [images, setImages] = useState<Image[]>(vendor.images)
  const [isLoading, setLoading] = useState<boolean>(false);
  const { showSuccess, showError } = useNotificationStore()
  const [isNewImagesOrder, setIsNewImagesOrder] = useState<boolean>(false)

  const sendNewImagesOrder = async () => {
    setLoading(true)

    try {
      await api.put(`vendors/${vendor.id}`, { images })
      showSuccess({
        description: t('edit:editHasBeenSuccessful'),
      })
    } catch (error) {
      showError({error})
    } finally {
      setLoading(false)
      location.reload()
    }        
  }
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    
    updatedImages.forEach((img, idx) => {
      // TODO:
      // eslint-disable-next-line
      img.position = idx + 1;
    });
    
    setImages(updatedImages);
  };

  useEffect(() => {
    // TODO:
    // eslint-disable-next-line
    images.forEach((e, idx) => e.position = (idx + 1))
    if (vendor.images !== images) setIsNewImagesOrder(true)
  }, [images])
    

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrap
        width='100%'
        spacing={{ sm: '10px', md: '20px' }}
        justifyContent="flex-start"
      >
        {images.map((image, index) => (
          <DraggableImage
            image={image} 
            index={index}
            moveImage={moveImage}
            key={index}
            setCurrentImage={setCurrentImage}
          />
        ))}
        <AddImage
          vendor={vendor} 
          images={images}
        />
      </Wrap>
      <Tooltip label={t(`edit:saveNewImagesOrderInfo`)}>
        <Button
          variant="darkBrand"
          fontSize="sm"
          borderRadius="16px"
          w='fit-content'
          isDisabled={!isNewImagesOrder} 
          h="46px"
          mt="10px"
          onClick={() => sendNewImagesOrder()}
          isLoading={isLoading}
          rightIcon={<InfoOutlineIcon />}
        >
          {t('edit:saveNewImagesOrder')}
        </Button>
      </Tooltip>
    </DndProvider>
  )
}

export default EditableImageList;