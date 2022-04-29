import React from 'react';
import './styles.scss';

function CardsDone() {
  return (
    <section className="cards">
      <img
        data-testid="0-horizontal-image"
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        alt="food"
      />
      <div>
        <button data-testid="0-horizontal-share-btn" type="button">
          Share
        </button>
        <p data-testid="0-horizontal-top-text">Food</p>
        <p data-testid="0-horizontal-name">Chicken and Potatoes</p>
        <p data-testid="0-horizontal-done-date">Done on: 12/12/2019</p>
        <p data-testid="0-horizontal-tag-1-horizontal-tag">#Chicken</p>
        <p data-testid="0-horizontal-tag-2-horizontal-tag">#Potatoes</p>
      </div>
    </section>
  );
}

export default CardsDone;
