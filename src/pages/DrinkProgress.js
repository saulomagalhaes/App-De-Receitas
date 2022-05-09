import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { funcSaveDrinkInProgress, getDrinkById } from '../redux/actions';
import './DrinksProgress.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { saveOrDeleteFavorites,
  checkedFavorites } from '../services/FuncRecipesDetails';

function DrinkProgress({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { drinkProgress } = useSelector((state) => state.drinks);
  const [activeButton, setActiveButton] = useState(true);
  const [buttonFavorite, setOnFavoriteHeart] = useState(true);
  const [copied, setCopied] = useState('');

  // const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const progressRecipes = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : [];

  // const test = progressRecipes.length ? Object
  //   .values(progressRecipes.cocktails[id]) : [];

  // const [arrayIngredients,
  //   setArrayIngredients] = useState(test);

  // const [arrayIngredients,
  //   setArrayIngredients] = useState(progressRecipes.length ? Object
  //   .values(progressRecipes.cocktails[id]) : []);

  const [arrayIngredients, setArrayIngredients] = useState([]);

  // const [copied, setCopied] = useState('');
  // const [data, setData] = useState(favoriteRecipes);

  useEffect(() => {
    dispatch(getDrinkById(id));
    dispatch(funcSaveDrinkInProgress(id));
    setOnFavoriteHeart(checkedFavorites(id));
    console.log(localStorage.getItem('inProgressRecipes'));

    setArrayIngredients(progressRecipes.length ? Object
      .values(progressRecipes.cocktails[id]) : []);
  }, []);

  const onSubmitButtonClick = () => { // joga para pag de finalizados (AINDA NAO MEXI)
    history.push('/done-recipes');
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

  function onSubmitButtonClickTeste(target) {
    let objectRecipe = {};

    if (progressRecipes) {
      // const previousMeals = previousProgress.cocktails;
      let newArray = [];
      if (arrayIngredients.includes(target.name)) { // se ja tiver, exclui o ingrediente
        newArray = arrayIngredients
          .filter((ingredient) => ingredient !== target.name);
        // setArrayIngredients(newArray);
        console.log('newArray', newArray);
      } else {
        newArray = [...arrayIngredients, target.name]; // se nao tiver, add o ingrediente no state
      }
      setArrayIngredients(newArray);
      objectRecipe = {
        ...progressRecipes,
        cocktails: {
          // ...previousMeals,
          [id]: newArray, // aqui eu tenho q passar o ingredient, pegando-o por parentNode
        },
      };
    } else {
      objectRecipe = {
        // cocktails: { [id]: ingredientMeasure },
        meals: {},
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectRecipe));
    console.log('funfando', arrayIngredients);
  }

  const addAndRemoveClass = ({ target }) => {
    const ingredient = target.parentNode;

    if (ingredient.classList.contains('checkedItem')) {
      ingredient.classList.remove('checkedItem');
    } else {
      ingredient.classList.add('checkedItem');
    }

    toggleButton();

    onSubmitButtonClickTeste(target);
    console.log(target.checked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopied('Link copied!');
  };

  const getClass = (ingredient) => (arrayIngredients
    .includes(ingredient) ? 'checkedItem' : '');

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
                  category: element.strCategory,
                  alcoholicOrNot: element.strAlcoholic === 'Alcoholic'
                    ? element.strAlcoholic : '',
                  name: element.strDrink,
                  image: element.strDrinkThumb,
                },
              ),
            ) }
            src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
          >
            <img
              src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
              alt="Butão de Favoritar"
            />
          </button>
          <hr />
          <h1>Ingredients</h1>
          <div>
            {
              concatenateIngredient()
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
