import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Players from "./pages/Players"
import PlayerProfile from "./pages/PlayerProfile"
import Teams from "./pages/Teams"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Transfers from "./pages/Transfers"
import TransferDetail from "./pages/TransferDetail"
import ScoutNetwork from "./pages/ScoutNetwork"
import ScoutProfile from "./pages/ScoutProfile"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-kenya-white to-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerProfile />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/transfers/:id" element={<TransferDetail />} />
          <Route path="/scout-network" element={<ScoutNetwork />} />
          <Route path="/scouts/:id" element={<ScoutProfile />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["admin", "clubManager", "scout", "agent"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
