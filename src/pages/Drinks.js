import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';

function Drinks(props) {
  const { history } = props;
  const drinks = useSelector((state) => state.drinks.drinks);

  const redirectDetails = () => {
    const id = Number(drinks[0].idDrink);
    return history.push(`/drinks/${id}`);
  };
  return (
    <>
      <Header title="Drinks" />
      <h1>Drinks</h1>
      {drinks.length === 1 ? redirectDetails() : <Cards drinks={ drinks } />}
      <Footer />
    </>
  );
}
Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Drinks;
