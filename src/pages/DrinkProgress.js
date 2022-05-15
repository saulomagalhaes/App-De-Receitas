import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/DetailsRecipes.css';
import Slider from 'react-slick';
import { getDrinkById, getFoodsByName } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import { concatenateIngredient, doneRecipes } from '../services/FuncRecipesDetails';
import ButtonFavorite from '../components/ButtonFavorite';

const MAX_LENGTH = 6;

function DrinkProgress({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const drinkProgress = useSelector((state) => state.drinks.drinkdetails);
  const foods = useSelector((state) => state.foods.meals);
  const [activeButton, setActiveButton] = useState(true);
  const [copied, setCopied] = useState('');

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipe = (progressRecipes) ? Object
    .values(progressRecipes.cocktails[id]) : [];
  const [arrayIngredients, setArrayIngredients] = useState(recipe);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  useEffect(() => {
    dispatch(getFoodsByName(''));
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
        <div key={ element.idDrink } className="recipe-container">
          <p className="message-copy">{ copied }</p>
          <img
            src={ element.strDrinkThumb }
            className="recipe-photo"
            alt="Imagem da bebida"
            data-testid="recipe-photo"
          />
          <div className="title-container">
            <h1
              data-testid="recipe-title"
              className="recipe-title"
            >
              { element.strDrink }
            </h1>
            <button
              data-testid="share-btn"
              type="button"
              className="share-btn"
              onClick={ handleCopy }
            >
              <img src={ shareIcon } alt="Butão de Compartilhar" />
            </button>
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
          </div>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            {element.strCategory}
          </p>
          <hr />
          <h2>Ingredientes</h2>
          <ul className="ingredient-list">
            {
              concatenateIngredient(drinkProgress)
                .map((ingredient, index) => (
                  <li key={ index } className="ingredient-step">
                    <label
                      data-testid={ `${index}-ingredient-step` }
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
                  </li>
                ))
            }
          </ul>
          <hr />
          <h2>Instruções</h2>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {element.strInstructions}
          </p>
          <hr />
          <div className="recommended-card">
            <h2>Recomendados</h2>
            <Slider { ...settings }>
              {
                foods
                  .slice(0, MAX_LENGTH)
                  .map((img, indexImg) => (
                    <div
                      key={ indexImg }
                      data-testid={ `${indexImg}-recomendation-card` }
                      className="recomendation-card"
                    >
                      <img
                        src={ img.strMealThumb }
                        style={ { width: '200px' } }
                        alt="Recomendação de Comida"
                      />
                      <span>{img.strCategory}</span>
                      <p data-testid={ `${indexImg}-recomendation-title` }>
                        {img.strMeal}
                      </p>
                    </div>
                  ))
              }
            </Slider>
          </div>
        </div>
      ))}
      <button
        src=""
        alt="Botão de finalizar"
        type="button"
        disabled={ activeButton }
        onClick={ finishRecipe }
        className="finish-recipe-btn button"
      >
        Finish Recipe
      </button>
    </>
  );
}
DrinkProgress.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DrinkProgress;
