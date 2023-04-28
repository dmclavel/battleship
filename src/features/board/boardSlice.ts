import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ErrorState } from './actions';
import type { UpdateGamePayload } from '../../shared/types/redux';

type ImportStatus = 'success' | 'error' | 'ongoing' | 'default';

type BoardBlock = {
  hitTimestamp: EpochTimeStamp;
  hitBy?: string;
  id: string;
};

type ImportState = {
  status: ImportStatus;
  message?: string;
};

interface Board {
  // N x N board
  board: Array<Array<BoardBlock>>;
  // Current player to hit
  activePlayerId?: string;
  import: ImportState;
}

const initialState: Board = {
  board: [],
  import: { status: 'default' },
};

const BOARD_DIMENSIONS = 10;

const initializeBoardReducer = (state: Board) => {
  state.board = Array.from(Array(BOARD_DIMENSIONS)).map((_, rowIndex) =>
    Array.from(Array(BOARD_DIMENSIONS)).map((_, columnIndex) => {
      return {
        id: `board-box-${rowIndex},${columnIndex}`,
        hitTimestamp: 0,
      };
    })
  );
  return state;
};

const updateBoardReducer = (
  state: Board,
  action: PayloadAction<UpdateGamePayload>
) => {
  const { rowIndex, columnIndex } = action.payload;
  const timestamp = new Date().getTime();
  state.board[rowIndex][columnIndex].hitTimestamp = timestamp;
  state.board[rowIndex][columnIndex].hitBy = state.activePlayerId;

  return state;
};

const updateImportInfoReducer = (
  state: Board,
  action: PayloadAction<ErrorState>
) => {
  state.import.status = action.payload.isError ? 'error' : 'success';
  state.import.message = action.payload.message;
  return state;
};

const updateActivePlayerReducer = (
  state: Board,
  action: PayloadAction<string>
) => {
  state.activePlayerId = action.payload;
  return state;
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initializeBoard: initializeBoardReducer,
    updateBoard: updateBoardReducer,
    updateImportInfo: updateImportInfoReducer,
    updateActivePlayer: updateActivePlayerReducer,
  },
});

const { initializeBoard, updateBoard, updateImportInfo, updateActivePlayer } =
  boardSlice.actions;

export {
  type Board,
  initializeBoard,
  updateBoard,
  updateImportInfo,
  updateActivePlayer,
};
export default boardSlice.reducer;
