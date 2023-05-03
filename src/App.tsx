import React, { type FC } from 'react';
import Board from './features/board/Board';
import Players from './features/players/Players';
import Ships from './features/ships/Ships';

import boardConfig from './shared/board.json';
import playersConfig from './shared/players.json';

const App: FC = () => {
  return (
    <>
      <Players playersConfig={playersConfig} />
      <Ships />
      <Board boardConfig={boardConfig} />
    </>
  );
};

export default App;
