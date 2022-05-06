import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
      <Button
        variant="secondary"
        size="sm"
        className="ml-2"
        onClick={ () => handleClick('All') }
        data-testid="All-category-filter"
      >
        All
      </Button>
      { categories.map((cat, index) => (
        <Button
          key={ index }
          data-testid={ `${cat}-category-filter` }
          type="button"
          onClick={ () => handleClick(cat) }
          variant="secondary"
          size="sm"
          className="ml-2"
        >
          {cat}
        </Button>
      )) }
    </>
  );
}

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default FilterButtons;
