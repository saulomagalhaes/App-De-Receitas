import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getFoodsByName, getFoodsCategories } from '../redux/actions';
import FilterButtons from '../components/FilterButtons';

function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.foods.meals);
  const categories = useSelector((state) => state.foods.categories);
  const [arrayCats, setArrayCats] = useState([]);
  const [checkClickFood, setCheckClickFood] = useState(false);

  const redirectDetails = () => {
    const id = Number(foods[0].idMeal);
    return history.push(`/foods/${id}`);
  };

  const checkCard = () => {
    if (checkClickFood === false
      && foods.length === 1) {
      return redirectDetails();
    }
    if (checkClickFood === false
      && foods.length > 1) {
      return <Cards foods={ foods } />;
    }
    if (checkClickFood === true
      && foods.length === 1) {
      return <Cards foods={ foods } />;
    }
    return <Cards foods={ foods } />;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodsByName(''));
    dispatch(getFoodsCategories());
  }, []);

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
      <Header title="Foods" checkButton={ setCheckClickFood } />
      <div>
        <Button
          variant="secondary"
          size="sm"
          className="ml-2"
          onClick={ () => dispatch(getFoodsByName('')) }
        >
          All
        </Button>
        <FilterButtons
          categories={ arrayCats }
          title="Foods"
          checkButton={ setCheckClickFood }
        />
      </div>
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
