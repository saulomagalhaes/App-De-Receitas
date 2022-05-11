import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import shareIcon from '../images/shareIcon.svg';
import { checkedDonesRecipes, checkedLocalStorage,
  concatenateIngredient } from '../services/FuncRecipesDetails';
import { getDrinksByName, getFoodById } from '../redux/actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/DetailsRecipes.css';
import ButtonFavorite from '../components/ButtonFavorite';

const MAX_LENGTH = 6;

function FoodRecipe(props) {
  const { history } = props;
  const { id } = useParams();
  const meals = useSelector((state) => state.foods.mealdetails);
  const drinks = useSelector((state) => state.drinks.drinks);
  const [buttonPhrase, setButtonPhrase] = useState(true);
  const [buttonProgress, setButtonProgress] = useState(true);
  const [copied, setCopied] = useState('');
  const dispatch = useDispatch();

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
    setButtonPhrase(checkedLocalStorage(id, 'food'));
    setButtonProgress(checkedDonesRecipes(id));
  }, []);

  function onSubmitButtonClick() {
    // const ingredientMeasure = concatenateIngredient(meals);
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let objectRecipe = {};
    if (previousProgress) {
      const previousMeals = previousProgress.meals;
      objectRecipe = {
        ...previousProgress,
        meals: {
          ...previousMeals,
          [id]: [],
        },
      };
    } else {
      objectRecipe = {
        cocktails: {},
        meals: { [id]: [] },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    history.push(`/foods/${id}/in-progress`);
  }

  const handleCopy = () => {
    const timeOut = 3000;
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    },
    timeOut);
  };

  if ((meals.length > 0) && (drinks.length > 0)) {
    return (
      <>
        {
          meals
            .map((element) => (
              <section key={ element.idMeal } className="recipe-container">
                <img
                  src={ element.strMealThumb }
                  alt="Imagem da Comida"
                  data-testid="recipe-photo"
                  className="recipe-photo"
                />
                <div className="title-container">
                  <h1 data-testid="recipe-title">{element.strMeal}</h1>
                  <button
                    data-testid="share-btn"
                    type="button"
                    className="share-btn"
                    onClick={ handleCopy }
                  >
                    <img src={ shareIcon } alt="Butão de Compartilhar" />
                  </button>
                  {copied}
                  <ButtonFavorite
                    id={ id }
                    element={ {
                      id: element.idMeal,
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
                <h2>Instruções</h2>
                <p
                  data-testid="instructions"
                  className="instructions"
                >
                  { element.strInstructions }
                </p>
                <h2>Vídeo</h2>
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
                  <h2>Recommended</h2>
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
              </section>
            ))
        }
        { !buttonProgress && (
          <button
            alt="Botão de inciar"
            type="button"
            onClick={ onSubmitButtonClick }
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0' } }
            className="button-login"
          >
            { buttonPhrase }
          </button>)}
      </>
    );
  }
  return null;
}

FoodRecipe.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodRecipe;
