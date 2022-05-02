import React from 'react';
// import PropTypes from 'prop-types';
// import { Button, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExplorerButtons from '../components/ExplorerButtons';

function FoodExplore() {
  // const { history } = props;
  // console.log(history);
  return (
    <>
      <Header title="Explore Foods" />
      <ExplorerButtons title="Foods" />
      {/* <Container className="w-75 mb-2 bg-light rounded-3">
        <Button
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
          variant="info"
          className="m-4"
        >
          By Ingredient
        </Button>
        <Button
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
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
      </Container> */}
      <Footer />
    </>
  );
}

export default FoodExplore;
