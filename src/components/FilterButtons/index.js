import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getFoodsByCategory, getDrinksByCategory, getFoodsByName,
  getDrinksByName, checkClickSearch } from '../../redux/actions';

function FilterButtons(props) {
  const { title } = props;
  const [takeCategory, setTakeCategory] = useState([]);
  const dispatch = useDispatch();

  const dispatchAll = () => {
    if (title === 'Foods') dispatch(getFoodsByName(''));
    else dispatch(getDrinksByName(''));
  };

  const dispatchFilter = (category) => {
    if (title === 'Foods') dispatch(getFoodsByCategory(category));
    else dispatch(getDrinksByCategory(category));
  };

  const handleClick = (category) => {
    if ((category === 'All') || (category === takeCategory)) dispatchAll();
    else dispatchFilter(category);
    checkClickSearch(true);
    if (category === takeCategory) setTakeCategory('');
    else setTakeCategory(category);
  };

  const { categories } = props;

  return (
    <>
      <button
        onClick={ () => handleClick('All') }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </button>
      { categories.map((cat, index) => (
        <button
          key={ index }
          data-testid={ `${cat}-category-filter` }
          type="button"
          onClick={ () => handleClick(cat) }
        >
          {cat}
        </button>
      )) }
    </>
  );
}

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default FilterButtons;
