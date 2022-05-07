import React from 'react';
import { screen } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
  ROUTE_IN_PROGRESS,
} from './helpers/constants';

const BTN0_ID = '0-ingredient-step';

describe('1 - FoodProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`1.1 - Desenvolva a tela de maneira que contenha uma imagem da receita, 
  seu titulo, sua categoria (ou se a bebida é alcoólica ou não) uma lista de 
  ingredientes com suas respectivas quantidades e suas instruções`, async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_IN_PROGRESS] });
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

  it('1.2 - Verifica se ao clicar em um checkbox uma classe é adicionada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [ROUTE_IN_PROGRESS] });
    const checkbox = await screen.findByTestId(BTN0_ID);
    expect(checkbox).not.toHaveClass('checkedItem');
    userEvent.click(checkbox);
    waitForExpect(() => expect(checkbox).toHaveClass('checkedItem'));
  });

  it('1.3 - Verifica se ao finalizar a receita a pagina é redirecionada', async () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/foods/52771/in-progress'] });
    const checkbox0 = await screen.findByTestId(BTN0_ID);
    userEvent.click(checkbox0);
    const finishBtn = screen.getByTestId('finish-recipe-btn');

    const maxN = 7;
    for (let i = 1; i <= maxN; i += 1) {
      const checkbox = screen.getByTestId(`${i}-ingredient-step`);
      userEvent.click(checkbox);
      expect(finishBtn).toBeDisabled();
    }

    waitForExpect(() => expect(finishBtn).not.toBeDisabled());

    userEvent.click(finishBtn);
    waitForExpect(() => expect(history.location.pathname).toBe('/done-recipes'));
  });
});
