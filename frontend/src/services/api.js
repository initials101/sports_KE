import axios from "axios"

const API = axios.create({
  baseURL: "/api", // This will be proxied to http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle common errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth services
export const authAPI = {
  login: (credentials) => API.post("/users/login", credentials),
  register: (userData) => API.post("/users", userData),
  getUserProfile: () => API.get("/users/profile"),
  updateUserProfile: (userData) => API.put("/users/profile", userData),
}

// Player services
export const playerAPI = {
  getPlayers: (params) => API.get("/players", { params }),
  getPlayerById: (id) => API.get(`/players/${id}`),
  updatePlayer: (id, playerData) => API.put(`/players/${id}`, playerData),
  createPlayer: (playerData) => API.post("/players", playerData),
  deletePlayer: (id) => API.delete(`/players/${id}`),
}

// Club services
export const clubAPI = {
  getClubs: (params) => API.get("/clubs", { params }),
  getClubById: (id) => API.get(`/clubs/${id}`),
  createClub: (clubData) => API.post("/clubs", clubData),
  updateClub: (id, clubData) => API.put(`/clubs/${id}`, clubData),
  deleteClub: (id) => API.delete(`/clubs/${id}`),
}

// Transfer services
export const transferAPI = {
  getTransfers: (params) => API.get("/transfers", { params }),
  getTransferById: (id) => API.get(`/transfers/${id}`),
  createTransfer: (transferData) => API.post("/transfers", transferData),
  updateTransferStatus: (id, status) => API.put(`/transfers/${id}/status`, { status }),
  submitNegotiation: (id, negotiationData) => API.post(`/transfers/${id}/negotiations`, negotiationData),
  acceptNegotiation: (transferId, negotiationId) =>
    API.put(`/transfers/${transferId}/negotiations/${negotiationId}/accept`),
}

// Scout services
export const scoutAPI = {
  getScouts: (params) => API.get("/scouts", { params }),
  getScoutById: (id) => API.get(`/scouts/${id}`),
  updateScoutProfile: (profileData) => API.put("/scouts/profile", profileData),
  connectWithScout: (id) => API.post(`/scouts/${id}/connect`),
  respondToConnection: (connectionId, status) => API.put(`/scouts/connections/${connectionId}`, { status }),
}

export default API
