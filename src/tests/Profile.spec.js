import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
  HEADER_PROFILE_TOP_BTN_ID,
  PAGE_TITLE_ID,
} from './helpers/constants';

describe('1. Validação do componente Header ', () => {
  it('1.1 - Verifica se existe botão para ir para a página de perfil ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const inputProfile = screen.getByTestId(HEADER_PROFILE_TOP_BTN_ID);

    expect(inputProfile).toBeInTheDocument();
  });

  it('1.2 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const title = screen.getByTestId(PAGE_TITLE_ID);

    expect(title).toBeInTheDocument();
  });
});

describe('2. Validação dos botões', () => {
  it(`2.1 - Verifica se existe botão para ir para 
  a página de receitas finalizadas e o email do user `, () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const recipeDoneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logouBtn = screen.getByTestId('profile-logout-btn');
    const email = screen.getByTestId('profile-email');

    expect(recipeDoneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logouBtn).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it(`2.2 - Verifica se ao clicar no botao Done Recipes 
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/profile'] });
    const recipeDoneBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(recipeDoneBtn);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/done-recipes'));
  });

  it(`2.3 - Verifica se ao clicar no botao Favorite Recipes
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/profile'] });
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteBtn);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/favorite-recipes'));
  });

  it(`2.4 - Verifica se ao clicar no botao Logout
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/profile'] });
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutBtn);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/'));
  });
});
