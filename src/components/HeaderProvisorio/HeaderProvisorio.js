import React from 'react';

import './HeaderProvisorio.css';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

function Header() {
  return (
    <div className="header">
      <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">TitleGeneric</h1>
      <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
    </div>
  );
}
export default Header;
