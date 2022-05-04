import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Cards(props) {
  const history = useHistory();

  const { foods, drinks } = props;

  if (!drinks) {
    return foods.map((food, index) => {
      const maxIndex = 11;
      if (index <= maxIndex) {
        const idToNumber = Number(food.idMeal);
        return (
          <Card
            style={ { width: '18rem' } }
            key={ food.idMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/foods/${idToNumber}`) }
          >
            <Card.Img
              variant="top"
              src={ food.strMealThumb }
              alt="food"
              data-testid={ `${index}-card-img` }
            />
            <Card.Body>
              <Card.Title data-testid={ `${index}-card-name` }>
                {food.strMeal}

              </Card.Title>
              {/* <Card.Text>
                XXX
              </Card.Text> */}
            </Card.Body>
          </Card>
        );
      }
      return false;
    });
  }
  return drinks.map((drink, index) => {
    const maxIndex = 11;
    if (index <= maxIndex) {
      const idToNumber = Number(drink.idDrink);
      return (
        <Card
          style={ { width: '18rem' } }
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/drinks/${idToNumber}`) }
        >
          <Card.Img
            variant="top"
            src={ drink.strDrinkThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title data-testid={ `${index}-card-name` }>{drink.strDrink}</Card.Title>
            {/* <Card.Text>
              XXX
            </Card.Text> */}
          </Card.Body>
        </Card>
      );
    }
    return false;
  });
}
export default Cards;
