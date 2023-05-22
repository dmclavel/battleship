import React, { type FC } from 'react';

import Navbar from './components/Navbar';
import Game from './pages/game';

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Game />
    </>
  );
};

export default App;
