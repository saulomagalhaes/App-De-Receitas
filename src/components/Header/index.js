import React from 'react';

import './styles.css';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

function Header(props) {
  const { title } = props;
  const arrayTitles = [
    'Explore',
    'Explore Foods',
    'Explore Drinks',
    'Explore Ingredients',
    'Profile',
    'Done Recipes',
    'Favorite Recipes',
  ];
  const contain = arrayTitles.some((element) => element === title);
  return (
    <header className="header">
      <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">{title}</h1>
      {contain ? (
        ''
      ) : (
        <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
