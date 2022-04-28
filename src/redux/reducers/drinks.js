const INITIAL_STATE = {
  drinks: [],
};

const drinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_DRINKS':
    return action.drinks;
  default:
    return state;
  }
};

export default drinks;
