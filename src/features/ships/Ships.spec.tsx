import React from 'react';
import { render, screen } from 'test-utils';

import Ships from './Ships';
import Board from '../board';

import boardConfig from '../../shared/board.json';

const renderShips = (config = boardConfig) =>
  render(
    <>
      <Board boardConfig={config} hasWon={false} />
      <Ships />
    </>
  );

describe('Ships', () => {
  it('should render ships based on board.json', async () => {
    renderShips();

    const asyncProcesses: Array<Promise<Array<HTMLElement>>> = [];
    Object.keys(boardConfig.shipTypes).forEach((shipType) => {
      asyncProcesses.push(screen.findAllByAltText(shipType));
    });

    const resolvedElements = await Promise.all(asyncProcesses);
    resolvedElements.forEach((elements) => {
      elements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
