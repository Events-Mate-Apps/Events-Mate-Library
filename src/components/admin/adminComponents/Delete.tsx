import {
  Button,
  Flex,
  LightMode,
  Text,
  useColorModeValue,
  Card,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FC, useRef } from 'react';
import { UserData } from '../../../interfaces/user';
import { api } from '../../../utils/api';
interface DeleteProps {
  user: UserData
}

const Delete: FC<DeleteProps> = ({ user }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';

  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteUser = async () => {
    try {
      await api.delete(`auth/delete-account/${user.id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDelete = () => {
    deleteUser();
    onClose();
  };

  return (
    <>
      <Card
        p="30px"
        py="34px"
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        alignItems="center"
      >
        <Flex direction="column">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            {t('common:deleteAccount')}
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            {t('common:deleteAccountDialog')}
          </Text>
        </Flex>
        <LightMode>
          <Button
            colorScheme="red"
            variant="outline"
            mt={{ base: '20px', md: '0' }}
            _hover={{ bg: 'whiteAlpha.100' }}
            _focus={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            p="15px 40px"
            fontSize="sm"
            h="44px"
            fontWeight="500"
            ms="auto"
            onClick={onOpen}
          >
            {t('common:delete')}
          </Button>
        </LightMode>
      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('common:deleteAccount')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('common:deleteAccountQuestion')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('common:cancel')}
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {t('common:delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Delete;
