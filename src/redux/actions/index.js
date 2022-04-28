import {
  fetchFoodsByIngredient,
  fetchFoodsByName,
  fetchFoodsByFLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFLetter,
} from '../../services/Api';

export const USER_EMAIL = 'USER_EMAIL';
export const GET_EMPTY_SIZE = 'GET_EMPTY_SIZE';

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

export const getEmptySize = (boolean) => ({
  type: GET_EMPTY_SIZE,
  boolean,
});
