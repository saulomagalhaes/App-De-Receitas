import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getDrinksByName, getFoodById } from '../redux/actions';

const NINETEEN_MAX_LENGTH = 19;
const MAX_NUMBER = 20;

function FoodRecipe(props) {
  const meals = useSelector((state) => state.foods.mealdetails);
  const { history } = props;
  const { id } = useParams();
  const drinks = useSelector((state) => state.drinks.drinks);
  const [onFavoriteHeart, setOnFavoriteHeart] = useState(true);
  const [buttonProgress] = useState(false);
  const [StartOnProgress, setStartOnProgress] = useState('');
  const dispatch = useDispatch();

  function checkStorage() {
    if (localStorage.getItem('inProgressRecipes')) {
      const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const previousMeals = previousProgress.meals;
      const checkedId = Object.keys(previousMeals)
        .find((element) => element === id);
      return checkedId
        ? setStartOnProgress('Continue Recipe')
        : setStartOnProgress('Start Recipe');
    }
    return setStartOnProgress('Start Recipe');
  }

  useEffect(() => {
    dispatch(getDrinksByName(''));
    dispatch(getFoodById(id));
    checkStorage();
  }, []);

  function concatenateIngredient() {
    const ingredientMeasure = [];
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      if (meals[0][`strIngredient${index}`]) {
        ingredientMeasure
          .push(`${meals[0][`strIngredient${index}`]
          } ${meals[0][`strMeasure${index}`]}`);
      }
    }
    return ingredientMeasure;
  }

  function onSubmitButtonClick() {
    const ingredientMeasure = concatenateIngredient();
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
            .map((element) => (
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
                    concatenateIngredient()
                      .map((ingredient, ind) => (
                        <li
                          data-testid={ `${ind}-ingredient-name-and-measure` }
                          key={ ind }
                        >
                          {ingredient}
                        </li>
                      ))
                  }
                </ul>

                <hr />
                <h1>Instructions</h1>
                <p data-testid="instructions">{ element.strInstructions }</p>

                <h1>Vídeo</h1>
                <iframe
                  width="560"
                  height="315"
                  src={ `https://www.youtube.com/embed/${element.strYoutube
                    .substring(element.strYoutube.indexOf('=') + 1)}` }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="video"
                />
                <div data-testid="recomendation-card">
                  <h1>Recommended</h1>
                  {
                    drinks
                      .splice(NINETEEN_MAX_LENGTH)
                      .map((item) => item.strDrinkThumb)
                      .map((img, indexImg) => (
                        <div key={ indexImg }>
                          <img
                            data-testid={ `${indexImg}-recomendation-card` }
                            src={ img }
                            style={ { width: '200px', display: 'inline' } }
                            alt="Recomendação de Bebida"
                          />
                          <h1
                            data-testid={ `${indexImg}-recomendation-title` }
                          >
                            Titulo
                          </h1>
                        </div>
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
          { StartOnProgress }
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
