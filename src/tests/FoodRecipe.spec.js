import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import {
//   HEADER_PROFILE_TOP_BTN_ID,
//   PAGE_TITLE_ID,
//   ROUTE_FOODS_INGREDIENTS,
// } from './helpers/constants';

describe('1 - Food Recipe', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`1.1 - Verifica se existe um botão de compartilhar, 
  um botão de favoritar e um botao de finalizar`, async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods/52977'] });
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const finishBtn = await screen.findByTestId('start-recipe-btn');

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });

  it('1.2 - Verifica se o botão de Iniciar Receita funciona', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods/52977'] });
    const startBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startBtn);
    waitForExpect(() => expect(pathname).toBe('/foods/52977/in-progress'));
  });
});
