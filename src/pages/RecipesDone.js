import React from 'react';
import Header from '../components/Header';
import FiltersDone from '../components/FiltersDone';
import CardsDone from '../components/CardsDone';

function RecipesDone() {
  return (
    <>
      <Header title="Done Recipes" />
      <FiltersDone />
      <CardsDone />
    </>
  );
}

export default RecipesDone;
