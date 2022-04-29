import React from 'react';
import './styles.scss';
import shareIcon from '../../images/shareIcon.svg';

function CardsDone() {
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : '';

  if (doneRecipes === '') return <h1>Não há receitas finalizadas</h1>;

  return (
    <section className="cards">
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.id } className="card">
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <div className="card-info">
            <img
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            />
            {recipe.alcoholicOrNot === '' ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}

              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            )}

            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>

            {recipe.tags !== [] && (
              <div>
                {recipe.tags.map((recipeTag) => (
                  <p
                    key={ recipeTag }
                    data-testid={ `0-${recipeTag}-horizontal-tag` }
                  >
                    {recipeTag}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default CardsDone;
