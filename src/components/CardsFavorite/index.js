import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function CardsFavorite(props) {
  const { recipe, index, handleFavorites } = props;
  const [copied, setCopied] = useState('');

  const handleCopy = (url) => {
    const timeOut = 3000;
    navigator.clipboard.writeText(url);
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    },
    timeOut);
  };

  return (
    <section className="cards">
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
    </section>
  );
}

CardsFavorite.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default CardsFavorite;
