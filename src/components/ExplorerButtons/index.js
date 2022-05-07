import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useExplorer from '../../hooks/useExplorer';

function ExplorerButtons(props) {
  const { title, history } = props;
  const isFood = (title === 'Foods');
  const [idRecipe, surpriseMe] = useExplorer(0);

  useEffect(() => {
    console.log(idRecipe);
    const pathName = `/${title.toLowerCase()}/${idRecipe}`;
    if (idRecipe !== 0) history.push(pathName);
  }, [idRecipe]);

  const handleClick = ({ id }) => {
    if (id === 'ingredient') {
      history.push(`/explore/${title.toLowerCase()}/ingredients`);
    }
    if (id === 'nationality') {
      history.push('/explore/foods/nationalities');
    }
    console.log(id, 'Passou aqui, chama surprise-me');
    if (id === 'surprise') {
      surpriseMe(isFood);
    }
  };

  return (
    <Container className="w-50 mt-2 bg-dark rounded-3">
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
