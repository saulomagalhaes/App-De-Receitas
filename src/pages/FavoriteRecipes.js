import React, { useState } from 'react';
import Header from '../components/Header';
import FiltersFavorite from '../components/FiltersFavorite';
import CardsFavorite from '../components/CardsFavorite';
import '../styles/Favorite.scss';

function FavoriteRecipes() {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

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
      {data.length === 0
        ? <h1>Não há receitas favoritas</h1>
        : data.map((recipe, index) => (
          <CardsFavorite
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            handleFavorites={ handleFavorites }
          />
        ))}
    </>
  );
}

export default FavoriteRecipes;
