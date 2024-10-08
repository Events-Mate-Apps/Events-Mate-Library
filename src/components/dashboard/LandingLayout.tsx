import { Box } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: FC<PropsWithChildren<LandingLayoutProps>> = ({ children }) => {
  return (
    <Box minH="100vh" w="full" pt="64px">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default LandingLayout;
