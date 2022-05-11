import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDrinkById } from '../redux/actions';
import '../styles/DrinksProgress.css';
import shareIcon from '../images/shareIcon.svg';
import { concatenateIngredient, doneRecipes } from '../services/FuncRecipesDetails';
import ButtonFavorite from '../components/ButtonFavorite';

function DrinkProgress({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const drinkProgress = useSelector((state) => state.drinks.drinkdetails);
  const [activeButton, setActiveButton] = useState(true);
  const [copied, setCopied] = useState('');

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipe = (progressRecipes) ? Object
    .values(progressRecipes.cocktails[id]) : [];
  const [arrayIngredients, setArrayIngredients] = useState(recipe);

  useEffect(() => {
    dispatch(getDrinkById(id));
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
      cocktails: {
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
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopied('Link copied!');
  };

  const getClass = (ingredient) => (arrayIngredients
    .includes(ingredient) ? 'checkedItem' : '');

  const finishRecipe = () => {
    const data = new Date();
    const dataFinal = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    const finishedRecipe = {
      id: drinkProgress[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinkProgress[0].strCategory,
      alcoholicOrNot: drinkProgress[0].strAlcoholic, // alcoholic-ou-non-alcoholic-ou-texto-vazio,
      name: drinkProgress[0].strDrink,
      image: drinkProgress[0].strDrinkThumb,
      doneDate: dataFinal,
      tags: (drinkProgress[0].strTags) ? drinkProgress[0].strTags.split(',') : [],
    };

    doneRecipes(finishedRecipe);
    history.push('/done-recipes');
  };

  return (
    <>
      {drinkProgress && drinkProgress.map((element) => (
        <div key={ element.idDrink }>
          <img
            src={ element.strDrinkThumb }
            alt="Imagem da bebida"
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
              type: 'drink',
              nationality: '',
              category: element.strCategory,
              alcoholicOrNot: element.strAlcoholic === 'Alcoholic'
                ? element.strAlcoholic : '',
              name: element.strDrink,
              image: element.strDrinkThumb,
            } }
          />
          <hr />
          <h1>Ingredients</h1>
          <div>
            {
              concatenateIngredient(drinkProgress)
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
DrinkProgress.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DrinkProgress;
