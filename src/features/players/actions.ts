import { initializePlayers } from './playersSlice';
import { updateActivePlayer } from '../board/boardSlice';

import type { Dispatch } from '@reduxjs/toolkit';
import type { AppThunk } from '../../shared/types/redux';

const initializePlayersList = (players: Array<string>): AppThunk => {
  return (dispatch: Dispatch) => {
    dispatch(initializePlayers(players));
    dispatch(updateActivePlayer(players[0]));
  };
};

export { initializePlayersList };
