import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  Ship,
  BattleshipState,
  UpdateGamePayload,
} from '../../shared/types/redux';
import { BoardConfigType } from '../../shared/types/board';

type ShipLayout = {
  ship: Ship;
  positions: Array<Array<number>>;
};

interface Ships {
  // Ships that are hit by players
  sunkShips: { [key in Ship]?: BattleshipState };
  // Loaded ships from the board configuration
  loadedShips: { [key: string]: Ship };
  // Ships layout from boardConfig
  shipsLayout: Array<ShipLayout> | [];
}

const initialState: Ships = {
  sunkShips: {},
  loadedShips: {},
  shipsLayout: [],
};

const initializeShipsReducer = (
  state: Ships,
  action: PayloadAction<BoardConfigType>
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

  state.loadedShips = positionsObject;
  state.shipsLayout = layout;

  return state;
};

const updateShipsReducer = (
  state: Ships,
  action: PayloadAction<UpdateGamePayload>
) => {
  const { rowIndex, columnIndex } = action.payload;
  const coordinates = `${rowIndex},${columnIndex}`;
  const shipType = state.loadedShips[coordinates];

  if (shipType !== undefined) {
    const sunkShip = state.sunkShips[shipType];

    const newCoordinates = {
      ...sunkShip?.coordinates,
      [coordinates]: 1,
    };

    state.sunkShips[shipType] = {
      coordinates: newCoordinates,
    };
  }

  return state;
};

const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    initializeShips: initializeShipsReducer,
    updateShips: updateShipsReducer,
  },
});

const { initializeShips, updateShips } = shipsSlice.actions;

export { type Ships, initializeShips, updateShips };
export default shipsSlice.reducer;
