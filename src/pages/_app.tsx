import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ToastContainer theme='colored' />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
