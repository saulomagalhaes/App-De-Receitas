import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('1. Validação do componente NotFound ', () => {
  it('1.1 - Verifica se existe título da página', () => {
    renderWithRouterAndRedux(<App />,
      { initialEntries: ['/explore/drinks/nationalities'] });
    const title = screen.getByText('Not Found');
    expect(title).toBeInTheDocument();
  });
});
