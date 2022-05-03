import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDrinksByName, getFoodById } from '../redux/actions';

function FoodRecipe(props) {
  const { meals } = useSelector((state) => state.foods.mealdetails);
  const { history } = props;
  const { id } = useParams();
  const NINETEEN_MAX_LENGTH = 19;
  const drinks = useSelector((state) => state.drinks.drinks);
  const [buttonProgress] = useState(false);
  const [StartOnProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodById(id));
    dispatch(getDrinksByName(''));
  }, []);

  console.log('Recomendacoes', drinks);

  // const verificProgress = () => {
  //  setStartOnProgress
  // };

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

  const onSubmitButtonClick = () => {
    const ingredientMeasure = concatenateIngredient();
    const objectRecipe = {
      meals: { [id]: ingredientMeasure },
      cocktails: { [id]: '' },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    console.log(localStorage.getItem('inProgressRecipes'));
    return history.push(`/foods/${id}/in-progress`);
  };

  if (meals !== undefined) {
    return (
      <>
        {
          meals
            .map((element, index) => (
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
                      .map((ingredient, ind) => (
                        <li
                          data-testid={ `${ind}-ingredient-name-and-measure` }
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
                <div>
                  {
                    drinks
                      .splice(NINETEEN_MAX_LENGTH)
                      .map((item) => item.strDrinkThumb)
                      .map((img, indexImg) => (
                        <img
                          data-testid={ `${indexImg}-recomendation-card` }
                          key={ indexImg }
                          src={ img }
                          style={ { width: '200px', display: 'inline' } }
                          alt="Recomendação de Bebida"
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
          disabled={ buttonProgress }
          onClick={ onSubmitButtonClick }
          data-testid="start-recipe-btn"
        >
          { StartOnProgress ? 'Start Recipe' : 'Continue Recipe' }
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
