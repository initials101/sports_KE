"use client"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import PlayerDashboard from "../components/dashboards/PlayerDashboard"
import ClubManagerDashboard from "../components/dashboards/ClubManagerDashboard"
import ScoutDashboard from "../components/dashboards/ScoutDashboard"
import AgentDashboard from "../components/dashboards/AgentDashboard"
import AdminDashboard from "../components/dashboards/AdminDashboard"

function Dashboard() {
  const { user, isLoading } = useSelector((state) => state.auth)

  // If user is not logged in, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!user) return null

    switch (user.role) {
      case "player":
        return <PlayerDashboard />
      case "clubManager":
        return <ClubManagerDashboard />
      case "scout":
        return <ScoutDashboard />
      case "agent":
        return <AgentDashboard />
      case "admin":
        return <AdminDashboard />
      default:
        return <PlayerDashboard />
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kenya-green"></div>
      </div>
    )
  }

  return <div className="min-h-screen bg-gray-50">{renderDashboard()}</div>
}

export default Dashboard
