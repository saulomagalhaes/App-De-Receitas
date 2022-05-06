import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodsByIngredient, getDrinksByIngredient } from '../redux/actions';

function useIngredient() {
  const foods = useSelector((state) => state.foods.meals);
  const drinks = useSelector((state) => state.drinks.drinks);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();

  const setIngredient = (title, ingredient) => {
    if (title === 'foods') dispatch(getFoodsByIngredient(ingredient));
    dispatch(getDrinksByIngredient(ingredient));
    // history.push(`/${title}`);
  };

  useEffect(() => {
    if (foods.length > 0) {
      setDone(true);
    }
    if (drinks.length > 0) {
      setDone(true);
    }
  }, [foods, drinks]);

  return [done, setIngredient];
}

export default useIngredient;
