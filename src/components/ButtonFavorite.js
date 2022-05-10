import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { checkedFavorites, saveOrDeleteFavorites } from '../services/FuncRecipesDetails';

function ButtonFavorite(props) {
  const [buttonFavorite, setOnFavoriteHeart] = useState(true);
  const { id, element } = props;

  useEffect(() => {
    setOnFavoriteHeart(checkedFavorites(id));
  }, []);

  return (
    <button
      type="button"
      onClick={ () => setOnFavoriteHeart(
        saveOrDeleteFavorites(
          buttonFavorite, id, element,
        ),
      ) }
      className="favorite-btn"
    >
      <img
        src={ buttonFavorite ? whiteHeartIcon : blackHeartIcon }
        alt="Butão de Favoritar"
        data-testid="favorite-btn"
      />
    </button>
  );
}

ButtonFavorite.propTypes = {
  element: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonFavorite;
