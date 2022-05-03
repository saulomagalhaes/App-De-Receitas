import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExplorerButtons from '../components/ExplorerButtons';

function FoodExplore(props) {
  const { history } = props;

  return (
    <>
      <Header title="Explore Foods" />
      <ExplorerButtons title="Foods" history={ history } />
      <Footer />
    </>
  );
}

FoodExplore.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodExplore;
