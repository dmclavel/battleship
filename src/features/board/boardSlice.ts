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
      /**
       * Based on given ship positions, create a `positionsObject`
       * with combined x,y coordinates as key containing the ship type (e.g. carrier)
       */
      positionsObject[coordinates.join(',')] = ship;
    });
  });

  state.board = Array.from(Array(BOARD_DIMENSIONS)).map((_, rowIndex) =>
    Array.from(Array(BOARD_DIMENSIONS)).map((_, columnIndex) => {
      /**
       * Use combined rowIndex,columnIndex coordinates as the key to access
       * `positionsObject` which contains the ship type (e.g. carrier) or undefined if no ship
       * is positioned in those given coordinates
       */
      const shipTypeOnCoordinate: Ship | undefined =
        positionsObject[`${rowIndex},${columnIndex}`];
      return {
        id: `board-box-${rowIndex},${columnIndex}`,
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

  /**
   * Skip implementation below if no ship is positioned in the
   * clicked board "square"
   */
  if (shipType === undefined) return state;

  const battleshipState = state.battleships[shipType];
  /**
   * If there is a ship in the clicked board "square",
   * update `battleships` to add x,y coordinates as key
   * with the timestamp when the clicked is trigerred
   */
  const newCoordinates = {
    ...battleshipState?.coordinates,
    [`${rowIndex},${columnIndex}`]: timestamp,
  };
  /**
   * If there is a ship (e.g. carrier) in the clicked coordinates (e.g. 5,5):
   * state.battleships.carrier = {
   *  coordinates: {
   *    ...<previously clicked coordinates>
   *    '5,5': <timestamp>,
   *  }
   * }
   * This makes knowing which ship is already hit much easier.
   */
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
