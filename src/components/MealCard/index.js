import React from 'react';
import PropTypes from 'prop-types';

function MealCard(props) {
  const { strMealThumb, strMeal } = props;
  return (
    <div>
      <div>
        <img
          src={ strMealThumb }
          alt={ strMeal }
        />
      </div>
      <div>
        <p>{ strMeal }</p>
      </div>
    </div>
  );
}

MealCard.propTypes = {
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};

export default MealCard;
