const TWENTY_MAX_LENGTH = 20;

export function checkStorage(id) {
  const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (previousProgress) {
    const checkedId = Object.keys(previousProgress.meals)
      .find((element) => element === id);
    return checkedId
      ? 'Continue Recipe'
      : 'Start Recipe';
  }
  return 'Start Recipe';
}

export function concatenateIngredient(recipe) {
  const ingredientMeasure = [];
  for (let index = 1; index < TWENTY_MAX_LENGTH; index += 1) {
    if (recipe[0][`strIngredient${index}`]) {
      ingredientMeasure
        .push(`${recipe[0][`strIngredient${index}`]
        } ${recipe[0][`strMeasure${index}`]}`);
    }
  }
  return ingredientMeasure;
}
