import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getDrinkById, getFoodsByName } from '../redux/actions';

const NINETEEN_MAX_LENGTH = 19;
const MAX_NUMBER = 20;

function DrinkRecipe(props) {
  const { drinks } = useSelector((state) => state.drinks.drinkdetails);
  const foods = useSelector((state) => state.foods.meals);
  const { history } = props;
  const { id } = useParams();
  const [onFavoriteHeart, setOnFavoriteHeart] = useState(true);
  const dispatch = useDispatch();

  console.log(foods);

  useEffect(() => {
    dispatch(getDrinkById(id));
    dispatch(getFoodsByName(''));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitButtonClick = () => {
    const idProgress = Number(drinks[0].idDrink);
    return history.push(`/drinks/${idProgress}/in-progress`);
  };

  function concatenateIngredient() {
    const ingredientMeasure = [];
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      if (drinks[0][`strMeasure${index}`]) {
        ingredientMeasure
          .push(`${drinks[0][`strIngredient${index}`]
          } ${drinks[0][`strMeasure${index}`]}`);
      }
    }
    return ingredientMeasure;
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
                {/* <p data-testid="recipe-category">{element.strCategory}</p> */}
                <p data-testid="recipe-category">
                  {element.strAlcoholic === 'Alcoholic' ? element.strAlcoholic : ''}
                </p>
                {/* {element.strAlcoholic === 'Alcoholic' ? element.strAlcoholic : ''} */}
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
                {/* <div> */}
                <div data-testid="recomendation-card">
                  {
                    foods
                      .splice(NINETEEN_MAX_LENGTH)
                      .map((item) => item.strMealThumb)
                      .map((img, indexImg) => (
                        <img
                          data-testid={ `${indexImg}-recomendation-card` }
                          key={ indexImg }
                          src={ img }
                          style={ { width: '200px', display: 'inline' } }
                          alt="Recomendação de Comida"
                        />
                      ))
                  }
                </div>
              </div>
            ))
        }
        <button
          src=""
          alt="Botão de inciar"
          type="button"
          disabled
          onClick={ onSubmitButtonClick }
          data-testid="start-recipe-btn"
        >
          Start Recipe
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
