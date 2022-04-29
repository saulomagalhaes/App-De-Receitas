const API_INGR = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_N = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_FL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const API_DRINK_INGR = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const API_DRINK_N = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_DRINK_FL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const API_FOOD_CATEGEORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const API_DRINK_CATEGEORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const API_FOOD_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const API_DRINK_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const API_FOOD_FILTER_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const API_DRINK_FILTER_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const API_ORDINARY_DRINK = 'https://www.thecocktaildb.com/api/'
+ 'json/v1/1/filter.php?c=Ordinary_Drink';

export const fetchFoodById = async (id) => {
  const URL_FOOD_DETAILS = `${API_FOOD_DETAILS}${id}`;
  const response = await fetch(URL_FOOD_DETAILS);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDrinkById = async (id) => {
  const URL_DRINK_DETAILS = `${API_DRINK_DETAILS}${id}`;
  const response = await fetch(URL_DRINK_DETAILS);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFoodsByIngredient = async (ingredient) => {
  const API_INGREDIENT = `${API_INGR}${ingredient}`;
  const response = await fetch(API_INGREDIENT);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
export const fetchDrinksByCategory = async (category) => {
  const URL_BY_CATEGORY = `${API_DRINK_FILTER_BY_CATEGORY}${category}`;
  const response = await fetch(URL_BY_CATEGORY);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchOrdinaryDrinkCategory = async () => {
  const response = await fetch(API_ORDINARY_DRINK);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFoodsByCategory = async (category) => {
  const URL_BY_CATEGORY = `${API_FOOD_FILTER_BY_CATEGORY}${category}`;
  const response = await fetch(URL_BY_CATEGORY);
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

export const fetchDrinksByIngredient = async (ingredient) => {
  const API_INGREDIENT = `${API_DRINK_INGR}${ingredient}`;
  const response = await fetch(API_INGREDIENT);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDrinksByName = async (name) => {
  const API_NAME = `${API_DRINK_N}${name}`;
  const response = await fetch(API_NAME);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDrinksByFLetter = async (letter) => {
  const API_LETTER = `${API_DRINK_FL}${letter}`;
  const response = await fetch(API_LETTER);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFoodsCategories = async () => {
  const response = await fetch(API_FOOD_CATEGEORIES);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDrinksCategories = async () => {
  const response = await fetch(API_DRINK_CATEGEORIES);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
