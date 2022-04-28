import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getFoodsByName } from '../redux/actions';
import MealCard from '../components/MealCard';

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodsByName(''));
  }, []);

  // const takeFoods = () => {
  //   if (foods.meals.length > 0) {
  //     console.log('dentro do if');
  //     const maxLength = 12;
  //     const editFoods = foods.slice(1, maxLength);
  //     return editFoods;
  //   }

  //   return foods;
  // };

  useEffect(() => {
    console.log(foods.meals);
  }, [foods]);

  return (
    <>
      <Header title="Foods" />
      <h1>Food</h1>
      {empty !== null ? checkEmpty() : ''}
      {/* {
        foods.length > 0 && foods.map(

        )
      } */}
      <Footer />

    </>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
