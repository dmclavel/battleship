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
      justifyContent="center"
      columnGap={[0, 0, 1]}
    >
      <Grid
        flexDirection="column"
        order={[2, 2, 1]}
        width={['516px', '516px', '30%']}
        rowGap={3}
      >
        <Players playersConfig={playersConfig} />
        <Ships />
      </Grid>
      <Grid
        order={[1, 1, 2]}
      >
        <Board boardConfig={boardConfig} />
      </Grid>
    </Grid>
  );
};

export default Game;
