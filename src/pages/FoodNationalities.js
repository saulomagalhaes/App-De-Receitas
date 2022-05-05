import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cards from '../components/Cards';
import {
  getFoodNationalities,
  getFoodsByName,
  getFoodsByNationality } from '../redux/actions';

function FoodNationalities() {
  const foods = useSelector((state) => state.foods.meals);
  const nationalities = useSelector((state) => state.foods.nationalities);
  const [arrayNat, setArrayNat] = useState([]);
  const [selectedNation, setSelectedNation] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodNationalities());
    dispatch(getFoodsByName(''));
  }, [dispatch]);

  useEffect(() => {
    if (nationalities !== null) {
      const newArr = [...new Set(nationalities
        .reduce((areas, { strArea }) => [...areas, strArea], ['All']))];
      setArrayNat(newArr);
      console.log(newArr);
    }
  }, [nationalities]);

  useEffect(() => {
    if (selectedNation === 'All') dispatch(getFoodsByName(''));
    else dispatch(getFoodsByNationality(selectedNation));
  }, [selectedNation]);

  if (arrayNat.length > 0) {
    return (
      <>
        <Header title="Explore Nationalities" />
        <div>
          <label htmlFor="nationalities">
            <select
              className="nationalities"
              id="nationalities"
              name="nationalities"
              value={ selectedNation }
              data-testid="explore-by-nationality-dropdown"
              onChange={ (e) => setSelectedNation(e.target.value) }
            >
              { arrayNat.map((nattio, index) => (
                <option
                  key={ index }
                  data-testid={ `${nattio}-option` }
                  value={ nattio }
                >
                  { nattio }
                </option>
              )) }
            </select>
          </label>
        </div>
        {foods && <Cards foods={ foods } /> }
        <Footer />
      </>
    );
  }

  return null;
}

export default FoodNationalities;
