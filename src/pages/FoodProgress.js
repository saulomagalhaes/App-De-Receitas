import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { funcSaveFoodInProgress, getFoodById } from '../redux/actions';
import './DrinksProgress.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { saveOrDeleteFavorites,
  checkedFavorites } from '../services/FuncRecipesDetails';

function FoodProgress({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { mealsProgress } = useSelector((state) => state.foods);
  const [activeButton, setActiveButton] = useState(true);
  const [buttonFavorite, setOnFavoriteHeart] = useState(true);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    dispatch(getFoodById(id));
    dispatch(funcSaveFoodInProgress(id));
    setOnFavoriteHeart(checkedFavorites(id));
  }, []);

  const onSubmitButtonClick = () => { // joga para pag de finalizados (AINDA NAO MEXI)
    history.push('/done-recipes');
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

  const toggleButton = () => {
    const allCheckers = document.querySelectorAll('input');
    const ValuesChekers = Object.values(allCheckers); // pega o value para testar se todos os ingredientes foram usados
    if (ValuesChekers
      .every((checkBoxCurrent) => checkBoxCurrent.checked)) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  };

  const addAndRemoveClass = ({ target }) => {
    const ingredient = target.parentNode;

    if (ingredient.classList.contains('checkedItem')) {
      ingredient.classList.remove('checkedItem');
    } else {
      ingredient.classList.add('checkedItem');
    }

    toggleButton();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied('Link copied!');
  };

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
          <button data-testid="share-btn" type="button" onClick={ handleCopy }>
            <img src={ shareIcon } alt="Butão de Compartilhar" />
          </button>
          { copied }
          <button
            data-testid="favorite-btn"
            type="button"
            src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
            onClick={ () => setOnFavoriteHeart(
              saveOrDeleteFavorites(
                buttonFavorite, id,
                {
                  id,
                  type: 'food',
                  nationality: element.strArea,
                  category: element.strCategory,
                  alcoholicOrNot: '',
                  name: element.strMeal,
                  image: element.strMealThumb,
                },
              ),
            ) }
          >
            {/* <img
              src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
              alt="Butão de Favoritar"
            /> */}
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
                    <input
                      type="checkbox"
                      id={ `${index}checkIndex` }
                      onClick={ (event) => addAndRemoveClass(event) }
                    />
                    {/* <label htmlFor={ `${index}checkIndex` } key={ index }> */}
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
        disabled={ activeButton }
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
