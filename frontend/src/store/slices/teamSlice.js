import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  selectedTeam: null,
  isLoading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTeams, setSelectedTeam, setLoading, setError } = teamSlice.actions;
export default teamSlice.reducer;