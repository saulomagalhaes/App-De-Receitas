import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import {
  HEADER_PROFILE_TOP_BTN_ID,
  HEADER_SEARCH_TOP_BTN_ID,
  PAGE_TITLE_ID,
} from './helpers/constants';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('1. Validação do Header e do campo de pesquisa ', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`1.1 - Verifica se existe botão para ir para a página de perfil e 
  botão para ir para a página de busca`, () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const inputProfile = screen.getByTestId(HEADER_PROFILE_TOP_BTN_ID);
    const inputSearch = screen.getByTestId(HEADER_SEARCH_TOP_BTN_ID);

    expect(inputProfile).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
  });

  it('1.2 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const title = screen.getByTestId(PAGE_TITLE_ID);

    expect(title).toBeInTheDocument();
  });

  it(`1.3 - Verifica se ao fazer uma pesquisa e vier somente uma receita 
  redireciona direto para página de detalhes da receita`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });

    const inputSearch = screen.getByTestId(HEADER_SEARCH_TOP_BTN_ID);
    userEvent.click(inputSearch);

    const searchInput = await screen.findByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(execSearchBtn);

    const { pathname } = history.location;
    waitForExpect(() => expect(pathname).toBe('/foods/52771'));
  });

  it(`1.4 - Verifica se ao fazer uma pesquisa e vier mais de uma receita
  renderiza as receitas na tela`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const inputSearch = screen.getByTestId(HEADER_SEARCH_TOP_BTN_ID);
    userEvent.click(inputSearch);

    const searchInput = await screen.findByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(radioName);
    userEvent.click(execSearchBtn);

    const nCards = 11;
    const card1 = await screen.findByTestId('0-recipe-card');

    for (let i = 1; i <= nCards; i += 1) {
      const card = screen.getByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
    }
    expect(card1).toBeInTheDocument();

    const { pathname } = history.location;
    waitForExpect(() => expect(pathname).toBe('/foods'));
  });
});

describe('2. Validação dos cards e dos filtros de categoria ', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('2.1 - Verifica se existe 12 cards na página foods', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const nCards = 11;
    const card1 = await screen.findByTestId('0-recipe-card');

    for (let i = 1; i <= nCards; i += 1) {
      const card = screen.getByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
    }
    expect(card1).toBeInTheDocument();
  });

  it('2.2 - Verifica se existe filtros de categorias', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const filters = [
      'All-category-filter',
      'Beef-category-filter',
      'Breakfast-category-filter',
      'Chicken-category-filter',
      'Dessert-category-filter',
      'Goat-category-filter',
    ];

    const btn1 = await screen.findByTestId(filters[0]);
    const btn2 = await screen.findByTestId(filters[1]);
    const btn3 = await screen.findByTestId(filters[2]);
    const btn4 = await screen.findByTestId(filters[3]);
    const btn5 = await screen.findByTestId(filters[4]);
    const btn6 = await screen.findByTestId(filters[5]);

    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
    expect(btn3).toBeInTheDocument();
    expect(btn4).toBeInTheDocument();
    expect(btn5).toBeInTheDocument();
    expect(btn6).toBeInTheDocument();
  });

  it(`2.3 - Verifica se ao clicar na categoria All faz uma nova 
  chamada na API`, async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const btn1 = await screen.findByTestId('All-category-filter');
    userEvent.click(btn1);

    expect(global.fetch).toHaveBeenCalled();
  });
});

describe('3. Validação do footer ', () => {
  it('3.1 - Verifica se existe um footer com três botões', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnFoods = screen.getByTestId('food-bottom-btn');
    const btnExplore = screen.getByTestId('explore-bottom-btn');

    expect(btnDrinks).toBeInTheDocument();
    expect(btnFoods).toBeInTheDocument();
    expect(btnExplore).toBeInTheDocument();
  });
});
