import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

// Admin middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401)
      throw new Error("Not authorized")
    }

    if (roles.length && !roles.includes(req.user.role)) {
      res.status(403)
      throw new Error("Forbidden: You do not have permission to perform this action")
    }

    next()
  }
}

export { protect, authorize }
