import React from 'react';

import PropTypes from 'prop-types';

import './style.css';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer(props) {
  const { history } = props;
  console.log(history);
  return (
    <footer data-testid="footer" className="footer">
      <a href="http://localhost:3000/drinks">
        <img src={ drinkIcon } alt="imgDrink" data-testid="drinks-bottom-btn" />
      </a>
      <a href="http://localhost:3000/explore">
        <img src={ exploreIcon } alt="imgDrink" data-testid="explore-bottom-btn" />
      </a>
      <a href="http://localhost:3000/foods">
        <img src={ mealIcon } alt="imgDrink" data-testid="food-bottom-btn" />
      </a>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Footer;