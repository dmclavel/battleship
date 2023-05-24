import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import Game from './Game';

import type { GameProps } from './Game';
import type { RenderResult } from 'test-utils';

type RenderFn = (props: GameProps) => RenderResult;

const renderGame: RenderFn = ({ boardConfig, playersConfig }) =>
  render(<Game boardConfig={boardConfig} playersConfig={playersConfig} />);

const customBoardConfig = {
  shipTypes: {
    destroyer: { size: 2, count: 1 },
  },
  layout: [
    {
      ship: 'destroyer',
      positions: [
        [0, 0],
        [0, 1],
      ],
    },
  ],
};

const customPlayersConfig = {
  players: ['unique-id-1'],
};

describe('Game', () => {
  it('should not load board when config file is invalid', async () => {
    renderGame({
      boardConfig: {
        ...customBoardConfig,
        shipTypes: { destroyer: { size: 1, count: 1 } },
      },
      playersConfig: customPlayersConfig,
    });

    const errorModal = await screen.findByTestId('error-modal');
    expect(errorModal).toBeInTheDocument();
  });

  it('should have a winning state', async () => {
    renderGame({
      boardConfig: customBoardConfig,
      playersConfig: customPlayersConfig,
    });

    const boardSquares: Array<Promise<HTMLElement>> = [];
    [
      [0, 0],
      [0, 1],
    ].forEach((coordinates) => {
      boardSquares.push(
        screen.findByTestId(`board-square-${coordinates.join(',')}`)
      );
    });

    const foundSquares = await Promise.all(boardSquares);
    foundSquares.forEach((square) => {
      fireEvent.click(square);
    });

    const winningModal = await screen.findByTestId('winning-modal');
    expect(winningModal).toBeInTheDocument();
  });
});
