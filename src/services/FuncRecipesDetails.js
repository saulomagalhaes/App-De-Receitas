// Necessita id
const TWENTY_MAX_LENGTH = 20;

export function checkStorage(id) {
  const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (previousProgress) {
    console.log('Teste 03');
    const checkedId = Object.keys(previousProgress.meals)
      .find((element) => element === id);
    return checkedId
      ? 'Continue Recipe'
      : 'Start Recipe';
  }
  return 'Start Recipe';
}

export function concatenateIngredient(meals) {
  const ingredientMeasure = [];
  for (let index = 1; index < TWENTY_MAX_LENGTH; index += 1) {
    if (meals[0][`strIngredient${index}`]) {
      ingredientMeasure
        .push(`${meals[0][`strIngredient${index}`]
        } ${meals[0][`strMeasure${index}`]}`);
    }
  }
  return ingredientMeasure;
}
