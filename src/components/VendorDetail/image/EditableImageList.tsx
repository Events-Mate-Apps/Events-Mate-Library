import { Button, Flex, SimpleGrid, Stack, Tooltip, Wrap, useToast } from "@chakra-ui/react";
import { Image, Vendor } from "../../../interfaces/vendor"
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTranslation from "next-translate/useTranslation";
import { api } from "../../../utils/api";
import AddImage from "./AddImage";
import DraggableImage from "./DraggableImage";
import { useNotification } from "../../../service/NotificationService";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface EditableImageListProps {
    vendor: Vendor,
    setCurrentImage: React.Dispatch<React.SetStateAction<string>>,
    refetch: () => Promise<void> 
}

const EditableImageList: React.FC<EditableImageListProps> = ({ vendor, setCurrentImage, refetch  }) => {
    const { t } = useTranslation()
    const [images, setImages] = useState<Image[]>(vendor.images)
    const [isLoading, setLoading] = useState<boolean>(false);
    const { showSuccess, showError } = useNotification()
    const [isNewImagesOrder, setIsNewImagesOrder] = useState<boolean>(false)

    const sendNewImagesOrder = async () => {
        setLoading(true)

        try {
            await api.put(`vendors/${vendor.id}`, { images })
            await refetch()
            showSuccess({
                description: t('edit:editHasBeenSuccessful'),
            })
        } catch (error) {
            showError({error})
        } finally {
            setLoading(false)
            setIsNewImagesOrder(false)
            setImages(vendor.images)
        }        
    }
    const moveImage = (fromIndex: number, toIndex: number) => {
        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
    
        updatedImages.forEach((img, idx) => {
          img.position = idx + 1;
        });
    
        setImages(updatedImages);
    };

    useEffect(() => {
        images.forEach((e, idx) => e.position = (idx + 1))
        if (vendor.images !== images) setIsNewImagesOrder(true)
    }, [images])

    useEffect(() => {
        setImages(vendor.images)
    }, [vendor])
    

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
                    refetch={refetch}
                    vendor={vendor} 
                    images={images}
                />
            </Wrap>
            <Tooltip isDisabled={isNewImagesOrder} label='You can change order of you images by Drag and Drop system'>
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