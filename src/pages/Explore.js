import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

function Explore(props) {
  const { history } = props;

  return (
    <>
      <Header title="Explore" />
      <section className="explore-container">
        <button
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          className="big-button"
          type="button"
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          className="big-button"
          type="button"
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Explore;
