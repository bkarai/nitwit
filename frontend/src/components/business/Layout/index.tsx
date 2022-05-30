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
      <Box height='10%'>
        <Header/>
      </Box>
        <Box height='80%' width='100%' className="card-body">
          <Box className="card p-3" height='100%'>
            {children}
          </Box>
        </Box>
      <Box height='10%'>
        <Footer/>
      </Box>
    </Box>
  );
}
