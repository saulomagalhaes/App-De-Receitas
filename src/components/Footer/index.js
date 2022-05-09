import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="imgDrink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } alt="imgDrink" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } alt="imgDrink" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
