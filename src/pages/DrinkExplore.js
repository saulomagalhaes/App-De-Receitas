import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExplorerButtons from '../components/ExplorerButtons';

function DrinkExplore(props) {
  const { history } = props;

  return (
    <>
      <Header title="Explore Drinks" />
      <ExplorerButtons title="Drinks" history={ history } />
      <Footer />
    </>
  );
}

DrinkExplore.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkExplore;
