import React, { type FC } from 'react';
import Board from './features/board/Board';
import Players from './features/players/Players';

const App: FC = () => {
  return (
    <>
      <Players />
      <Board />
    </>
  );
};

export default App;
