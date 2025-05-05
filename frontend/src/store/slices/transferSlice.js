import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { transferAPI } from "../../services/api"

// Get all transfers
export const fetchTransfers = createAsyncThunk("transfers/fetchTransfers", async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await transferAPI.getTransfers(params)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Get transfer by ID
export const fetchTransferById = createAsyncThunk("transfers/fetchTransferById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await transferAPI.getTransferById(id)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Create transfer
export const createTransfer = createAsyncThunk(
  "transfers/createTransfer",
  async (transferData, { rejectWithValue }) => {
    try {
      const { data } = await transferAPI.createTransfer(transferData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

// Update transfer status
export const updateTransferStatus = createAsyncThunk(
  "transfers/updateTransferStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await transferAPI.updateTransferStatus(id, status)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

// Submit negotiation
export const submitNegotiation = createAsyncThunk(
  "transfers/submitNegotiation",
  async ({ id, negotiationData }, { rejectWithValue }) => {
    try {
      const { data } = await transferAPI.submitNegotiation(id, negotiationData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

// Accept negotiation
export const acceptNegotiation = createAsyncThunk(
  "transfers/acceptNegotiation",
  async ({ transferId, negotiationId }, { rejectWithValue }) => {
    try {
      const { data } = await transferAPI.acceptNegotiation(transferId, negotiationId)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

const transferSlice = createSlice({
  name: "transfers",
  initialState: {
    transfers: [],
    transfer: null,
    isLoading: false,
    error: null,
    success: false,
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
    },
  },
  reducers: {
    resetTransferState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transfers
      .addCase(fetchTransfers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.isLoading = false
        state.transfers = action.payload.transfers
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      })
      .addCase(fetchTransfers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch transfer by ID
      .addCase(fetchTransferById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTransferById.fulfilled, (state, action) => {
        state.isLoading = false
        state.transfer = action.payload
      })
      .addCase(fetchTransferById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create transfer
      .addCase(createTransfer.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(createTransfer.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = true
        state.transfers.unshift(action.payload)
      })
      .addCase(createTransfer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
      // Update transfer status
      .addCase(updateTransferStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateTransferStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.transfer = action.payload
        state.success = true
      })
      .addCase(updateTransferStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Submit negotiation
      .addCase(submitNegotiation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitNegotiation.fulfilled, (state, action) => {
        state.isLoading = false
        state.transfer = action.payload
        state.success = true
      })
      .addCase(submitNegotiation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Accept negotiation
      .addCase(acceptNegotiation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(acceptNegotiation.fulfilled, (state, action) => {
        state.isLoading = false
        state.transfer = action.payload
        state.success = true
      })
      .addCase(acceptNegotiation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { resetTransferState } = transferSlice.actions
export default transferSlice.reducer
