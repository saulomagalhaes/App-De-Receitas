const TWENTY_MAX_LENGTH = 20;

export function checkedLocalStorage(id, type) {
  const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (previousProgress) {
    const checkedId = (
      (type === 'food')
        ? Object.keys(previousProgress.meals)
        : Object.keys(previousProgress.cocktails))
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

export function saveOrDeleteFavorites(buttonFavorite, id, infos) {
  const donesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let arrayFavoriteRecipe = [];
  if (buttonFavorite) {
    if (donesRecipes) { arrayFavoriteRecipe = donesRecipes; }
    arrayFavoriteRecipe.push(infos);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
    return false;
  }
  localStorage
    .setItem('favoriteRecipes', JSON.stringify(donesRecipes
      .filter((element) => (element.id !== id))));
  return true;
}

export function checkedFavorites(id) {
  const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoritesRecipes) {
    const recipeFavoriteOn = favoritesRecipes
      .some((element) => (element.id === id));
    return !recipeFavoriteOn;
  }
  return true;
}

export function checkedDonesRecipes(id) {
  const donesRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (donesRecipes) {
    return donesRecipes
      .some((element) => (element.id === id));
  }
  return false;
}

export function doneRecipes(finishedRecipe) {
  const recipesInLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const newArrayRecipes = (recipesInLocalStorage)
    ? [...recipesInLocalStorage, finishedRecipe]
    : [finishedRecipe];

  localStorage.setItem('doneRecipes', JSON.stringify(newArrayRecipes));
}
