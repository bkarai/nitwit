import { Box } from 'components';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
};

export function Layout({
  children
}: LayoutProps) {
  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Box height="10vh" maxHeight="75px">
        <Header/>
      </Box>
      <Box className="card-body" overflow='auto'>
        <Box className="card p-3" height='100%'>
          {children}
        </Box>
      </Box>
      <Box height="10vh" maxHeight="75px">
        <Footer/>
      </Box>
    </Box>
  );
}
