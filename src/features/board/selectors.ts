import type { RootState } from '../../shared/store';
import type { BattleshipState, HitInfo } from './boardSlice';

const selectWinningCondition = (state: RootState) => {
  const loadedShips = state.boardReducer.shipsInfo;
  const sunkShips = state.boardReducer.battleships;

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

export { selectWinningCondition };
