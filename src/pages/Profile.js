import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Perfil.css';

function Profile({ history }) {
  const email = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email
    : '';

  const funcLogoutAndRedirect = () => { // desloga e redireciona para login
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <section className="perfil-container">
        <p data-testid="profile-email">{email}</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          className="big-button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          className="big-button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          className="big-button"
          type="button"
          onClick={ () => funcLogoutAndRedirect() }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Profile;
