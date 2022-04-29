const INITIAL_STATE = {
  meals: [],
  categories: [],
  mealdetails: [],
};

const foods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_FOODS':
    return {
      ...state,
      meals: action.foods.meals,
    };
  case 'GET_FOOD_CATEGORIES':
    return {
      ...state,
      categories: action.categories.meals,
    };
  case 'GET_FOODS_BY_CATEGORY':
    return {
      ...state,
      meals: action.food.meals,
    };
  case 'GET_FOOD_DETAILS':
    return {
      ...state,
      mealdetails: action.food,
    };
  default:
    return state;
  }
};

export default foods;
