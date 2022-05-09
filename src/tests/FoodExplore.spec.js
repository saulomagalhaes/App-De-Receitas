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
  ROUTE_EXPLORE_FOODS,
} from './helpers/constants';

describe('1. Validação do componente Header ', () => {
  it('1.1 - Verifica se existe botão para ir para a página de perfil ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_EXPLORE_FOODS] });
    const inputProfile = screen.getByTestId(HEADER_PROFILE_TOP_BTN_ID);

    expect(inputProfile).toBeInTheDocument();
  });

  it('1.2 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_EXPLORE_FOODS] });
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
  it('2.1 - Verifica se existe 3 botoes na pagina ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_EXPLORE_FOODS] });
    const byIngredient = screen.getByTestId('explore-by-ingredient');
    const byNationality = screen.getByTestId('explore-by-nationality');
    const surprise = screen.getByTestId('explore-surprise');

    expect(byIngredient).toBeInTheDocument();
    expect(byNationality).toBeInTheDocument();
    expect(surprise).toBeInTheDocument();
  });

  it(`2.2 - Verifica se ao clicar no botao By Ingredient
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [ROUTE_EXPLORE_FOODS] });
    const byIngredient = screen.getByTestId('explore-by-ingredient');

    userEvent.click(byIngredient);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/explore/foods/ingredients'));
  });

  it(`2.3 - Verifica se ao clicar no botao By Nationality
  a página é redireciona `, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [ROUTE_EXPLORE_FOODS] });
    const byNationality = screen.getByTestId('explore-by-nationality');

    userEvent.click(byNationality);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/explore/foods/nationalities'));
  });

  it(`2.4 - Verifica se ao clicar no botao Surprise me!
  a página é redirecionada`, () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [ROUTE_EXPLORE_FOODS] });
    const surprise = screen.getByTestId('explore-surprise');

    userEvent.click(surprise);

    const pathname = history.location;
    waitForExpect(() => expect(pathname).toBe('/foods/52771'));
  });
});
