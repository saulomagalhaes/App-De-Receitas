import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDrinkById } from '../redux/actions';

function DrinkRecipe(props) {
  const { drinks } = useSelector((state) => state.drinks.drinkdetails);
  const { history } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrinkById(id));
  }, []);

  console.log(dispatch(getDrinkById(id)));

  const onSubmitButtonClick = () => {
    const idProgress = Number(drinks[0].idDrink);
    return history.push(`/drinks/${idProgress}/in-progress`);
  };

  function concatenateIngredient() {
    const ingredientMeasure = [];
    const MAX_NUMBER = 16;
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      ingredientMeasure
        .push(drinks[0][`strIngredient${index}`] + drinks[0][`strMeasure${index}`]);
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
                <h1>Instructions</h1>
                <p data-testid="instructions">{ element.strInstructions }</p>
                <div data-testid={ `${element.idDrink}-recomendation-card` } />
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
