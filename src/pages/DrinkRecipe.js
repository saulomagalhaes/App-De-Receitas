import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDrinkById } from '../redux/actions';

function DrinkRecipe() {
  const { id } = useParams();
  const { dispatch } = useDispatch();

  useEffect(() => {
    dispatch(getDrinkById(id));
  }, []);

  const recipes = useSelector((state) => state.drinks.drinkdetails);

  const onSubmitButtonClick = () => {
    const { history } = props;
    history.push('/foods');
  };
  return (
    <>
      {
        recipes
          .map((element) => (
            <div key={ element.idDrink }>
              <img
                src={ element.strDrinkThumb }
                alt="Imagem da Comida"
                data-testid="recipe-photo"
              />
              <h1 data-testid="recipe-title">{ element.strDrink }</h1>
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <p data-testid="recipe-category">{element.strCategory}</p>
              <p data-testid={ `${index}-ingredient-name-and-measure` } />
              <p data-testid="instructions">{ element.strInstructions }</p>
              <inframe data-testid="video" src={ element.strVideo } />
              <div data-testid={ `${index}-recomendation-card` } />
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

DrinkRecipe.propTypes = {
  history: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default DrinkRecipe;
