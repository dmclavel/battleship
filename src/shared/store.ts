import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import playersReducer from '../features/players/playersSlice';

const store = configureStore({
  reducer: {
    boardReducer,
    playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
