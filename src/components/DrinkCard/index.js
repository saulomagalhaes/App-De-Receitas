import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard(props) {
  const { strDrinkThumb, strDrink } = props;
  return (
    <div>
      <div>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
        />
      </div>
      <div>
        <p>{ strDrink }</p>
      </div>
    </div>
  );
}

DrinkCard.propTypes = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
};

export default DrinkCard;
