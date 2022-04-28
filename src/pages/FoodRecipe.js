import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFoodById } from '../redux/actions';

function FoodRecipe() {
  const { id } = useParams();
  const { dispatch } = useDispatch();

  useEffect(() => {
    dispatch(getFoodById(id));
  }, []);

  const recipes = useSelector((state) => state.foods.mealdetails);
  return (
    <>
      {
        recipes
          .map((element) => (
            <div key={ element.id }>
              <img src="" alt="Imagem da Comida" data-testid="recipe-photo" />
              <h1 data-testid="recipe-title">Foods Recipes</h1>
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <p data-testid="recipe-category" />
              <p data-testid={ `${index}-ingredient-name-and-measure` } />
              <p data-testid="instructions" />
              <inframe data-testid="video" />
              <div data-testid={ `${index}-recomendation-card` } />
              <button
                src=""
                alt="Botão de inciar"
                type="button"
                data-testid="start-recipe-btn"
              >
                Iniciar
              </button>
            </div>
          ))
      }
    </>
  );
}

export default FoodRecipe;
