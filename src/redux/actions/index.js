import { fetchFoodsByIngredient,
  fetchFoodsByName, fetchFoodsByFLetter } from '../../services/Api';

export const USER_EMAIL = 'USER_EMAIL';

export const saveEmail = (email) => ({ type: USER_EMAIL, email });
const failedRequest = (payload) => ({ type: 'FAILED_REQUEST', payload });
// const saveFoodsByIngredient = (foods) => ({
//   type: 'GET_FOODS',
//   foods,
// });

const saveFoods = (foods) => ({
  type: 'GET_FOODS',
  foods,
});

// const saveFoodsByName = (foods) => ({
//   type: 'GET_FOODS_NAME',
//   foods,
// });
// const saveFoodsByFLetter = (foods) => ({
//   type: 'GET_FOODS_FIRST_LETTER',
//   foods,
// });

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
