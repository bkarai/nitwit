import Box from '@mui/material/Box';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
};

export function Layout({
  children
}: LayoutProps) {
  return (
    <Box height='100%'>
      <Header/>
        <Box height='100%' width='100%' className="card-body">
          <Box className="card p-3" height='100%'>
            {children}
          </Box>
        </Box>
      <Footer/>
    </Box>
  );
}
