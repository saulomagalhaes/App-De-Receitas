import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useIngredient from '../../hooks/useIngredient';

function CardsIngredients(props) {
  const history = useHistory();
  const { ingredient, index, URL, title } = props;
  const [ingredientSelected, setIngredient] = useIngredient(false);
  const [isSelected, setSelected] = useState(false);

  const handleClick = () => {
    setIngredient(title, ingredient);
    setSelected(true);
  };

  useEffect(() => {
    if (ingredientSelected && isSelected) history.push(`/${title}`);
  }, [isSelected, ingredientSelected]);

  return (
    <Card
      style={ { width: '18rem' } }
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleClick }
    >
      <Card.Img
        variant="top"
        src={ URL }
        alt="ingredient"
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>
          {ingredient}

        </Card.Title>
        {/* <Card.Text>
          XXX
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
}

CardsIngredients.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  URL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardsIngredients;
