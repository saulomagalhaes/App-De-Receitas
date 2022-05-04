import React, { useState } from 'react';
import Header from '../components/Header';
import FiltersFavorite from '../components/FiltersFavorite';
import CardsFavorite from '../components/CardsFavorite';

function FavoriteRecipes() {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : '';

  const [copied, setCopied] = useState('');
  const [data, setData] = useState(favoriteRecipes);

  const handleFood = () => {
    setData(favoriteRecipes.filter((item) => item.type === 'food'));
  };

  const handleDrink = () => {
    setData(favoriteRecipes.filter((item) => item.type === 'drink'));
  };

  const handleAll = () => {
    setData(favoriteRecipes);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied('Link copied!');
  };

  const handleFavorites = (id) => {
    const copyData = [...data];
    const newData = copyData.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <FiltersFavorite
        handleFood={ handleFood }
        handleDrink={ handleDrink }
        handleAll={ handleAll }
      />
      <CardsFavorite
        data={ data }
        handleCopy={ handleCopy }
        copied={ copied }
        handleFavorites={ handleFavorites }
      />
    </>
  );
}

export default FavoriteRecipes;
