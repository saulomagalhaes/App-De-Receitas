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

  const checkCard = () => (drinks.length === 1
    ? redirectDetails()
    : <Cards drinks={ drinks } />
  );

  return (
    <>
      <Header title="Drinks" />
      <h1>Food</h1>
      {drinks !== null
        ? checkCard()
        : global.alert(
          'Sorry, we haven\'t found any recipes for these filters.',
        )}
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Drinks;
