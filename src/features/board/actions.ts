import { initializeBoard, updateImportInfo, updateBoard } from './boardSlice';
import { updatePlayer } from '../players/playersSlice';

import type { Dispatch } from '@reduxjs/toolkit';
import type boardConfig from '../../shared/board.json';
import type { AppThunk } from '../../shared/types/redux';
import type { UpdateBoardPayload } from './boardSlice';

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
      if (shipTypeInfo === undefined) reject({ isError: true, message: '' });

      if (!('size' in shipTypeInfo)) reject({ isError: true, message: '' });

      if (!('count' in shipTypeInfo)) reject({ isError: true, message: '' });

      if (shipTypeInfo.size !== positions.length)
        reject({ isError: true, message: 'Unmatch positions' });

      if (
        shipTypeInfo.count !==
        layout.filter(({ ship: ship2 }) => ship2 === ship).length
      )
        reject({ isError: true, message: 'Unmatch count' });
    });

    resolve({ isError: false });
  });

const readBoardConfig = (boardConfigObj: typeof boardConfig): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await validateBoardConfig(boardConfigObj);

      dispatch(updateImportInfo({ isError: false, message: '' }));
      dispatch(initializeBoard(boardConfigObj));
    } catch (error) {
      dispatch(updateImportInfo(error as ErrorState));
    }
  };
};

const updateBoardAndPlayer = (
  boardUpdateInfo: UpdateBoardPayload
): AppThunk => {
  return (dispatch: Dispatch, getState) => {
    const state = getState();
    dispatch(updateBoard(boardUpdateInfo));
    if (
      typeof state.boardReducer.activePlayerId === 'string' &&
      boardUpdateInfo.shipType
    ) {
      dispatch(
        updatePlayer({
          playerId: state.boardReducer.activePlayerId,
          point: 1,
        })
      );
    }
  };
};

export { readBoardConfig, updateBoardAndPlayer, ErrorState };
