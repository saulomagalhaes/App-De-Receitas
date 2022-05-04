import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function CardsIngredients(props) {
  const history = useHistory();
  console.log(history);
  const { ingredient, index, URL } = props;

  return (
    <Card
      style={ { width: '18rem' } }
      data-testid={ `${index}-ingredient-card` }
      // onClick={ () => history.push(`/foods/${idToNumber}`) }
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
  ingredient: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  URL: PropTypes.string.isRequired,
};

export default CardsIngredients;
