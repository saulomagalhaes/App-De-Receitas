import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getDrinksByName, getDrinksCategories } from '../redux/actions';
import FilterButtons from '../components/FilterButtons';
import '../styles/Drinks.scss';

function Drinks(props) {
  const { history } = props;
  const drinks = useSelector((state) => state.drinks.drinks);
  const categories = useSelector((state) => state.drinks.categories);
  const [arrayCats, setArrayCats] = useState([]);
  const checkClick = useSelector((state) => state.foods.checkClick);

  const redirectDetails = () => {
    const id = Number(drinks[0].idDrink);
    return history.push(`/drinks/${id}`);
  };

  const checkCard = () => {
    if (checkClick === false
      && drinks.length === 1) {
      return redirectDetails();
    }
    return <Cards drinks={ drinks } />;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrinksCategories());
    if (drinks.length === 0) dispatch(getDrinksByName(''));
  }, [dispatch]);

  useEffect(() => {
    if (categories !== null) {
      const magic = 5;
      const newCat = [...new Set(categories
        .reduce((cats, { strCategory }) => [...cats, strCategory], []))]
        .slice(0, magic);
      setArrayCats(newCat);
    }
  }, [categories]);

  return (
    <>
      <Header title="Drinks" />
      <div className="btn_filters-drinks">
        <FilterButtons
          categories={ arrayCats }
          title="Drinks"
        />
      </div>
      <div className="container-cards">
        {drinks !== null
          ? checkCard()
          : global.alert(
            'Sorry, we haven\'t found any recipes for these filters.',
          )}
      </div>
      <Footer />
    </>
  );
}
Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Drinks;
