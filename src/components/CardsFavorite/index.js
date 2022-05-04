import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function CardsFavorite(props) {
  const { data, handleCopy, copied, handleFavorites } = props;

  if (data === '') return <h1>Não há receitas finalizadas</h1>;

  return (
    <section className="cards">
      {data.map((recipe, index) => (
        <div key={ recipe.id } className="card">
          <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </a>
          <div className="card-info">

            <button
              type="button"
              onClick={ () => handleCopy(`http://localhost:3000/foods/${recipe.id}`) }
            >
              <img
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
              />
              {copied}
            </button>

            <button
              type="button"
              onClick={ () => handleFavorites(recipe.id) }
            >
              <img
                alt="black heart icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
              />
            </button>

            {recipe.alcoholicOrNot === '' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            )}
            <a
              href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

CardsFavorite.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nationality: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      alcoholicOrNot: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleCopy: PropTypes.func.isRequired,
  copied: PropTypes.string.isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default CardsFavorite;
