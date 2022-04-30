import React, { useState } from 'react';
import Header from '../components/Header';
import FiltersDone from '../components/FiltersDone';
import CardsDone from '../components/CardsDone';

function RecipesDone() {
  // const { history } = props;
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : '';

  // const copyDoneRecipes = [...doneRecipes];
  const [copied, setCopied] = useState('');
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

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied('Link copied!');
  };

  // const handleDetails = (url) => {
  //   history.push(url);
  // };
  return (
    <>
      <Header title="Done Recipes" />
      <FiltersDone
        handleFood={ handleFood }
        handleDrink={ handleDrink }
        handleAll={ handleAll }
      />
      <CardsDone
        handleCopy={ handleCopy }
        data={ data }
        copied={ copied }
        // handleDetails={ handleDetails }
      />
    </>
  );
}

export default RecipesDone;
