const API_INGR = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_N = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_FL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const fetchFoodsByIngredient = async (ingredient) => {
  const API_INGREDIENT = `${API_INGR}${ingredient}`;
  const response = await fetch(API_INGREDIENT);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFoodsByName = async (name) => {
  const API_NAME = `${API_N}${name}`;
  const response = await fetch(API_NAME);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFoodsByFLetter = async (letter) => {
  const API_LETTER = `${API_FL}${letter}`;
  const response = await fetch(API_LETTER);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
