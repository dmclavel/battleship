import type { RootState } from '../../shared/store';
import type { BattleshipState, HitInfo } from '../../shared/types/redux';

const boardImportSelector = (state: RootState) => state.boardReducer.import;

const selectWinningCondition = (state: RootState) => {
  const loadedShips = state.shipsReducer.loadedShips;
  const sunkShips = state.shipsReducer.sunkShips;

  const allShipsSunk = Object.keys(loadedShips).every((coordinates) => {
    const ship = loadedShips[coordinates];

    // No ship of that type is hit yet
    if (!sunkShips[ship]) return false;

    // Part of the ship in those given coordinates is not hit yet
    if (
      !((sunkShips[ship] as BattleshipState).coordinates as HitInfo)[
        coordinates
      ]
    )
      return false;

    return true;
  });

  return allShipsSunk;
};

export { selectWinningCondition, boardImportSelector };
