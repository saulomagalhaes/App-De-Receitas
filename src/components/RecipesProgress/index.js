import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { funcSaveFoodInProgress, getFoodById } from '../../redux/actions';

function RecipeProgress() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { mealsProgress } = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(getFoodById(id));
    dispatch(funcSaveFoodInProgress(id));
  }, []);

  const onSubmitButtonClick = () => { // joga para pag de finalizados (AINDA NAO MEXI)
    const { history } = props;
    history.push('/foods');
  };

  function concatenateIngredient() { // verifica se possui ingrediente no length e o return para ser renderizado
    const ingredientMeasure = [];
    const MAX_NUMBER = 20;
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      const ingredient = mealsProgress[0][`strIngredient${index}`];
      if (ingredient) {
        ingredientMeasure
          .push(`${mealsProgress[0][`strIngredient${index}`]
          } - ${mealsProgress[0][`strMeasure${index}`]}`);
      }
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
          <div>
            {
              concatenateIngredient()
                .map((ingredient, index) => (
                  <p
                    data-testid={ `${index}-ingredient-step` }
                    key={ index }
                    id={ index }
                  >
                    {ingredient}
                  </p>
                ))
            }
          </div>
          <hr />

          <h1>Instructions</h1>
          <p data-testid="instructions">{element.strInstructions}</p>

          <iframe
            width="560"
            height="315"
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

RecipeProgress.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeProgress;
