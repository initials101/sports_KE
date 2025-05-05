import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import playerReducer from "./slices/playerSlice"
import clubReducer from "./slices/clubSlice"
import transferReducer from "./slices/transferSlice"
import scoutReducer from "./slices/scoutSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playerReducer,
    clubs: clubReducer,
    transfers: transferReducer,
    scouts: scoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
