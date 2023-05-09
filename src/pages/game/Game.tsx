import React from 'react';
import Board from '../../features/board';
import Players from '../../features/players';
import Ships from '../../features/ships';
import Grid from '../../common/Grid';

import boardConfig from '../../shared/board.json';
import playersConfig from '../../shared/players.json';

const Game = () => {
  return (
    <Grid
      container
      sx={{
        padding: [
          '0.5rem',
          '0.75rem',
          '1rem',
        ],
      }}
    >
      <Players playersConfig={playersConfig} />
      <Ships />
      <Board boardConfig={boardConfig} />
    </Grid>
  );
};

export default Game;
