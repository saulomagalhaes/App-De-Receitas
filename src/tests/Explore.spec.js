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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explore'] });
    const inputProfile = screen.getByTestId(HEADER_PROFILE_TOP_BTN_ID);

    expect(inputProfile).toBeInTheDocument();
  });

  it('1.2 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explore'] });
    const title = screen.getByTestId(PAGE_TITLE_ID);

    expect(title).toBeInTheDocument();
  });
});

describe('2. Validação do botões ', () => {
  it(`2.1 - Verifica se existe botao para explorar comidas
  e para explorar bebidas `, () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explore'] });
    const foodBtn = screen.getByTestId('explore-foods');
    const drinkBtn = screen.getByTestId('explore-drinks');

    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it(`2.2 - Verifica se ao clicar no botao Explore Foods
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/explore'] });
    const foodBtn = screen.getByTestId('explore-foods');

    userEvent.click(foodBtn);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/explore/foods'));
  });

  it(`2.3 - Verifica se ao clicar no botao Explore Drinks
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/explore'] });
    const drinkBtn = screen.getByTestId('explore-drinks');

    userEvent.click(drinkBtn);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/explore/drinks'));
  });
});
