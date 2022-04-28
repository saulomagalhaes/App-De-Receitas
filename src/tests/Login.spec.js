import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  EMAIL_INPUT_ID,
  PASSWORD_INPUT_ID,
  LOGIN_SUBMIT_BTN_ID,
  USER_ADDRESS_EMAIL,
  USER_ADDRESS_PASSWORD,
  USER_ADDRESS_EMAIL_OBJ,
} from './helpers/constants';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('1. Validação da página Loginn ', () => {
  it(`1.1 - Verifica se existe campos para preencher email e senha 
  e um botão para login`, () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_ID);
    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputLogin).toBeInTheDocument();
  });

  it('1.2 - Verifica se o botão de login está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);
    expect(inputLogin).toBeDisabled();
  });

  it(`1.3 - Verifica se o botão de login habilita ao preencher 
  o campo corretamente`, () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_ID);

    userEvent.type(inputEmail, USER_ADDRESS_EMAIL);
    userEvent.type(inputPassword, USER_ADDRESS_PASSWORD);

    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);
    expect(inputLogin).toBeEnabled();
  });

  it('1.4 - Verifica se o botão de login desabilita ao preencher incorretamente', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_ID);

    userEvent.type(inputEmail, USER_ADDRESS_EMAIL);
    userEvent.type(inputPassword, '123');

    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);
    expect(inputLogin).toBeDisabled();
  });

  it('1.5 - Verifica se o botão de login desabilita ao preencher apenas o email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT_ID);

    userEvent.type(inputEmail, USER_ADDRESS_EMAIL);

    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);
    expect(inputLogin).toBeDisabled();
  });

  it('1.6 - Verifica se o botão de login desabilita ao preencher apenas a senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_ID);

    userEvent.type(inputPassword, USER_ADDRESS_PASSWORD);

    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);
    expect(inputLogin).toBeDisabled();
  });

  it(`1.7 - Verifica se ao preencher todos os campos corretamente e clicar 
  no botão de login, o usuário é redirecionado para a pagina /foods
  e um objeto é salvo no localStorage`, () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_ID);

    userEvent.type(inputEmail, USER_ADDRESS_EMAIL);
    userEvent.type(inputPassword, USER_ADDRESS_PASSWORD);

    const inputLogin = screen.getByTestId(LOGIN_SUBMIT_BTN_ID);
    userEvent.click(inputLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');

    expect(localStorage.getItem(USER_ADDRESS_EMAIL_OBJ)).toBeTruthy();
  });
});
