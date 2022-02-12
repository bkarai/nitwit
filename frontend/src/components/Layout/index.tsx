import styled from '@emotion/styled';
import Footer from './Footer';
import Header from './Header';

const LayoutWrapper = styled.div({ height: '100%' });
const ContentWrapper = styled.div({ height: '100%', width: '100%' });

interface LayoutProps {
  children: React.ReactNode;
};

export default function Layout({
  children
}: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header/>
        <ContentWrapper className="card-body">
          <div className="card p-3" style={{ height: '100%' }}>
            {children}
          </div>
        </ContentWrapper>
      <Footer/>
    </LayoutWrapper>
  );
}
