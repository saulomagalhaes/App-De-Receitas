import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore(props) {
  const { history } = props;

  return (
    <>
      <Header title="Explore" />
      <Container className="w-75 mb-2 bg-light rounded-3">
        <Button
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          variant="info"
          className="m-4"
        >
          Explore Foods
        </Button>
        <Button
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          variant="info"
          className="m-4"
        >
          Explore Drinks
        </Button>
      </Container>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Explore;
