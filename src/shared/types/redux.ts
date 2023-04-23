import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export { AppThunk };
