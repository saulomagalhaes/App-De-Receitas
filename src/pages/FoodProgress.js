import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFoodById } from '../redux/actions';
import './DrinksProgress.css';
import shareIcon from '../images/shareIcon.svg';
import { concatenateIngredient, doneRecipes } from '../services/FuncRecipesDetails';
import ButtonFavorite from '../components/ButtonFavorite';

function FoodProgress({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const mealsProgress = useSelector((state) => state.foods.mealdetails);
  const [activeButton, setActiveButton] = useState(true);
  const [copied, setCopied] = useState('');

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipe = (progressRecipes) ? Object
    .values(progressRecipes.meals[id]) : [];
  const [arrayIngredients, setArrayIngredients] = useState(recipe);

  useEffect(() => {
    dispatch(getFoodById(id));
  }, []);

  const checkFinishRecipe = () => {
    const ValuesChekers = Object.values(document.querySelectorAll('input'));
    setActiveButton(!ValuesChekers.every((checkBoxCurrent) => checkBoxCurrent.checked));
  };

  function checkItem(target) {
    let objectRecipe = {};
    let newArray = [];

    if (arrayIngredients.includes(target.name)) { // se ja tiver, exclui o ingrediente
      newArray = arrayIngredients
        .filter((ingredient) => ingredient !== target.name);
      console.log('newArray', newArray);
    } else {
      newArray = [...arrayIngredients, target.name];
    }
    setArrayIngredients(newArray);
    objectRecipe = {
      ...progressRecipes,
      meals: {
        [id]: newArray,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
  }

  const addAndRemoveClass = ({ target }) => {
    const ingredient = target.parentNode;

    if (ingredient.classList.contains('checkedItem')) {
      ingredient.classList.remove('checkedItem');
    } else {
      ingredient.classList.add('checkedItem');
    }
    checkFinishRecipe();
    checkItem(target);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied('Link copied!');
  };

  const getClass = (ingredient) => (arrayIngredients
    .includes(ingredient) ? 'checkedItem' : '');

  const finishRecipe = () => {
    const data = new Date();
    const dataFinal = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    const finishedRecipe = {
      id: mealsProgress[0].idMeal,
      type: 'food',
      nationality: mealsProgress[0].strArea,
      category: mealsProgress[0].strCategory,
      alcoholicOrNot: '', // alcoholic-ou-non-alcoholic-ou-texto-vazio,
      name: mealsProgress[0].strMeal,
      image: mealsProgress[0].strMealThumb,
      doneDate: dataFinal,
      tags: mealsProgress[0].strTags.split(','),
    };

    doneRecipes(finishedRecipe);
    history.push('/done-recipes');
  };

  return (
    <>
      {mealsProgress && mealsProgress.map((element) => (
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
          <ButtonFavorite
            id={ id }
            element={ {
              id,
              type: 'food',
              nationality: element.strArea,
              category: element.strCategory,
              alcoholicOrNot: '',
              name: element.strMeal,
              image: element.strMealThumb,
            } }
          />
          <hr />
          <h1>Ingredients</h1>
          <div>
            {
              concatenateIngredient(mealsProgress)
                .map((ingredient, index) => (
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    key={ index }
                    id={ index }
                    htmlFor={ `${index}checkIndex` }
                    className={ getClass(ingredient) }
                  >
                    <input
                      type="checkbox"
                      id={ `${index}checkIndex` }
                      onChange={ (event) => addAndRemoveClass(event) }
                      name={ ingredient }
                      checked={ arrayIngredients.includes(ingredient) }
                    />
                    {ingredient}
                  </label>
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
        onClick={ finishRecipe }
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
