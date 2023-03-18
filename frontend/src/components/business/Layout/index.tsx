import { Box } from 'components';
import { Header } from './Header';
import { Footer } from './Footer';
import { useIsMobile } from 'hooks';

interface LayoutProps {
  children: React.ReactNode;
};

export function Layout({
  children
}: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Box height="8vh" maxHeight="64px">
        <Header/>
      </Box>
      <Box className={isMobile ? undefined : "card-body"} overflow='hidden' height="100%">
        <Box className={isMobile ? '' : 'p-2'} height='100%'>
          {children}
        </Box>
      </Box>
      <Box height="8vh" maxHeight="64px">
        <Footer/>
      </Box>
    </Box>
  );
}
