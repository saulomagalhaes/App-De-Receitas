import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { checkedDonesRecipes, checkedFavorites, checkedLocalStorage,
  concatenateIngredient, saveOrDeleteFavorites } from '../services/FuncRecipesDetails';
import { getDrinksByName, getFoodById } from '../redux/actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NINETEEN_MAX_LENGTH = 19;

function FoodRecipe(props) {
  const { history } = props;
  const { id } = useParams();
  const meals = useSelector((state) => state.foods.mealdetails);
  const drinks = useSelector((state) => state.drinks.drinks);
  const [buttonFavorite, setOnFavoriteHeart] = useState(true);
  const [buttonPhrase, setButtonPhrase] = useState(true);
  const [buttonProgress, setButtonProgress] = useState(false);
  const [copied, setCopied] = useState('');
  const dispatch = useDispatch();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(getDrinksByName(''));
    dispatch(getFoodById(id));
    setButtonPhrase(checkedLocalStorage(id));
    setOnFavoriteHeart(checkedFavorites(id));
    setButtonProgress(checkedDonesRecipes(id));
  }, []);

  function onSubmitButtonClick() {
    const ingredientMeasure = concatenateIngredient(meals);
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let objectRecipe = {};
    if (previousProgress) {
      const previousMeals = previousProgress.meals;

      objectRecipe = {
        ...previousProgress,
        meals: {
          ...previousMeals,
          [id]: ingredientMeasure,
        },
      };
    } else {
      objectRecipe = {
        meals: { [id]: ingredientMeasure },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    history.push(`/foods/${id}/in-progress`);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied('Link copied!');
  };

  if (meals !== undefined) {
    return (
      <>
        {
          meals
            .map((element) => (
              <section key={ element.idMeal }>
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
                {copied}
                <button
                  data-testid="favorite-btn"
                  type="button"
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
                  <img
                    src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
                    alt="Butão de Favoritar"
                  />
                </button>
                <hr />
                <ul>
                  {
                    concatenateIngredient(meals)
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
                <p data-testid="instructions">{ element.strInstructions }</p>
                <h1>Vídeo</h1>
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
                <h1>Recommended</h1>
                <Slider
                  { ...settings }
                  data-testid="recomendation-card"
                >
                  {
                    drinks
                      .splice(NINETEEN_MAX_LENGTH)
                      .map((img, indexImg) => (
                        <div key={ indexImg }>
                          <img
                            data-testid={ `${indexImg}-recomendation-card` }
                            src={ img.strDrinkThumb }
                            style={ { width: '200px' } }
                            alt="Recomendação de Bebida"
                          />
                          <span>
                            {img.strAlcoholic === 'Alcoholic'
                              ? img.strAlcoholic : ''}
                          </span>
                          <p data-testid={ `${indexImg}-recomendation-title` }>
                            {img.strDrink}
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

FoodRecipe.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodRecipe;
