import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';

import {
  HEADER_PROFILE_TOP_BTN_ID,
  HEADER_SEARCH_TOP_BTN_ID,
  PAGE_TITLE_ID,

} from './helpers/constants';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('1. Validação do componente Header ', () => {
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
