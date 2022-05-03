import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ExplorerButtons(props) {
  const { title, history } = props;
  const isFood = (title === 'Foods');

  const handleClick = ({ id }) => {
    console.log(title, id, isFood);
    if (isFood && (id === 'ingredient')) {
      history.push('/explore/foods/ingredients');
    }
    if (isFood && (id === 'nationality')) {
      history.push('/explore/foods/nationalities');
    }
    if (!isFood && (id === 'ingredient')) {
      history.push('/explore/drinks/ingredients');
    }
    if (id === 'surprise') surpriseMe();
  };

  return (
    <Container className="w-75 mb-2 bg-light rounded-3">
      <Button
        id="ingredient"
        data-testid="explore-by-ingredient"
        onClick={ (e) => handleClick(e.target) }
        variant="info"
        className="m-4"
      >
        By Ingredient
      </Button>
      { isFood ? (
        <Button
          id="nationality"
          data-testid="explore-by-nationality"
          onClick={ (e) => handleClick(e.target) }
          variant="info"
          className="m-4"
        >
          By Nationality
        </Button>
      ) : ('') }
      <Button
        id="surprise"
        data-testid="explore-surprise"
        onClick={ (e) => handleClick(e.target) }
        variant="info"
        className="m-4"
      >
        Surprise me!
      </Button>
    </Container>
  );
}

ExplorerButtons.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default ExplorerButtons;
