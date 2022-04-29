import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFoodById } from '../redux/actions';

function FoodRecipe(props) {
  const { history } = props;
  const { meals } = useSelector((state) => state.foods.mealdetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  const onSubmitButtonClick = () => {
    const idProgress = Number(meals[0].idMeal);
    return history.push(`/foods/${idProgress}/in-progress`);
  };

  useEffect(() => {
    dispatch(getFoodById(id));
  }, []);

  console.log(meals);
  console.log(Object.values(meals[0]));
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
                <li data-testid={ `${element.idMeal}-ingredient-name-and-measure` }>
                  { element.strIngredient2 }
                </li>
              </ul>

              <hr />
              <h1>Instructions</h1>
              <p data-testid="instructions">{ element.strInstructions }</p>

              <iframe
                width="560"
                height="315"
                src={ element.strYoutube }
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

FoodRecipe.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodRecipe;
