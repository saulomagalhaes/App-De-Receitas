import React, { useState } from 'react';
import Header from '../components/Header';
import FiltersDone from '../components/FiltersDone';
import CardsDone from '../components/CardsDone';

function RecipesDone() {
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : '';

  const [data, setData] = useState(doneRecipes);

  const handleFood = () => {
    setData(doneRecipes.filter((item) => item.type === 'food'));
  };

  const handleDrink = () => {
    setData(doneRecipes.filter((item) => item.type === 'drink'));
  };

  const handleAll = () => {
    setData(doneRecipes);
  };

  return (
    <>
      <Header title="Done Recipes" />
      <FiltersDone
        handleFood={ handleFood }
        handleDrink={ handleDrink }
        handleAll={ handleAll }
      />

      {data === ''
        ? <h1>Não há receitas finalizadas</h1>
        : data.map((recipe, index) => (
          <CardsDone key={ recipe.id } recipe={ recipe } index={ index } />
        ))}
    </>
  );
}

export default RecipesDone;
