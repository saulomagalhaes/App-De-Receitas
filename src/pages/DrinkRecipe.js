import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { checkedDonesRecipes, checkedFavorites, saveOrDeleteFavorites,
  checkedLocalStorage, concatenateIngredient } from '../services/FuncRecipesDetails';
import { getDrinkById, getFoodsByName } from '../redux/actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NINETEEN_MAX_LENGTH = 19;

function DrinkRecipe(props) {
  const { history } = props;
  const { id } = useParams();
  const drinks = useSelector((state) => state.drinks.drinkdetails);
  const foods = useSelector((state) => state.foods.meals);
  const [buttonFavorite, setOnFavoriteHeart] = useState(true);
  const [buttonPhrase, setButtonPhrase] = useState(true);
  const [buttonProgress, setButtonProgress] = useState(false);
  const [copied, setCopied] = useState('');
  const dispatch = useDispatch();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  useEffect(() => {
    dispatch(getFoodsByName(''));
    dispatch(getDrinkById(id));
    setButtonPhrase(checkedLocalStorage(id));
    setOnFavoriteHeart(checkedFavorites(id));
    setButtonProgress(checkedDonesRecipes(id));
  }, []);

  function onSubmitButtonClick() {
    const ingredientMeasure = concatenateIngredient(drinks);
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let objectRecipe = {};
    if (previousProgress) {
      const previousMeals = previousProgress.cocktails;

      objectRecipe = {
        cocktails: {
          ...previousMeals,
          [id]: ingredientMeasure,
        },
        ...previousProgress,
      };
    } else {
      objectRecipe = {
        cocktails: { [id]: ingredientMeasure },
        meals: {},
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    history.push(`/drinks/${id}/in-progress`);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopied('Link copied!');
  };

  if (drinks !== undefined) {
    return (
      <>
        {
          drinks
            .map((element) => (
              <section key={ element.idDrink }>
                <img
                  src={ element.strDrinkThumb }
                  alt="Imagem da Bebida"
                  data-testid="recipe-photo"
                />
                <h1 data-testid="recipe-title">{ element.strDrink }</h1>
                <p data-testid="recipe-category">
                  {element.strAlcoholic === 'Alcoholic' ? element.strAlcoholic : ''}
                </p>
                <button data-testid="share-btn" type="button" onClick={ handleCopy }>
                  <img src={ shareIcon } alt="Butão de Compartilhar" />
                </button>
                {copied}
                <button
                  data-testid="favorite-btn"
                  type="button"
                  onClick={ () => setOnFavoriteHeart(
                    saveOrDeleteFavorites(
                      buttonFavorite, id,
                      {
                        id,
                        type: 'drink',
                        nationality: '',
                        category: strCategory,
                        alcoholicOrNot: element.strAlcoholic === 'Alcoholic'
                          ? element.strAlcoholic : '',
                        name: element.strDrink,
                        image: element.strDrinkThumb,
                      },
                    ),
                  ) }
                >
                  <img
                    src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
                    alt="Butão de Favoritar"
                  />
                </button>
                <hr />
                <ul>
                  {
                    concatenateIngredient(drinks)
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
                <hr />
                <h1>Instructions</h1>
                <p data-testid="instructions">{element.strInstructions}</p>
                <h1>Recommended</h1>
                <Slider
                  { ...settings }
                  data-testid="recomendation-card"
                >
                  {
                    foods
                      .splice(NINETEEN_MAX_LENGTH)
                      .map((img, indexImg) => (
                        <div key={ indexImg }>
                          <img
                            data-testid={ `${indexImg}-recomendation-card` }
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
              </section>
            ))
        }
        <button
          alt="Botão de inciar"
          type="button"
          disabled={ buttonProgress }
          onClick={ onSubmitButtonClick }
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0' } }
        >
          { buttonPhrase }
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
