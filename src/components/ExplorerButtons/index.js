import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ExplorerButtons(props) {
  const { title, history } = props;

  const handleClick = ({ value }) => (
    console.log(history, title, value)
    // If (title === 'Foods') {

    //   history.push('/explore/foods/ingredients')

    //   history.push('/explore/foods/nationalities')
  );

  return (
    <Container className="w-75 mb-2 bg-light rounded-3">
      <Button
        data-testid="explore-by-ingredient"
        onClick={ (e) => handleClick(e.target) }
        variant="info"
        className="m-4"
      >
        By Ingredient
      </Button>
      <Button
        data-testid="explore-by-nationality"
        // onClick={ () => history.push('/explore/foods/nationalities') }
        variant="info"
        className="m-4"
      >
        By Nationality
      </Button>
      <Button
        data-testid="explore-surprise"
        // onClick={ () => history.push('/explore/drinks') }
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
