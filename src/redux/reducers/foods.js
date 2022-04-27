const INITIAL_STATE = {
  meals: [
    {
      strMeal: 'Brown Stew Chicken',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
      idMeal: '52940',
    },
    {
      strMeal: 'Chicken & mushroom Hotpot',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
      idMeal: '52846',
    },
  ],
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
