import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useSelector((state) => state.auth)

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If roles are specified and user's role is not included, redirect to dashboard
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  // If user is logged in and has the required role, render the children
  return children
}

export default ProtectedRoute
