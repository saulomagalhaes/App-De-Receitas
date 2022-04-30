import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { funcSaveFoodInProgress, getFoodById } from '../redux/actions';

function FoodProgress() {
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const { mealsProgress } = useSelector((state) => state.foods);
  // const keys = Object.keys(mealsProgress[0]);

  useEffect(() => {
    dispatch(getFoodById(id));
    const idFood = 52977;
    dispatch(funcSaveFoodInProgress(idFood));
  }, []);

  const onSubmitButtonClick = () => {
    const { history } = props;
    history.push('/foods');
  };

  function concatenateIngredient() {
    const ingredientMeasure = [];
    const MAX_NUMBER = 20;
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      ingredientMeasure
        .push(mealsProgress[0][`strIngredient${index}`]
          + mealsProgress[0][`strMeasure${index}`]);
    }
    return ingredientMeasure;
  }

  return (
    <>
      {mealsProgress.map((element) => (
        <div key={ element.idMeal }>
          <img
            src={ element.strMealThumb }
            alt="Imagem da Comida"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{element.strMeal}</h1>
          <p data-testid="recipe-category">{element.strCategory}</p>
          <button data-testid="share-btn" type="button">
            Compartilhar
          </button>
          <button data-testid="favorite-btn" type="button">
            Favoritar
          </button>
          <hr />
          <h1>Ingredients</h1>
          <p data-testid={ `${element.idMeal}-ingredient-step` } />
          {
            concatenateIngredient()
              .map((ingredient, index) => (
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {ingredient}
                </p>
              ))
          }
          <hr />

          <h1>Instructions</h1>
          <p data-testid="instructions">{element.strInstructions}</p>

          <iframe
            width="560"
            height="315"
            // src={ element.strYoutube }
            src="https://www.youtube.com/embed/VVnZd8A84z4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
          />
          <div data-testid={ `${element.idMeal}-recomendation-card` } />
        </div>
      ))}
      <button
        src=""
        alt="Botão de finalizar"
        type="button"
        disabled
        onClick={ onSubmitButtonClick }
        data-testid="finish-recipe-btn"
      >
        finish Recipe
      </button>
    </>
  );
}

FoodProgress.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodProgress;
