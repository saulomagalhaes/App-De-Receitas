import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { checkedFavorites, saveOrDeleteFavorites } from '../services/FuncRecipesDetails';

function ButtonFavorite(props) {
  const [buttonFavorite, setOnFavoriteHeart] = useState(true);
  const { id, element } = props;
  const whiteHeartIcon = 'src/images/whiteHeartIcon.svg';
  const blackHeartIcon = 'src/images/blackHeartIcon.svg';

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
