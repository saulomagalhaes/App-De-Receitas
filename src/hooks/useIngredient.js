import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodsByIngredient, getDrinksByIngredient } from '../redux/actions';

function useIngredient() {
  const foods = useSelector((state) => state.foods.meals);
  const drinks = useSelector((state) => state.drinks.drinks);
  const [ingredientSelected, setDone] = useState(false);
  const dispatch = useDispatch();

  const setIngredient = (title, ingredient) => {
    if (title === 'foods') dispatch(getFoodsByIngredient(ingredient));
    dispatch(getDrinksByIngredient(ingredient));
  };

  useEffect(() => {
    if (foods.length > 0) {
      setDone(true);
    }
    if (drinks.length > 0) {
      setDone(true);
    }
  }, [foods, drinks]);

  return [ingredientSelected, setIngredient];
}

export default useIngredient;
