import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

// @desc    Get all scouts
// @route   GET /api/scouts
// @access  Private
const getScouts = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const region = req.query.region

  const filter = { role: "scout" }
  if (region && region !== "all") {
    filter["scoutProfile.region"] = region
  }

  const count = await User.countDocuments(filter)
  const scouts = await User.find(filter)
    .select("name email profileImage scoutProfile")
    .sort({ "scoutProfile.rating": -1 })
    .skip((page - 1) * limit)
    .limit(limit)

  res.json({
    scouts,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  })
})

// @desc    Get scout by ID
// @route   GET /api/scouts/:id
// @access  Private
const getScoutById = asyncHandler(async (req, res) => {
  const scout = await User.findById(req.params.id)
    .select("name email profileImage scoutProfile")
    .populate("scoutProfile.discoveredPlayers", "firstName lastName position currentClub")
    .populate("scoutProfile.successfulTransfers")

  if (scout && scout.role === "scout") {
    res.json(scout)
  } else {
    res.status(404)
    throw new Error("Scout not found")
  }
})

// @desc    Update scout profile
// @route   PUT /api/scouts/profile
// @access  Private (Scout only)
const updateScoutProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user && user.role === "scout") {
    user.scoutProfile = {
      ...user.scoutProfile,
      ...req.body,
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      scoutProfile: updatedUser.scoutProfile,
    })
  } else {
    res.status(404)
    throw new Error("User not found or not a scout")
  }
})

// @desc    Connect with scout
// @route   POST /api/scouts/:id/connect
// @access  Private
const connectWithScout = asyncHandler(async (req, res) => {
  const scout = await User.findById(req.params.id)
  const user = await User.findById(req.user._id)

  if (!scout || scout.role !== "scout") {
    res.status(404)
    throw new Error("Scout not found")
  }

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  // Check if connection already exists
  const connectionExists = user.connections.find((connection) => connection.user.toString() === scout._id.toString())

  if (connectionExists) {
    res.status(400)
    throw new Error("Connection already exists")
  }

  // Add connection to both users
  user.connections.push({
    user: scout._id,
    status: "pending",
    initiatedBy: user._id,
  })

  scout.connections.push({
    user: user._id,
    status: "pending",
    initiatedBy: user._id,
  })

  await user.save()
  await scout.save()

  res.status(201).json({ message: "Connection request sent" })
})

// @desc    Accept/Reject connection
// @route   PUT /api/scouts/connections/:connectionId
// @access  Private (Scout only)
const respondToConnection = asyncHandler(async (req, res) => {
  const { status } = req.body
  const user = await User.findById(req.user._id)

  if (!user || user.role !== "scout") {
    res.status(404)
    throw new Error("User not found or not a scout")
  }

  // Find the connection
  const connection = user.connections.id(req.params.connectionId)

  if (!connection) {
    res.status(404)
    throw new Error("Connection not found")
  }

  // Update connection status
  connection.status = status

  // Also update the status in the other user's connections
  const otherUser = await User.findById(connection.user)
  if (otherUser) {
    const otherConnection = otherUser.connections.find((conn) => conn.user.toString() === user._id.toString())

    if (otherConnection) {
      otherConnection.status = status
      await otherUser.save()
    }
  }

  await user.save()
  res.json({ message: `Connection ${status}` })
})

export { getScouts, getScoutById, updateScoutProfile, connectWithScout, respondToConnection }
