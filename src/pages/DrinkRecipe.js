import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { checkLocalStorage, concatenateIngredient } from '../services/FuncRecipesDetails';
import { getDrinkById, getFoodsByName } from '../redux/actions';

const NINETEEN_MAX_LENGTH = 19;

function DrinkRecipe(props) {
  const { history } = props;
  const { id } = useParams();
  const drinks = useSelector((state) => state.drinks.drinkdetails);
  const foods = useSelector((state) => state.foods.meals);
  const [onFavoriteHeart, setOnFavoriteHeart] = useState(true);
  const [buttonPhrase, setButtonPhrase] = useState(true);
  const [buttonProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodsByName(''));
    dispatch(getDrinkById(id));
    setButtonPhrase(checkLocalStorage(id));
  }, []);

  function onSubmitButtonClick() {
    const ingredientMeasure = concatenateIngredient(drinks);
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let objectRecipe = {};
    if (previousProgress) {
      const previousMeals = previousProgress.cocktails;

      objectRecipe = {
        ...previousProgress,
        cocktails: {
          ...previousMeals,
          [id]: ingredientMeasure,
        },
      };
    } else {
      objectRecipe = {
        cocktails: { [id]: ingredientMeasure },
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    history.push(`/drinks/${id}/in-progress`);
  }

  if (drinks !== undefined) {
    return (
      <>
        {
          drinks
            .map((element) => (
              <div key={ element.idDrink }>
                <img
                  src={ element.strDrinkThumb }
                  alt="Imagem da Bebida"
                  data-testid="recipe-photo"
                />
                <h1 data-testid="recipe-title">{ element.strDrink }</h1>
                <p data-testid="recipe-category">
                  {element.strAlcoholic === 'Alcoholic' ? element.strAlcoholic : ''}
                </p>
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
                    concatenateIngredient(drinks)
                      .map((ingredient, index) => (
                        <li
                          data-testid={ `${index}-ingredient-name-and-measure` }
                          key={ index }
                        >
                          {ingredient}
                        </li>
                      ))
                  }
                </ul>
                <h1>Instructions</h1>
                <p data-testid="instructions">{element.strInstructions}</p>
                <div
                  data-testid="recomendation-card"
                  id="carouselExampleSlidesOnly"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    {
                      foods
                        .splice(NINETEEN_MAX_LENGTH)
                        .map((img, indexImg) => (
                          <div
                            key={ indexImg }
                            className={ indexImg === 0
                              ? 'carousel-item active'
                              : 'carousel-item' }
                          >
                            <img
                              data-testid={ `${indexImg}-recomendation-card` }
                              className="d-block w-20"
                              src={ img.strMealThumb }
                              style={ { width: '200px', display: 'inline' } }
                              alt="Recomendação de Comida"
                            />
                            <span>{img.strCategory}</span>
                            <p data-testid={ `${indexImg}-recomendation-title` }>
                              {img.strMeal}
                            </p>
                          </div>
                        ))
                    }
                  </div>
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
          style={ { bottom: '0px' } }
        >
          { buttonPhrase }
        </button>
      </>
    );
  }

  return null;
}

DrinkRecipe.propTypes = {
  history: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default DrinkRecipe;
