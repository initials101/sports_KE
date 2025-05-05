import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "../../services/api"

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))
const token = localStorage.getItem("token")

// Login user
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.login(credentials)

    // Save user and token to localStorage
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("token", data.token)

    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Register user
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.register(userData)

    // Save user and token to localStorage
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("token", data.token)

    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Get user profile
export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (_, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.getUserProfile()
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Update user profile
export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.updateUserProfile(userData)

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(data))

    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
})

const initialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.token = action.payload.token
        state.success = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.token = action.payload.token
        state.success = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get user profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.success = true
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
      })
  },
})

export const { resetAuthState } = authSlice.actions
export default authSlice.reducer
