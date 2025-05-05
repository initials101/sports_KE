import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { playerAPI } from "../../services/api"

// Get all players
export const fetchPlayers = createAsyncThunk("players/fetchPlayers", async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await playerAPI.getPlayers(params)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Get player by ID
export const fetchPlayerById = createAsyncThunk("players/fetchPlayerById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await playerAPI.getPlayerById(id)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Update player
export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async ({ id, playerData }, { rejectWithValue }) => {
    try {
      const { data } = await playerAPI.updatePlayer(id, playerData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

const playerSlice = createSlice({
  name: "players",
  initialState: {
    players: [],
    selectedPlayer: null,
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
    },
  },
  reducers: {
    setSelectedPlayer: (state, action) => {
      state.selectedPlayer = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetPlayerState: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch players
      .addCase(fetchPlayers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.isLoading = false
        state.players = action.payload.players
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch player by ID
      .addCase(fetchPlayerById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedPlayer = action.payload
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update player
      .addCase(updatePlayer.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedPlayer = action.payload
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setSelectedPlayer, setLoading, setError, resetPlayerState } = playerSlice.actions
export default playerSlice.reducer
