const INITIAL_STATE = {
  drinks: [],
  categories: [],
  drinkdetails: [],
  ingredients: [],
  nationalities: [],
};
const drinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ('GET_DRINKS'):
    return {
      ...state,
      drinks: action.drinks.drinks,
    };
  case 'GET_DRINK_CATEGORIES':
    return {
      ...state,
      categories: action.categories.drinks,
    };
  case 'GET_DRINK_DETAILS':
    return {
      ...state,
      drinkdetails: action.drink.drinks,
    };
  case 'GET_DRINK_INGREDIENTS':
    return {
      ...state,
      ingredients: action.ingredients.drinks,
    };
  case 'GET_DRINK_NATIONALITIES':
    return {
      ...state,
      nationalities: action.nationalities.drinks,
    };
  default:
    return state;
  }
};
export default drinks;
