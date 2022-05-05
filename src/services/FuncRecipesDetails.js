const TWENTY_MAX_LENGTH = 20;

export function checkLocalStorage(id) {
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

export const handleCopy = (id, setCopied) => {
  navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
  setCopied('Link copied!');
};

export function saveOrDeleteFavorites(meals, id, buttonFavorite) {
  const donesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { strArea, strCategory, strMealThumb, strMeal } = meals;
  let arrayFavoriteRecipe = [];
  if (buttonFavorite) {
    if (donesRecipes) { arrayFavoriteRecipe = donesRecipes; }
    arrayFavoriteRecipe.push({
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
    return false;
  }
  const positionDelete = donesRecipes
    .find((element, index) => (element.id === id ? index : null));
  arrayFavoriteRecipe
    .push(donesRecipes.slice(positionDelete));
  return true;
}
