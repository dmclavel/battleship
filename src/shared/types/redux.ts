import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type Ship =
  | 'carrier'
  | 'battleship'
  | 'cruiser'
  | 'submarine'
  | 'destroyer'
  | (string & {});

type HitInfo = {
  [key: string]: number;
};

type BattleshipState = {
  coordinates?: HitInfo;
};

type UpdateGamePayload = {
  rowIndex: number;
  columnIndex: number;
};

export type { AppThunk, Ship, HitInfo, BattleshipState, UpdateGamePayload };
