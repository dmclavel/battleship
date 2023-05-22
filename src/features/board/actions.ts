import { initializeBoard, updateImportInfo, updateBoard } from './boardSlice';
import { updatePlayer } from '../players/playersSlice';
import { initializeShips, updateShips } from '../ships/shipsSlice';

import type { Dispatch } from '@reduxjs/toolkit';
import type { AppThunk, UpdateGamePayload } from '../../shared/types/redux';
import type boardConfig from '../../shared/board.json';

type ErrorState = {
  isError: boolean;
  message?: string;
};
type BoardConfigValidation = Promise<ErrorState>;

const validateBoardConfig = (
  boardConfigObj: typeof boardConfig
): BoardConfigValidation =>
  new Promise((resolve, reject) => {
    const { shipTypes, layout } = boardConfigObj;

    layout.forEach(({ ship, positions }) => {
      const shipTypeInfo = shipTypes[ship as keyof typeof shipTypes];
      if (shipTypeInfo === undefined)
        reject({ isError: true, message: 'Ship type is invalid!' });

      if (!('size' in shipTypeInfo))
        reject({ isError: true, message: '"size" property missing!' });

      if (!('count' in shipTypeInfo))
        reject({ isError: true, message: '"count" property missing!' });

      if (shipTypeInfo.size !== positions.length)
        reject({
          isError: true,
          message: `Coordinates occupy ${positions.length} squares but expected ship size is ${shipTypeInfo.size}.`,
        });

      const shipLengthOnBoard = layout.filter(
        ({ ship: ship2 }) => ship2 === ship
      ).length;
      if (shipTypeInfo.count !== shipLengthOnBoard)
        reject({
          isError: true,
          message: `Ship count expected is ${shipTypeInfo.count}, but actual ship count is ${shipLengthOnBoard}.`,
        });
    });

    resolve({ isError: false });
  });

const readBoardConfig = (boardConfigObj: typeof boardConfig): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await validateBoardConfig(boardConfigObj);

      dispatch(updateImportInfo({ isError: false, message: '' }));
      dispatch(initializeBoard());
      dispatch(initializeShips(boardConfigObj));
    } catch (error) {
      dispatch(updateImportInfo(error as ErrorState));
    }
  };
};

const updateGameState = (boardUpdateInfo: UpdateGamePayload): AppThunk => {
  return (dispatch: Dispatch, getState) => {
    const state = getState();
    const coordinates = `${boardUpdateInfo.rowIndex},${boardUpdateInfo.columnIndex}`;
    const shipType = state.shipsReducer.loadedShips[coordinates];
    dispatch(updateBoard(boardUpdateInfo));
    dispatch(updateShips(boardUpdateInfo));
    if (typeof state.boardReducer.activePlayerId === 'string' && shipType) {
      dispatch(
        updatePlayer({
          playerId: state.boardReducer.activePlayerId,
          point: 1,
        })
      );
    }
  };
};

export { readBoardConfig, updateGameState, ErrorState };
