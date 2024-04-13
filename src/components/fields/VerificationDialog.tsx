import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, CloseButton,
  Flex, Spacer,
  Text, useColorModeValue
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { api } from '@/utils/api';
import { useNotification } from '../../service/NotificationService';

interface VerificationDialogProps {
  path: string;
  isOpen: boolean;
  turnOffDialog: () => void;
  desc: string;
}

const VerificationDialog: React.FC<VerificationDialogProps> = ({ path, isOpen, turnOffDialog, desc }) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  const { t } = useTranslation();
  const { showError } = useNotification();
  const cancelButton = useColorModeValue('white', 'gray.700');

  const verification = async () => {
    try {
      await api.post(path);
    } catch (error) {
      showError({ error });
    }
  }

  useEffect(() => {
    if (isOpen) {
      verification();
    }
  }, [isOpen]);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={turnOffDialog}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent w='590px' h='550px'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              <Flex>
                <Spacer />
                <CloseButton
                  onClick={turnOffDialog}
                />
              </Flex>
            </AlertDialogHeader>

            <AlertDialogBody
              w='100%'
              textAlign='center'
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
            >
              <FaCheckCircle
                color='#E13784'
                size='100px'
              />
              <Text fontSize='36px' mt='20px'>
                {(t('common:success'))}
              </Text>
              <Text
                fontSize='14px'
                fontWeight='500'
                color='#E13784'
              >
                {desc}
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter mt='10px' alignSelf='center'>
              <Button
                backgroundColor={cancelButton}
                ref={cancelRef}
                onClick={turnOffDialog}
              >
                {t('common:cancel')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default VerificationDialog;