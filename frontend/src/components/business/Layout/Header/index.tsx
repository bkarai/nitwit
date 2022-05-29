import React from 'react';
import { Link } from 'react-router-dom';
import { NewGameButton } from 'components';

export const Header = React.memo(function() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ps-3 pe-3">
      <Link className="navbar-brand" to="/">Outwit</Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav mr-auto">
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <NewGameButton />
          </li>
        </ul>
      </div>
    </nav>
  );
});
