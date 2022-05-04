// import React from 'react';
// import RecipeProgress from '../components/RecipesProgress';

// function DrinkProgress() {
//   return (
//     <>
//       <h1>DrinkProgress</h1>
//       <RecipeProgress />
//     </>
//   );
// }

// export default DrinkProgress;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { funcSaveDrinkInProgress, getFoodById } from '../redux/actions';
import './DrinksProgress.css';

function DrinkProgress() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { drinkProgress } = useSelector((state) => state.drinks);
  console.log(drinkProgress);

  useEffect(() => {
    dispatch(getFoodById(id));
    dispatch(funcSaveDrinkInProgress(id));
  }, []);

  const onSubmitButtonClick = () => { // joga para pag de finalizados (AINDA NAO MEXI)
    const { history } = props;
    history.push('/foods');
  };

  function concatenateIngredient() { // verifica se possuui ingrediente no length e o return para ser renderizado
    const ingredientMeasure = [];
    const MAX_NUMBER = 20;
    for (let index = 1; index < MAX_NUMBER; index += 1) {
      const ingredient = drinkProgress[0][`strIngredient${index}`];
      if (ingredient) {
        ingredientMeasure
          .push(`${drinkProgress[0][`strIngredient${index}`]
          } - ${drinkProgress[0][`strMeasure${index}`]}`);
      }
    }
    return ingredientMeasure;
  }

  const testeBtn = () => {
    // const storagePadrao = {
    //   cocktails: {
    //     'id-da-bebida': ['listadeingredientesutilizados'],
    //   },
    //   meals: {
    //     'id-da-comida': ['listadeingredientesutilizados'],
    //   },
    // };
    // localStorage.setItem('inProgressRecipes', JSON.stringify(storagePadrao));

    // const chaveJaExistente = localStorage.getItem('inProgressRecipes');
    // const { meals } = localStorage.getItem('inProgressRecipes');
    // const ingredientMeasure = concatenateIngredient();
    // const objectRecipe = {
    //   ...chaveJaExistente,
    //   meals: {
    //     ...meals,
    //     [id]: ingredientMeasure,
    //   },
    // };
    // localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    // console.log(localStorage.getItem('inProgressRecipes'));

    const chaveJaExistente = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals } = chaveJaExistente;
    // const ingredientMeasure = concatenateIngredient();
    const objectRecipe = {
      ...chaveJaExistente,
      meals: {
        ...meals,
        novaChave: 'valorDaNovaChave2',
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    console.log(localStorage.getItem('inProgressRecipes'));
    // console.log(localStorage.getItem('inProgressRecipes'));
  };

  const addAndRemoveClass = ({ target }) => {
    const teste = target;
    const idClass = '0checkIndex';
    console.log(teste);
    // document.querySelector({`.${target.id}`}).classList.add('teste');
    const idd = document.getElementById(idClass);
    console.log(idd);
  };

  return (
    <>
      <button type="button" onClick={ () => testeBtn() }>
        aassss
      </button>
      {drinkProgress && drinkProgress.map((element) => (
        <div key={ element.idDrink }>
          <img
            src={ element.strDrinkThumb }
            alt="Imagem da bebida"
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
                    className="checkedItem"
                  >
                    <input
                      type="checkbox"
                      id={ `${index}checkIndex` }
                      onClick={ (event) => addAndRemoveClass(event) }
                      // className="checkedItem"
                    />
                    {/* <label
                      htmlFor={ `${index}checkIndex` }
                      key={ index }
                      className="checkedItem"
                    > */}
                    {ingredient}
                    {/* </label> */}
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

DrinkProgress.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkProgress;
