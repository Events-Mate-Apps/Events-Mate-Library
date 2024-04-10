import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Icon,
    useColorModeValue,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FaTrash } from 'react-icons/fa';
import { api } from '../../../utils/api';
import { isEventsMate } from '../../../utils/orientation';

interface DeleteDealDialogProps {
    vendorId: string;
    dealId: string;
    onDelete: () => void; 
}

const DeleteDealDialog: React.FC<DeleteDealDialogProps> = ({ vendorId, dealId, onDelete }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const bgWm = useColorModeValue('#e13784', 'brand.400');
    const bgEm = useColorModeValue('brand.900', 'brand.400');

    const toast = useToast();

    const cancelRef = React.useRef<HTMLButtonElement>(null);


    const deleteDeal = async () => {
        setLoading(true);

        try {
            await api.delete(`vendors/${vendorId}/deals/${dealId}`);
            toast({
                title: t('edit:vendorDeleteSuccess'),
                status: 'success',
                duration: 3000
            });
            onDelete();
        } catch (e) {
            toast({
                title: t('edit:dealDeleteError'),
                description: `${t('edit:dealDeleteError')}: ${e}`,
                status: 'error',
                duration: 3000
            });
        } finally {
            onClose();
            setLoading(false);
        }
    };

    return (
        <>
            <Icon
                as={FaTrash}
                ml='3'
                mt='1px'
                fontSize='16'
                cursor='pointer'
                color={isEventsMate() ? bgEm : bgWm}
                onClick={onOpen}
            />
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{t('edit:deleteDealTitle')}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>{t('edit:deleteDealText')}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>{t('common:no')}</Button>
                        <Button colorScheme='red' ml={3} isLoading={isLoading} onClick={deleteDeal}>
                            {t('common:yes')}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteDealDialog;
