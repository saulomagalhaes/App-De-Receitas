import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { getFoodsByName, getFoodsCategories } from '../redux/actions';
import FilterButtons from '../components/FilterButtons';
import '../styles/Foods.scss';

function Foods(props) {
  const { history } = props;
  const foods = useSelector((state) => state.foods.meals);
  const categories = useSelector((state) => state.foods.categories);
  const checkClick = useSelector((state) => state.foods.checkClick);
  const [arrayCats, setArrayCats] = useState([]);

  const redirectDetails = () => {
    const id = Number(foods[0].idMeal);
    return history.push(`/foods/${id}`);
  };

  const checkCard = () => {
    if (checkClick === false
      && foods.length === 1) {
      return redirectDetails();
    }
    return <Cards foods={ foods } />;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodsCategories());
    if (foods.length === 0) dispatch(getFoodsByName(''));
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
    <section className="main-page">
      <Header title="Foods" />
      <div className="btn_filters-foods">
        <FilterButtons
          categories={ arrayCats }
          title="Foods"
        />
      </div>
      <div className="container-cards">
        {foods !== null
          ? checkCard()
          : global.alert(
            'Sorry, we haven\'t found any recipes for these filters.',
          )}
      </div>
      <Footer />
    </section>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
