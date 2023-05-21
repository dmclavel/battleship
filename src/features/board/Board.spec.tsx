import React from 'react';
import { render, screen, within } from 'test-utils';

import Board from './Board';

import boardConfig from '../../shared/board.json';

const renderBoardComponent = (config = boardConfig) => render(
  <Board boardConfig={config} hasWon={false} />,
);

describe('Board', () => {
  it('should render 10 x 10 squares', async () => {
    renderBoardComponent();

    const battleshipBoard = screen.getByTestId('battleships-board');
    expect(battleshipBoard).toBeInTheDocument();

    const boardSquares = await within(battleshipBoard).findAllByRole('button');
    expect(boardSquares).toHaveLength(100);
  });
});