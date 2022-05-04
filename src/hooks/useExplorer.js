// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkRandom, getFoodRandom } from '../redux/actions';

function useExplorer() {
  const foods = useSelector((state) => state.foods.mealdetails);
  const drinks = useSelector((state) => state.drinks.drinkdetails);
  const [idRecipe, setId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (foods.length > 0) {
      setId(Number(foods[0].idMeal));
    }
    if (drinks.length > 0) {
      setId(Number(drinks[0].idDrink));
    }
  }, [foods, drinks]);

  const surpriseMe = (isFood) => {
    if (isFood) {
      dispatch(getFoodRandom());
    } else {
      dispatch(getDrinkRandom());
    }
  };

  return [idRecipe, surpriseMe];
}

export default useExplorer;
