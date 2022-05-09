import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
  HEADER_PROFILE_TOP_BTN_ID,
  PAGE_TITLE_ID,
  ROUTE_FOODS_INGREDIENTS,
} from './helpers/constants';

describe('1. Validação do componente Header ', () => {
  it('1.1 - Verifica se existe botão para ir para a página de perfil ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/explore'] });
    const inputProfile = screen.getByTestId(HEADER_PROFILE_TOP_BTN_ID);

    expect(inputProfile).toBeInTheDocument();
  });

  it('1.2 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_FOODS_INGREDIENTS] });
    const title = screen.getByTestId(PAGE_TITLE_ID);

    expect(title).toBeInTheDocument();
  });
});

describe('2. Validação dos cards ', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('2.1 - Verifica se os cards são renderizados', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_FOODS_INGREDIENTS] });
    const nCards = 11;
    const card1 = await screen.findByTestId('0-ingredient-card');

    for (let i = 1; i <= nCards; i += 1) {
      const card = screen.getByTestId(`${i}-ingredient-card`);
      expect(card).toBeInTheDocument();
    }
    expect(card1).toBeInTheDocument();
  });

  it('2.2 - Verifica se ao clicar na imagem é redirecionado', async () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [ROUTE_FOODS_INGREDIENTS] });
    const img = await screen.findByTestId('0-card-img');

    userEvent.click(img);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/foods'));
  });
});
