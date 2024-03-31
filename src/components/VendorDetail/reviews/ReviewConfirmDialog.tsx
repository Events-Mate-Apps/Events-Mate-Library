import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button, CloseButton,
    Flex, Spacer,
    Text, useColorModeValue, useToast
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { api } from '../../../utils/api';
import { CustomError } from '~/interfaces/global';

interface ReviewConfirmDialogProps {
    token?: string | string[];
    isOpen: boolean;
    turnOffDialog: () => void;
}

const ReviewConfirmDialog: React.FC<ReviewConfirmDialogProps> = ({ token, isOpen, turnOffDialog }) => {
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);

    const toast = useToast();
    const { t } = useTranslation()
    const cancelButton = useColorModeValue('white', 'gray.700');

    const verification = async () => {
        try {
            if (token) {
                const parsedToken = typeof token === 'string' ? token : token[0];
                await api.post(`vendors/reviews/confirmReview?token=${parsedToken}`);
            }
        } catch (error) {
            const err = error as CustomError;
            console.error('Error occurred. Stack trace: ' + (err.raw?.message || err.message));

            toast({
                title: t('common:error'),
                description: t('vendors:detail.reviews.confirmError', { x: (err.raw?.message || err.message)}),
                status: 'error',
            });
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
                                <Spacer/>
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
                                {(t('vendors:detail.reviews.confirm'))}
                            </Text>
                            <Text
                                fontSize='14px'
                                fontWeight='500'
                                color='#E13784'
                            >
                                {(t('vendors:detail.reviews.confirmText'))}
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

export default ReviewConfirmDialog;