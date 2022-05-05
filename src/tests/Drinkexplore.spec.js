import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
  HEADER_PROFILE_TOP_BTN_ID,
  PAGE_TITLE_ID,
  ROUTE_EXPLORE_DRINKS,
} from './helpers/constants';

describe('1. Validação do componente Header ', () => {
  it('1.1 - Verifica se existe botão para ir para a página de perfil ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_EXPLORE_DRINKS] });
    const inputProfile = screen.getByTestId(HEADER_PROFILE_TOP_BTN_ID);

    expect(inputProfile).toBeInTheDocument();
  });

  it('1.2 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_EXPLORE_DRINKS] });
    const title = screen.getByTestId(PAGE_TITLE_ID);

    expect(title).toBeInTheDocument();
  });
});
describe('2. Validação do botoes ', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('2.1 - Verifica se existe dois botões na página ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_EXPLORE_DRINKS] });
    const byIngredient = screen.getByTestId('explore-by-ingredient');
    const surprise = screen.getByTestId('explore-surprise');

    expect(byIngredient).toBeInTheDocument();
    expect(surprise).toBeInTheDocument();
  });

  it(`2.2 - Verifica se ao clicar no botao By Ingredient
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [ROUTE_EXPLORE_DRINKS] });
    const byIngredient = screen.getByTestId('explore-by-ingredient');

    userEvent.click(byIngredient);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/explore/drinks/ingredients'));
  });

  it(`2.3 - Verifica se ao clicar no botao Surprise me!
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [ROUTE_EXPLORE_DRINKS] });
    const surprise = screen.getByTestId('explore-surprise');

    userEvent.click(surprise);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/drinks/178319'));
  });
});
