import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getFoodsByCategory, getDrinksByCategory, getOrdinaryDrink }
from '../../redux/actions';

function FilterButtons(props) {
  const { title } = props;

  const dispatch = useDispatch();

  const filterFood = (category) => dispatch(getFoodsByCategory(category));

  const filterDrink = (category) => dispatch(getDrinksByCategory(category));

  const filterOrdinaryDrink = () => dispatch(getOrdinaryDrink());

  const handleClick = (category) => {
    if (title === 'Foods') {
      return filterFood(category);
    }
    if (title === 'Drinks' && category === 'Ordinary Drink') {
      console.log('dentro do if');
      return filterOrdinaryDrink();
    }
    return filterDrink(category);
  };

  const { categories } = props;
  console.log(categories);
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
