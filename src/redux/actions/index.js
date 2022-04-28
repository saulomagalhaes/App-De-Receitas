import {
  fetchFoodsByIngredient,
  fetchFoodsByName,
  fetchFoodsByFLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFLetter,
  fetchFoodById,
  fetchDrinkById,
  fetchFoodsCategories,
  fetchDrinksCategories,
} from '../../services/Api';

export const USER_EMAIL = 'USER_EMAIL';

export const saveEmail = (email) => ({ type: USER_EMAIL, email });
const failedRequest = (payload) => ({ type: 'FAILED_REQUEST', payload });

const saveFoods = (foods) => ({
  type: 'GET_FOODS',
  foods,
});

const saveDrinks = (drinks) => ({
  type: 'GET_DRINKS',
  drinks,
});

const saveFoodDetails = (food) => ({
  type: 'GET_FOOD_DETAILS',
  food,
});

const saveDrinkDetails = (drink) => ({
  type: 'GET_DRINK_DETAILS',
  drink,
});

const saveFoodsCategories = (categories) => ({
  type: 'GET_FOOD_CATEGORIES',
  categories,
});
const saveDrinksCategories = (categories) => ({
  type: 'GET_DRINK_CATEGORIES',
  categories,
});

export const getFoodsByIngredient = (ingredient) => async (dispatch) => {
  try {
    const data = await fetchFoodsByIngredient(ingredient);
    dispatch(saveFoods(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getFoodsByName = (name) => async (dispatch) => {
  try {
    const data = await fetchFoodsByName(name);
    dispatch(saveFoods(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getFoodsByFLetter = (letter) => async (dispatch) => {
  try {
    const data = await fetchFoodsByFLetter(letter);
    dispatch(saveFoods(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getDrinksByIngredient = (ingredient) => async (dispatch) => {
  try {
    const data = await fetchDrinksByIngredient(ingredient);
    dispatch(saveDrinks(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getDrinksByName = (name) => async (dispatch) => {
  try {
    const data = await fetchDrinksByName(name);
    dispatch(saveDrinks(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getDrinksByFLetter = (letter) => async (dispatch) => {
  try {
    const data = await fetchDrinksByFLetter(letter);
    dispatch(saveDrinks(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getFoodById = (id) => async (dispatch) => {
  try {
    const data = await fetchFoodById(id);
    dispatch(saveFoodDetails(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getDrinkById = (id) => async (dispatch) => {
  try {
    const data = await fetchDrinkById(id);
    dispatch(saveDrinkDetails(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getFoodsCategories = () => async (dispatch) => {
  try {
    const data = await fetchFoodsCategories();
    dispatch(saveFoodsCategories(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const getDrinksCategories = () => async (dispatch) => {
  try {
    const data = await fetchDrinksCategories();
    dispatch(saveDrinksCategories(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
