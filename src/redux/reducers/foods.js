const INITIAL_STATE = {
  meals: [],
};

const foods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_FOODS':
    return action.foods;
  default:
    return state;
  }
};

export default foods;
