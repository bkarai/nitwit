import Footer from './Footer';
import Header from './Header';

import { LayoutWrapper, ContentWrapper } from './styles';
import {
  LayoutProps,
} from './interface';

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
