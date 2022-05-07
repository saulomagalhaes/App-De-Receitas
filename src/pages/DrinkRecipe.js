import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import shareIcon from '../images/shareIcon.svg';
import { checkedDonesRecipes,
  checkedLocalStorage, concatenateIngredient } from '../services/FuncRecipesDetails';
import { getDrinkById, getFoodsByName } from '../redux/actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ButtonFavorite from '../components/ButtonFavorite';
import '../images/whiteHeartIcon.svg';
import '../images/blackHeartIcon.svg';

const MAX_LENGTH = 6;

function DrinkRecipe(props) {
  const { history } = props;
  const { id } = useParams();
  const drinks = useSelector((state) => state.drinks.drinkdetails);
  const foods = useSelector((state) => state.foods.meals);
  const [buttonPhrase, setButtonPhrase] = useState(true);
  const [buttonProgress, setButtonProgress] = useState(false);
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
    dispatch(getFoodsByName(''));
    dispatch(getDrinkById(id));
    setButtonPhrase(checkedLocalStorage(id, 'drink'));
    setButtonProgress(checkedDonesRecipes(id));
  }, []);

  function onSubmitButtonClick() {
    const ingredientMeasure = concatenateIngredient(drinks);
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let objectRecipe = {};
    if (previousProgress) {
      const previousMeals = previousProgress.cocktails;

      objectRecipe = {
        ...previousProgress,
        cocktails: {
          ...previousMeals,
          [id]: ingredientMeasure,
        },
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
                {/* <button
                  type="button"
                  onClick={ () => setOnFavoriteHeart(
                    saveOrDeleteFavorites(
                      buttonFavorite, id,
                      {
                        id,
                        type: 'drink',
                        nationality: '',
                        category: element.strCategory,
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
                    data-testid="favorite-btn"
                  />
                </button> */}
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
                <div>
                  <h1>Recommended</h1>
                  <Slider { ...settings }>
                    {
                      foods
                        .slice(0, MAX_LENGTH)
                        .map((img, indexImg) => (
                          <div
                            key={ indexImg }
                            data-testid={ `${indexImg}-recomendation-card` }
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
              </section>
            ))
        }
        { !buttonProgress && (
          <button
            alt="Botão de inciar"
            type="button"
            disabled={ buttonProgress }
            onClick={ onSubmitButtonClick }
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0' } }
          >
            { buttonPhrase }
          </button>)}
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
