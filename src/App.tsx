import React, { type FC } from 'react';
import Board from './features/board/Board';
import Players from './features/players/Players';

import boardConfig from './shared/board.json';
import playersConfig from './shared/players.json';

const App: FC = () => {
  return (
    <>
      <Players playersConfig={playersConfig} />
      <Board boardConfig={boardConfig} />
    </>
  );
};

export default App;
