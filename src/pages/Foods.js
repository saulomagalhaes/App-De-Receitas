import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getFoodsByName } from '../redux/actions';

function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.foods.meals);

  const redirectDetails = () => {
    const id = Number(foods[0].idMeal);
    return history.push(`/foods/${id}`);
  };

  const checkCard = () => (foods.length === 1
    ? redirectDetails()
    : <Cards foods={ foods } />
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodsByName(''));
  }, []);

  return (
    <>
      <Header title="Foods" />
      <h1>Food</h1>
      {foods !== null
        ? checkCard()
        : global.alert(
          'Sorry, we haven\'t found any recipes for these filters.',
        )}
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
