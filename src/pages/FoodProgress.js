import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/DetailsRecipes.css';
import Slider from 'react-slick';
import shareIcon from '../images/shareIcon.svg';
import { concatenateIngredient, doneRecipes } from '../services/FuncRecipesDetails';
import { getDrinksByName, getFoodById } from '../redux/actions';
import ButtonFavorite from '../components/ButtonFavorite';

const MAX_LENGTH = 6;

function FoodProgress({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const mealsProgress = useSelector((state) => state.foods.mealdetails);
  const drinks = useSelector((state) => state.drinks.drinks);
  const [activeButton, setActiveButton] = useState(true);
  const [copied, setCopied] = useState('');

  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipe = (progressRecipes) ? Object
    .values(progressRecipes.meals[id]) : [];
  const [arrayIngredients, setArrayIngredients] = useState(recipe);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  useEffect(() => {
    dispatch(getDrinksByName(''));
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
    const timeOut = 3000;
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    },
    timeOut);
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
      alcoholicOrNot: '',
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
        <div key={ element.idMeal } className="recipe-container">
          <p className="message-copy">{ copied }</p>
          <img
            src={ element.strMealThumb }
            className="recipe-photo"
            alt="Imagem da Comida"
            data-testid="recipe-photo"
          />
          <div className="title-container">
            <h1 data-testid="recipe-title" className="recipe-title">{element.strMeal}</h1>
            <button
              data-testid="share-btn"
              className="share-btn"
              type="button"
              onClick={ handleCopy }
            >
              <img src={ shareIcon } alt="Butão de Compartilhar" />
            </button>
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
              concatenateIngredient(mealsProgress)
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
          <iframe
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${element.strYoutube
              .substring(element.strYoutube.indexOf('=') + 1)}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
          />
          <hr />
          <div className="recommended-card">
            <h2>Recomendados</h2>
            <Slider { ...settings }>
              {
                drinks
                  .slice(0, MAX_LENGTH)
                  .map((img, indexImg) => (
                    <div
                      key={ indexImg }
                      data-testid={ `${indexImg}-recomendation-card` }
                      className="recomendation-card"
                    >
                      <img
                        src={ img.strDrinkThumb }
                        style={ { width: '200px' } }
                        alt="Recomendação de Bebida"
                      />
                      <p data-testid={ `${indexImg}-recomendation-title` }>
                        {img.strDrink}
                      </p>
                      <span>
                        {img.strAlcoholic === 'Alcoholic'
                          ? img.strAlcoholic : ''}
                      </span>
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
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn button"
      >
        Finish Recipe
      </button>
    </>
  );
}

FoodProgress.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodProgress;
