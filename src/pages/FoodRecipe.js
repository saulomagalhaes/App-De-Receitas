import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFoodById } from '../redux/actions';

function FoodRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.foods.mealdetails);

  useEffect(() => {
    dispatch(getFoodById(id));
  }, []);

  const onSubmitButtonClick = () => {
    const { history } = props;
    history.push('/foods');
  };

  console.log(meals);
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
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <p data-testid="recipe-category">{element.strCategory}</p>
              <p data-testid={ `${element.idMeal}-ingredient-name-and-measure` } />
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
              >
                { console.log(element.strYoutube) }
              </iframe>
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
  history: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default FoodRecipe;
