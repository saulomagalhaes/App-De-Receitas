import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { funcSaveDrinkInProgress, getFoodById } from '../redux/actions';
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

  // const favoriteRecipes = localStorage.getItem('favoriteRecipes')
  //   ? JSON.parse(localStorage.getItem('favoriteRecipes'))
  //   : ['dataInitial'];

  // const [copied, setCopied] = useState('');
  // const [data, setData] = useState(favoriteRecipes);

  useEffect(() => {
    dispatch(getFoodById(id));
    dispatch(funcSaveDrinkInProgress(id));
    setOnFavoriteHeart(checkedFavorites(id));
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

  // console.log(drinkProgress[0]);

  // const handleCopy = (url) => {
  //   navigator.clipboard.writeText(url);
  //   setCopied('Link copied!');
  // };

  // const handleFavorites = () => {
  //   const copyData = [...data];
  //   const newData = copyData.filter((item) => item.id !== id);
  //   setData(newData);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  // };

  // const handleFavorites = () => {
  //   const copyData = [...data];
  //   // const newData = copyData.filter((item) => item.id !== id);

  //   const { idDrink, strCategory, strAlcoholic,
  //     strDrink, strDrinkThumb } = drinkProgress[0];

  //   const dataIngredient = {
  //     id: idDrink,
  //     type: 'drink',
  //     category: strCategory,
  //     alcoholicOrNot: strAlcoholic,
  //     name: strDrink,
  //     image: strDrinkThumb,
  //   };

  //   const newData = copyData.push(dataIngredient);
  //   // setData(newData);
  //   // localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  //   console.log(data);
  //   console.log(favoriteRecipes);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(copyData));
  // };

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
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopied('Link copied!');
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

                  >
                    <input
                      type="checkbox"
                      id={ `${index}checkIndex` }
                      onChange={ (event) => addAndRemoveClass(event) }
                    />
                    {/* <label
                      htmlFor={ `${index}checkIndex` }
                      key={ index }
                      className="checkedItem"
                    > */}
                    {ingredient}
                    {/* </label> */}
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
