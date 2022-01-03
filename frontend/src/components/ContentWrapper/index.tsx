import { Wrapper } from './style';
import { ContentWrapperProps } from './interface';

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <Wrapper className="p-5 mt-4">
      {children}
    </Wrapper>
  );
}
