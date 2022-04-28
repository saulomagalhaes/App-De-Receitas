import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';

function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.foods.meals);
  const empty = useSelector((state) => state.empty);

  const redirectDetails = () => {
    const id = Number(foods[0].idMeal);
    return history.push(`/foods/${id}`);
  };

  const checkCard = () => (foods.length === 1
    ? redirectDetails()
    : <Cards foods={ foods } />);

  const checkEmpty = () => (empty === true
    ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
    : checkCard());

  return (
    <>
      <Header title="Foods" />
      <h1>Food</h1>
      {empty !== null ? checkEmpty() : ''}
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
