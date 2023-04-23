import { Dispatch } from '@reduxjs/toolkit';
import boardConfig from '../../shared/board.json';
import { initializeBoard, updateImportInfo } from './boardSlice';
import { AppThunk } from '../../shared/types/redux';

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

export { readBoardConfig, ErrorState };
