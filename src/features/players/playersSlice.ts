import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Player {
  id: string;
  points: number;
}

interface Players {
  players: Partial<{ [key: string]: Player }>;
}

const initialState: Players = {
  players: {},
};

const initializePlayersReducer = (
  state: Players,
  action: PayloadAction<Array<string>>
) => {
  action.payload.forEach((playerId) => {
    if (playerId)
      state.players[playerId] = {
        id: playerId,
        points: 0,
      };
  });
  return state;
};

const updatePlayerReducer = (
  state: Players,
  action: PayloadAction<{
    playerId: string;
    point: number;
  }>
) => {
  const { playerId, point } = action.payload;
  (state.players[playerId] as Player).points += point;
  return state;
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    initializePlayers: initializePlayersReducer,
    updatePlayer: updatePlayerReducer,
  },
});

const { initializePlayers, updatePlayer } = playersSlice.actions;

export { type Players, initializePlayers, updatePlayer };
export default playersSlice.reducer;
