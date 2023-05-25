import { initializeBoard, updateImportInfo, updateBoard } from './boardSlice';
import { updatePlayer } from '../players/playersSlice';
import { initializeShips, updateShips } from '../ships/shipsSlice';

import type { Dispatch } from '@reduxjs/toolkit';
import type { AppThunk, UpdateGamePayload } from '../../shared/types/redux';
import type { BoardConfigType } from '../../shared/types/board';

type ErrorState = {
  isError: boolean;
  message?: string;
};
type BoardConfigValidation = Promise<ErrorState>;

const validateBoardConfig = (
  boardConfigObj: BoardConfigType
): BoardConfigValidation =>
  new Promise((resolve, reject) => {
    const { shipTypes, layout } = boardConfigObj;
    const tempStorage: { [key: string]: 1 } = {};

    layout.forEach(({ ship, positions }) => {
      const shipTypeInfo = shipTypes[ship as keyof typeof shipTypes];
      if (shipTypeInfo === undefined)
        reject({ isError: true, message: 'Ship type is invalid!' });

      if (shipTypeInfo && !('size' in shipTypeInfo))
        reject({ isError: true, message: '"size" property missing!' });

      if (shipTypeInfo && !('count' in shipTypeInfo))
        reject({ isError: true, message: '"count" property missing!' });

      if (shipTypeInfo && shipTypeInfo.size !== positions.length)
        reject({
          isError: true,
          message: `Coordinates occupy ${positions.length} squares but expected ship size is ${shipTypeInfo.size}.`,
        });

      const shipLengthOnBoard = layout.filter(
        ({ ship: ship2 }) => ship2 === ship
      ).length;
      if (shipTypeInfo && shipTypeInfo.count !== shipLengthOnBoard)
        reject({
          isError: true,
          message: `Ship count expected is ${shipTypeInfo.count}, but actual ship count is ${shipLengthOnBoard}.`,
        });

      positions.forEach((position) => {
        if (tempStorage[position.join(',')]) {
          reject({
            isError: true,
            message: `Ships overlap on ${position} coordinates.`,
          });
        }
        tempStorage[position.join(',')] = 1;
      });
    });

    resolve({ isError: false });
  });

const readBoardConfig = (boardConfigObj: BoardConfigType): AppThunk => {
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
