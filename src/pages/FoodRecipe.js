import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { checkStorage, concatenateIngredient } from '../services/FuncRecipesDetails';
import { getDrinksByName, getFoodById } from '../redux/actions';

const NINETEEN_MAX_LENGTH = 19;

function FoodRecipe(props) {
  const { history } = props;
  const { id } = useParams();
  const { meals } = useSelector((state) => state.foods.mealdetails);
  const drinks = useSelector((state) => state.drinks.drinks);
  const [onFavoriteHeart, setOnFavoriteHeart] = useState(true);
  const [buttonPhrase, setButtonPhrase] = useState(true);
  const [buttonProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodById(id));
    dispatch(getDrinksByName(''));
    setButtonPhrase(checkStorage(id));
  }, []);

  function onSubmitButtonClick() {
    const ingredientMeasure = concatenateIngredient(meals);
    let objectRecipe = {};
    if (localStorage.getItem('inProgressRecipes')) {
      const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const previousMeals = previousProgress.meals;

      objectRecipe = {
        ...previousProgress,
        meals: {
          ...previousMeals,
          [id]: ingredientMeasure,
        },
      };
    } else {
      objectRecipe = {
        cocktails: {},
        meals: { [id]: ingredientMeasure },
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    history.push(`/foods/${id}/in-progress`);
  }

  if (meals !== undefined) {
    return (
      <>
        {
          meals
            .map((element, index) => (
              <div key={ element.idMeal }>
                <img
                  src={ element.strMealThumb }
                  alt="Imagem da Comida"
                  data-testid="recipe-photo"
                />
                <h1 data-testid="recipe-title">{ element.strMeal }</h1>
                <p data-testid="recipe-category">{element.strCategory}</p>
                <button data-testid="share-btn" type="button">
                  <img src={ shareIcon } alt="Butão de Compartilhar" />
                </button>
                <button
                  data-testid="favorite-btn"
                  type="button"
                  onClick={ () => setOnFavoriteHeart(!onFavoriteHeart) }
                >
                  <img
                    src={ onFavoriteHeart ? whiteHeartIcon : blackHeartIcon }
                    alt="Butão de Favoritar"
                  />
                </button>

                <hr />
                <ul>
                  {
                    concatenateIngredient(meals)
                      .map((ingredient, ind) => (
                        <li
                          data-testid={ `${ind}-ingredient-name-and-measure` }
                          key={ index }
                        >
                          {ingredient}
                        </li>
                      ))
                  }
                </ul>

                <hr />
                <h1>Instructions</h1>
                <p data-testid="instructions">{ element.strInstructions }</p>
                <iframe
                  width="560"
                  height="315"
                  src={ `https://www.youtube.com/embed/${element.strYoutube
                    .substring(element.strYoutube.indexOf('=') + 1)}` }
                  YsJXZwE5pdY
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="video"
                />
                <div data-testid="recomendation-card">
                  {
                    drinks
                      .splice(NINETEEN_MAX_LENGTH)
                      .map((item) => item.strDrinkThumb)
                      .map((img, indexImg) => (
                        <img
                          data-testid={ `${indexImg}-recomendation-card` }
                          key={ indexImg }
                          src={ img }
                          style={ { width: '200px', display: 'inline' } }
                          alt="Recomendação de Bebida"
                        />
                      ))
                  }
                </div>
              </div>
            ))
        }
        <button
          alt="Botão de inciar"
          type="button"
          disabled={ buttonProgress }
          onClick={ onSubmitButtonClick }
          data-testid="start-recipe-btn"
        >
          { buttonPhrase }
        </button>
      </>
    );
  }
  return null;
}

FoodRecipe.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodRecipe;
