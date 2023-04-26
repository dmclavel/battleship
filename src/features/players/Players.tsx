import React, { useEffect } from 'react';
import { connect, type ConnectedProps } from 'react-redux';
import { initializePlayersList } from './actions';
import playersConfig from '../../shared/players.json';

import type { FC } from 'react';
import type { AppDispatch } from '../../shared/store';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatchInitializePlayers: (players: typeof playersConfig.players) =>
    dispatch(initializePlayersList(players)),
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type BoardProps = PropsFromRedux;

const Players: FC<BoardProps> = ({ dispatchInitializePlayers }) => {
  useEffect(() => {
    dispatchInitializePlayers(playersConfig.players);
  }, []);

  return <div>Players</div>;
};

export default connector(Players);
