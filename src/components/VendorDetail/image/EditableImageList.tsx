import { Button, Flex, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { Image, Vendor } from "../../../interfaces/vendor"
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTranslation from "next-translate/useTranslation";
import { api } from "../../../utils/api";
import AddImage from "./AddImage";
import DraggableImage from "./DraggableImage";

interface EditableImageListProps {
    vendor: Vendor,
    setCurrentImage: React.Dispatch<React.SetStateAction<string>>,
}

const EditableImageList: React.FC<EditableImageListProps> = ({ vendor, setCurrentImage }) => {
    const { t } = useTranslation()
    const [images, setImages] = useState<Image[]>(vendor.images)
    const [isLoading, setLoading] = useState<boolean>(false);
    const toast = useToast()

    const sendNewImagesOrder = async () => {
        setLoading(true)

        try {
            await api.put(`vendors/${vendor.id}`, {
                images
            })

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
            setLoading(false)
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
    }, [images])

    return (
        <DndProvider backend={HTML5Backend}>
            <SimpleGrid
                columns={4}
                spacing={{ sm: '20px', md: '35px', lg: '20px' }}
                justifyContent="flex-start"
                width="100%"
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

                <Flex
                    cursor="pointer"
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
                >   
                    <AddImage 
                        vendor={vendor} 
                        images={images}
                    />
                </Flex>
            </SimpleGrid>
            <Button
                variant="darkBrand"
                fontSize="sm"
                borderRadius="16px"
                w={{ base: '128px', md: '148px' }}
                h="46px"
                mt="10px"
                onClick={() => sendNewImagesOrder()}
                isLoading={isLoading}
            >
                {t('edit:saveChanges')}
            </Button>
        </DndProvider>
    )
}

export default EditableImageList;