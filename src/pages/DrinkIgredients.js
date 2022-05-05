import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsIngredients from '../components/CardsIngredients';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDrinkIngredients } from '../redux/actions';

function DrinkIgredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.drinks.ingredients);

  useEffect(() => {
    dispatch(getDrinkIngredients());
  }, [dispatch]);

  useEffect(() => {
  }, [ingredients]);

  const renderCards = () => {
    const maxIndex = 12;
    return ingredients.slice(0, maxIndex).map((ingredient, index) => (
      <CardsIngredients
        key={ index }
        title="drinks"
        index={ index }
        ingredient={ ingredient.strIngredient1 }
        URL={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
      />
    ));
  };

  return (
    <>
      <Header
        title="Explore Ingredients"
      />
      {ingredients && renderCards()}
      <Footer />
    </>
  );
}

export default DrinkIgredients;
