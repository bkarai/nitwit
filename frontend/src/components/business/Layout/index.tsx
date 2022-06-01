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
  const boxClassnames = `card ${isMobile ? '' : 'p-3'}`

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Box height="10vh" maxHeight="75px">
        <Header/>
      </Box>
      <Box className="card-body" overflow='auto' p={isMobile ? 1 : undefined}>
        <Box className={boxClassnames} height='100%'>
          {children}
        </Box>
      </Box>
      <Box height="10vh" maxHeight="75px">
        <Footer/>
      </Box>
    </Box>
  );
}
