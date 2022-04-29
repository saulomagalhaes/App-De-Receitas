import React from 'react';
import { Button } from 'react-bootstrap';

function FilterButtons(props) {
  const { categories } = props;
  return categories.map((cat, index) => (
    <Button
      key={ index }
      data-testid={ `${cat}-category-filter` }
      // onClick={ () => setAll('all') }
      variant="secondary"
      size="sm"
      className="ml-2"
    >
      {cat}
    </Button>
  ));
}

export default FilterButtons;
