import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import playersReducer from '../features/players/playersSlice';
import shipsReducer from '../features/ships/shipsSlice';

const store = configureStore({
  reducer: {
    boardReducer,
    playersReducer,
    shipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
