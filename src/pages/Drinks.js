import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getDrinksByName, getDrinksCategories } from '../redux/actions';
import FilterButtons from '../components/FilterButtons';

function Drinks(props) {
  const { history } = props;
  const drinks = useSelector((state) => state.drinks.drinks);
  const categories = useSelector((state) => state.drinks.categories);
  const [arrayCats, setArrayCats] = useState([]);

  const redirectDetails = () => {
    const id = Number(drinks[0].idDrink);
    return history.push(`/drinks/${id}`);
  };

  const checkCard = () => (drinks.length === 1
    ? redirectDetails()
    : <Cards drinks={ drinks } />
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrinksByName(''));
    dispatch(getDrinksCategories());
  }, []);

  useEffect(() => {
    if (categories !== null) {
      console.log(categories);
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
      <div>
        <Button
          variant="secondary"
          size="sm"
          className="ml-2"
          // onClick={ () => setAll('all') }
        >
          All
        </Button>
        <FilterButtons categories={ arrayCats } />
      </div>
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
