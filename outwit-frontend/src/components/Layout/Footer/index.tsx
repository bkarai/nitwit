import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledFooter,
} from './styles';

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
