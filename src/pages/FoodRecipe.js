import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFoodById } from '../redux/actions';

function FoodRecipe(props) {
  const { meals } = useSelector((state) => state.foods.mealdetails);
  const { history } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodById(id));
  }, [dispatch, id]);

  console.log(meals);

  const onSubmitButtonClick = () => {
    const idProgress = Number(meals[0].idMeal);
    return history.push(`/foods/${idProgress}/in-progress`);
  };

  function concatenateIngredient() {
    const ingredientMeasure = [];
    const MAX_NUMBER = 20;
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      if (meals[0][`strIngredient${index}`]) {
        ingredientMeasure
          .push(`${meals[0][`strIngredient${index}`]
          } ${meals[0][`strMeasure${index}`]}`);
      }
    }
    return ingredientMeasure;
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
                <button data-testid="share-btn" type="button">Compartilhar</button>
                <button data-testid="favorite-btn" type="button">Favoritar</button>

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
                <div data-testid={ `${element.idMeal}-recomendation-card` } />
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

FoodRecipe.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodRecipe;
