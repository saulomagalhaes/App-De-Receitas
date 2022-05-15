import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/DonesRecipes.css';
import shareIcon from '../../images/shareIcon.svg';

function CardsDone(props) {
  const { recipe, index } = props;
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
    <div key={ recipe.id } className="card-container">
      <p className="message-copy">{copied}</p>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          className="horizontal-image"
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <div className="card-info">
        <div className="copy-category-container">
          {recipe.alcoholicOrNot === '' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </p>
          )}
          <button
            type="button"
            data-testid={ `${index}-btn-click` }
            onClick={ () => handleCopy(`http://localhost:3000/foods/${recipe.id}`) }
            className="btn-click"
          >
            <img
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            />
          </button>
        </div>
        <Link
          to={ `/${recipe.type}s/${recipe.id}` }
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </Link>
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
  );
}

CardsDone.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    doneDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardsDone;
