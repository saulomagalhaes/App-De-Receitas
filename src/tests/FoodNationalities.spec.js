import React from 'react';
import { screen } from '@testing-library/react';
// import waitForExpect from 'wait-for-expect';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  HEADER_PROFILE_TOP_BTN_ID,
  HEADER_SEARCH_TOP_BTN_ID,
  PAGE_TITLE_ID,

} from './helpers/constants';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('1. Validação do componente Header ', () => {
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

  it('1.3 - Verifica se ao carregar a pagina não aparece campo de busca', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/foods'] });
    const inputSearch = screen.queryByTestId('search-input');

    expect(inputSearch).not.toBeInTheDocument();
  });
});

describe('2. Validação do dropdown', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('2.1 - Verifica se existe um dropdown', () => {
    renderWithRouterAndRedux(<App />, { initialEntries:
      ['/explore/foods/nationalities'] });
    const dropdown = screen.getByTestId('explore-by-nationality-dropdown');

    expect(dropdown).toBeInTheDocument();
  });

  // it('2.2 - Verifica se ao selecionar uma opcao é feita uma chamada na API', async () => {
  //   renderWithRouterAndRedux(<App />, { initialEntries:
  //     ['/explore/foods/nationalities'] });

  //   userEvent.selectOptions(
  //     // Find the select element, like a real user would.
  //     screen.getByRole('combobox'),
  //     // Find and select the Ireland option, like a real user would.
  //     await screen.findByRole('option', { name: 'Portuguese' }),
  //   );
  //   waitForExpect(() => expect(screen.getByRole('option',
  //     { name: 'Portuguese' }).selected).toBe(true));
  // });
});
