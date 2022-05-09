import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
  DRINK_IN_PROGRESS,
} from './helpers/constants';

const BTN0_ID = '0-ingredient-step';

describe('1 - DrinkProgress', () => {
  const originalClipboard = { ...global.navigator.clipboard };

  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));

    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(
        (data) => { clipboardData = data; },
      ),
      readText: jest.fn(
        () => clipboardData,
      ),
    };
    global.navigator.clipboard = mockClipboard;
  });
  afterEach(() => {
    window.localStorage.clear();
    global.navigator.clipboard = originalClipboard;
    jest.clearAllMocks();
  });

  it(`1.1 - Desenvolva a tela de maneira que contenha uma imagem da receita, 
  seu titulo, sua categoria (ou se a bebida é alcoólica ou não) uma lista de 
  ingredientes com suas respectivas quantidades e suas instruções`, async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [DRINK_IN_PROGRESS] });
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeIngredients = await screen.findByTestId(BTN0_ID);
    const recipeInstructions = await screen.findByTestId('instructions');

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredients).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
  });

  it('1.2 - Verifica se ao clicar em um checkbox uma linha é adicionada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [DRINK_IN_PROGRESS] });
    const checkbox = await screen.findByTestId(BTN0_ID);
    userEvent.click(checkbox);
    expect(checkbox).toHaveClass('checkedItem');
    userEvent.click(checkbox);
    expect(checkbox).not.toHaveClass('checkedItem');
  });

  it('1.3 - Verifica se ao finalizar a receita a pagina é redirecionada', async () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: [DRINK_IN_PROGRESS] });
    waitForExpect(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    });

    userEvent.click(await screen.findByTestId(BTN0_ID));
    userEvent.click(screen.getByTestId('1-ingredient-step'));
    userEvent.click(screen.getByTestId('2-ingredient-step'));

    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');

    expect(await screen.findByTestId('page-title')).toBeInTheDocument();
  });

  it(`1.4 - Verifica se ao clicar para compartilhar o link para os detalhes
  da receita é copiado para o clipboard e aparece uma mensagem
  Link Copied!`, async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [DRINK_IN_PROGRESS] });
    const share = await screen.findByTestId('share-btn');
    userEvent.click(share);

    const string = 'http://localhost:3000/drinks/178319';

    expect(navigator.clipboard.readText()).toBe(string);
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(string);

    const linkCopied = await screen.findByText(/link copied!/i);
    waitForExpect(() => expect(linkCopied).toBeInTheDocument());
  });
});
