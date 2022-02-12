import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div({
  textAlign: 'center',
});

interface ContentWrapperProps {
  children: React.ReactNode;
};

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <Wrapper className="p-5 mt-4">
      {children}
    </Wrapper>
  );
}
