import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';
import '../styles/Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const setLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  const dispatch = useDispatch();

  const onSubmitButtonClick = () => {
    setLocalStorage();
    const { history } = props;
    dispatch(saveEmail(email));
    history.push('/foods');
  };

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const min = 6;
    const validateEmail = emailRegex.test(email);
    const validatePassword = password.length > min;

    if (validateEmail && validatePassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);
  // w-100 h-100 d-flex justify-content-start align-items-center
  return (
    <section className="login-container">
      <div className="background-animation" />
      <form className="form-login">
        <div className="title-conteiner">
          <hr />
          <h3 className="text-center">Login</h3>
          <hr />
        </div>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="E-mail"
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Senha"
          autoComplete="off"
        />
        <button
          type="button"
          className="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ onSubmitButtonClick }
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default Login;
