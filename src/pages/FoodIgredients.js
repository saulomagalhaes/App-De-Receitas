import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsIngredients from '../components/CardsIngredients';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getFoodIngredients } from '../redux/actions';

function FoodIgredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.foods.ingredients);

  useEffect(() => {
    dispatch(getFoodIngredients());
  }, [dispatch]);

  const renderCards = () => {
    const maxIndex = 12;
    return ingredients.slice(0, maxIndex).map((ingredient, index) => (
      <CardsIngredients
        key={ index }
        index={ index }
        title="foods"
        ingredient={ ingredient.strIngredient }
        URL={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
      />
    ));
  };

  return (
    <>
      <Header
        title="Explore Food Ingredients"
      />
      {ingredients && renderCards()}
      <Footer />
    </>
  );
}

export default FoodIgredients;
