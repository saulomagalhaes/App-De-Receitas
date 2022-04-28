import React from 'react';

function Cards(props) {
  const { foods, drinks } = props;
  if (!drinks) {
    return foods.map((food, index) => {
      const maxIndex = 11;
      if (index <= maxIndex) {
        return (
          <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{food.strMeal}</h2>
            <img
              src={ food.strMealThumb }
              alt="food"
              data-testid={ `${index}-card-img` }
            />
          </div>
        );
      }
      return false;
    });
  }

  return drinks.map((drink, index) => {
    const maxIndex = 11;
    if (index <= maxIndex) {
      return (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
          <img
            src={ drink.strDrinkThumb }
            alt="food"
            data-testid={ `${index}-card-img` }
          />
        </div>
      );
    }
    return false;
  });
}

export default Cards;
