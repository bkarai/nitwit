import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const StyledFooter = styled.footer({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Footer = React.memo(function() {
  return (
    <StyledFooter className="bg-secondary text-center p-4">
      © {new Date().getFullYear()} Copyright &nbsp;
      <Link className="text-reset fw-bold" to="/">play-nitwit.com</Link>
    </StyledFooter>
  );
});
