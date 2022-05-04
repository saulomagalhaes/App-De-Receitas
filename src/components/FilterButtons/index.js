import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodsByCategory, getDrinksByCategory, getFoodsByName, getDrinksByName }
from '../../redux/actions';

function FilterButtons(props) {
  const { title, checkButton } = props;

  const meals = useSelector((state) => state.foods.meals);

  const drinks = useSelector((state) => state.drinks.drinks);

  const dispatch = useDispatch();

  const getFoods = () => dispatch(getFoodsByName(''));

  const getDrinks = () => dispatch(getDrinksByName(''));

  const filterFood = (category) => dispatch(getFoodsByCategory(category));

  const filterDrink = (category) => dispatch(getDrinksByCategory(category));

  const handleClick = (category) => {
    console.log(category);
    const checkDrinks = drinks.some((element) => element.strInstructions);
    if (title === 'Foods') {
      const checkMeals = meals.some((element) => element.strInstructions);
      checkButton(true);
      return checkMeals ? filterFood(category) : getFoods();
    }
    checkButton(true);
    return checkDrinks ? filterDrink(category) : getDrinks();
  };

  const { categories } = props;
  return categories.map((cat, index) => (
    <Button
      key={ index }
      data-testid={ `${cat}-category-filter` }
      type="button"
      onClick={ () => handleClick(cat) }
      variant="secondary"
      size="sm"
      className="ml-2"
    >
      {cat}
    </Button>
  ));
}

export default FilterButtons;
