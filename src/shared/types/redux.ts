import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export { AppThunk };
