import React, { useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import FormBusca from '../FormBusca';

function Header(props) {
  const { title } = props;
  const [toogleSearch, setToggleSearch] = useState(false);
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
    <>
      <header className="header">
        <Link to="/profile">
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {contain ? (
          ''
        ) : (
          <button type="button" onClick={ () => setToggleSearch(!toogleSearch) }>
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}
      </header>
      { toogleSearch ? <FormBusca
        title={ title }
      /> : '' }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
