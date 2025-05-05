import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { scoutAPI } from "../../services/api"

// Get all scouts
export const fetchScouts = createAsyncThunk("scouts/fetchScouts", async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await scoutAPI.getScouts(params)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Get scout by ID
export const fetchScoutById = createAsyncThunk("scouts/fetchScoutById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await scoutAPI.getScoutById(id)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Update scout profile
export const updateScoutProfile = createAsyncThunk(
  "scouts/updateScoutProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await scoutAPI.updateScoutProfile(profileData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

// Connect with scout
export const connectWithScout = createAsyncThunk("scouts/connectWithScout", async (scoutId, { rejectWithValue }) => {
  try {
    const { data } = await scoutAPI.connectWithScout(scoutId)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Respond to connection
export const respondToConnection = createAsyncThunk(
  "scouts/respondToConnection",
  async ({ connectionId, status }, { rejectWithValue }) => {
    try {
      const { data } = await scoutAPI.respondToConnection(connectionId, status)
      return { ...data, connectionId }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

const scoutSlice = createSlice({
  name: "scouts",
  initialState: {
    scouts: [],
    scout: null,
    isLoading: false,
    error: null,
    success: false,
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
    },
    connectionStatus: null,
  },
  reducers: {
    resetScoutState: (state) => {
      state.success = false
      state.error = null
      state.connectionStatus = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch scouts
      .addCase(fetchScouts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchScouts.fulfilled, (state, action) => {
        state.isLoading = false
        state.scouts = action.payload.scouts
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      })
      .addCase(fetchScouts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch scout by ID
      .addCase(fetchScoutById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchScoutById.fulfilled, (state, action) => {
        state.isLoading = false
        state.scout = action.payload
      })
      .addCase(fetchScoutById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update scout profile
      .addCase(updateScoutProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(updateScoutProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = true
        state.scout = action.payload
      })
      .addCase(updateScoutProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
      // Connect with scout
      .addCase(connectWithScout.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.connectionStatus = null
      })
      .addCase(connectWithScout.fulfilled, (state) => {
        state.isLoading = false
        state.connectionStatus = "sent"
      })
      .addCase(connectWithScout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.connectionStatus = null
      })
      // Respond to connection
      .addCase(respondToConnection.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(respondToConnection.fulfilled, (state, action) => {
        state.isLoading = false
        state.connectionStatus = action.payload.status

        // Update connection status in the user's connections array
        if (state.scout && state.scout.connections) {
          const connectionIndex = state.scout.connections.findIndex((conn) => conn._id === action.payload.connectionId)
          if (connectionIndex !== -1) {
            state.scout.connections[connectionIndex].status = action.payload.status
          }
        }
      })
      .addCase(respondToConnection.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { resetScoutState } = scoutSlice.actions
export default scoutSlice.reducer
