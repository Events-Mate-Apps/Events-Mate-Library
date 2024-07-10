import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon, useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { FaTrash } from 'react-icons/fa';
import { isEventsMate } from '../../../utils/orientation';
import useNotificationStore from '../../../stores/notification';

interface DeleteDialogProps {
  vendorId: string,
  dealId: string,
}

const DeleteDealDialog: React.FC<DeleteDialogProps> = ({ vendorId, dealId }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgWm = useColorModeValue('#e13784', 'brand.400');
  const bgEm = useColorModeValue('brand.900', 'brand.400');
  const { t } = useTranslation();

  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const { showError, showSuccess } = useNotificationStore();
    
  const deleteDeal = async () => {
    setLoading(true)

    try {
      await api.delete(`vendors/${vendorId}/deals/${dealId}`)
      showSuccess();
    } catch (error) {
      showError({ error });
    } finally {
      onClose();
      setLoading(false);
    }
  }

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
          <AlertDialogHeader>
            {t('edit:deleteDealTitle')}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {t('edit:deleteDealText')}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t('common:no')}
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              isLoading={isLoading}
              onClick={() => deleteDeal()}
            >
              {t('common:yes')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteDealDialog;