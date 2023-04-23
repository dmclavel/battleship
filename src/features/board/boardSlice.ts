import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import boardConfig from '../../shared/board.json';
import { type ErrorState } from './actions';

type Ship =
  | 'carrier'
  | 'battleship'
  | 'cruiser'
  | 'submarine'
  | 'destroyer'
  | (string & {});

type ImportStatus = 'success' | 'error' | 'ongoing' | 'default';

type BoardBlock = {
  hitTimestamp: EpochTimeStamp;
  shipType?: Ship;
  id: string;
};

type ImportState = {
  status: ImportStatus;
  message?: string;
};

type BattleshipState = {
  coordinates?: {
    [key: string]: EpochTimeStamp;
  };
};

type UpdateBoardPayload = {
  rowIndex: number;
  columnIndex: number;
  shipType?: Ship;
};

interface BoardState {
  board: Array<Array<BoardBlock>>;
  battleships: { [key in Ship]?: BattleshipState };
  import: ImportState;
}

const initialState: BoardState = {
  board: [],
  battleships: {},
  import: { status: 'default' },
};

const BOARD_DIMENSIONS = 10;

const initializeBoardReducer = (
  state: BoardState,
  action: PayloadAction<typeof boardConfig>
) => {
  const { layout } = action.payload;

  const positionsObject: { [key: string]: Ship } = {};
  layout.forEach(({ positions, ship }) => {
    positions.forEach((coordinates) => {
      positionsObject[coordinates.join(',')] = ship;
    });
  });

  state.board = Array.from(Array(BOARD_DIMENSIONS)).map((_, index1D) =>
    Array.from(Array(BOARD_DIMENSIONS)).map((_, index2D) => {
      const shipTypeOnCoordinate = positionsObject[`${index1D},${index2D}`];
      return {
        id: `board-box-${index1D},${index2D}`,
        hitTimestamp: 0,
        shipType: shipTypeOnCoordinate,
      };
    })
  );
  return state;
};

const updateBoardReducer = (
  state: BoardState,
  action: PayloadAction<UpdateBoardPayload>
) => {
  const { rowIndex, columnIndex, shipType } = action.payload;
  const timestamp = new Date().getTime();
  state.board[rowIndex][columnIndex].hitTimestamp = timestamp;

  if (shipType === undefined) return state;

  const battleshipState = state.battleships[shipType];
  const newCoordinates = {
    ...battleshipState?.coordinates,
    [`${rowIndex},${columnIndex}`]: timestamp,
  };
  state.battleships[shipType] = {
    coordinates: newCoordinates,
  };
  return state;
};

const updateImportInfoReducer = (
  state: BoardState,
  action: PayloadAction<ErrorState>
) => {
  state.import.status = action.payload.isError ? 'error' : 'success';
  state.import.message = action.payload.message;
  return state;
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initializeBoard: initializeBoardReducer,
    updateBoard: updateBoardReducer,
    updateImportInfo: updateImportInfoReducer,
  },
});

const { initializeBoard, updateBoard, updateImportInfo } = boardSlice.actions;

export {
  type BoardState,
  type Ship,
  type BattleshipState,
  type UpdateBoardPayload,
  initializeBoard,
  updateBoard,
  updateImportInfo,
};
export default boardSlice.reducer;
