import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { clubAPI } from "../../services/api"

// Get all clubs
export const fetchClubs = createAsyncThunk("clubs/fetchClubs", async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await clubAPI.getClubs(params)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Get club by ID
export const fetchClubById = createAsyncThunk("clubs/fetchClubById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await clubAPI.getClubById(id)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

const clubSlice = createSlice({
  name: "clubs",
  initialState: {
    clubs: [],
    club: null,
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
    },
  },
  reducers: {
    resetClubState: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch clubs
      .addCase(fetchClubs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.isLoading = false
        state.clubs = action.payload.clubs
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch club by ID
      .addCase(fetchClubById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.isLoading = false
        state.club = action.payload
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { resetClubState } = clubSlice.actions
export default clubSlice.reducer
