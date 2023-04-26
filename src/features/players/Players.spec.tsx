import React from 'react';
import { screen, render } from 'test-utils';

import Players from './Players';

const samplePlayersConfig = {
  players: [
    'id-1',
    'id-2',
  ],
};

const renderPlayers = () => render(
  <Players playersConfig={samplePlayersConfig} />,
);

describe('Players', () => {
  beforeEach(() => {
    renderPlayers();
  });

  it('should render Players 1 & 2', () => {
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  it('should render default scores for Players 1 & 2', () => {
    expect(screen.getByTestId('id-1-score').innerHTML).toEqual('0');
    expect(screen.getByTestId('id-2-score').innerHTML).toEqual('0');
  });
});