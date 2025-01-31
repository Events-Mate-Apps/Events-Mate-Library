import { useEffect, useState, useRef } from 'react';
import {  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Button } from '@chakra-ui/react';
import  useNotificationStore  from '../../stores/notification';

import { newApi, setBaseURL } from '../../utils/apinew';

export const DevEnvironmentSwitcher = () => {
  const { showSuccess, showError } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsOpen(true);
    }
  }, []);

  const testingRequest = async () => {
    try {
      const response = await newApi.get('/mock-api');
      showSuccess({
        title: '✅ Connection Successful',
        description: `Testing API response: ${JSON.stringify(response.data)}`,
        duration: 5000
      });
      return response.data;
    } catch (error: any) {
      showError({
        error
      })
    }
  }
  const handleTesting = () => {
    setBaseURL('http://localhost:3000/api');
    showSuccess({
      title: '🔧 Using Local API',
      description: 'API requests will be sent to localhost:3000',
    });
    testingRequest()
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