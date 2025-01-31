import { useEffect, useState, useRef } from 'react';
import {  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Button } from '@chakra-ui/react';
import  useNotificationStore  from '../../stores/notification';

import { newApi, setBaseURL } from '../../utils/apinew';

export const DevEnvironmentSwitcher = () => {
  const { showSuccess } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsOpen(true);
    }
  }, []);
  const fetchData = async () => {
    try {
      const response = await newApi.get('/mock-api');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleTesting = () => {
    setBaseURL('http://localhost:3000/api');
    showSuccess({
      title: '🔧 Using Local API',
      description: 'API requests will be sent to localhost:3000',
    });
    fetchData()
    setIsOpen(false);
  };
  
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Development Mode Active
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Production
            </Button>
            <Button colorScheme="blue" onClick={handleTesting} ml={3}>
                Local Testing
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}