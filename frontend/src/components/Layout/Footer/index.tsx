import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const StyledFooter = styled.footer({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

export const FooterContainer = styled.div({
  margin: 'auto',
  textAlign: 'center',
});

export default React.memo(function() {
  return (
    <StyledFooter className="bg-secondary">
      <div className="text-center p-4">
        © {new Date().getFullYear()} Copyright &nbsp;
        <Link className="text-reset fw-bold" to="/">outwit.com</Link>
      </div>
    </StyledFooter>
  );
});
