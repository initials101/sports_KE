import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
  selectedPlayer: null,
  isLoading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setSelectedPlayer: (state, action) => {
      state.selectedPlayer = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPlayers, setSelectedPlayer, setLoading, setError } = playerSlice.actions;
export default playerSlice.reducer;