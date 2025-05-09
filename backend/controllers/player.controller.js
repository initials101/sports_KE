import asyncHandler from "express-async-handler"
import Player from "../models/playerModel.js"

// @desc    Fetch all players
// @route   GET /api/players
// @access  Public
const getPlayers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const position = req.query.position
  const club = req.query.club
  const nationality = req.query.nationality
  const search = req.query.search

  const filter = {}

  if (position) {
    filter.position = position
  }

  if (club) {
    filter.currentClub = club
  }

  if (nationality) {
    filter.nationality = nationality
  }

  if (search) {
    filter.$or = [{ firstName: { $regex: search, $options: "i" } }, { lastName: { $regex: search, $options: "i" } }]
  }

  const count = await Player.countDocuments(filter)
  const players = await Player.find(filter)
    .populate("user", "name profileImage")
    .populate("currentClub", "name logo")
    .sort({ marketValue: -1 })
    .limit(limit)
    .skip((page - 1) * limit)

  res.json({
    players,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  })
})

// @desc    Fetch single player
// @route   GET /api/players/:id
// @access  Public
const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id)
    .populate("user", "name profileImage")
    .populate("currentClub", "name logo")
    .populate("careerHistory.club", "name logo")

  if (player) {
    res.json(player)
  } else {
    res.status(404)
    throw new Error("Player not found")
  }
})

// @desc    Create a player
// @route   POST /api/players
// @access  Private
const createPlayer = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    position,
    height,
    weight,
    preferredFoot,
    jerseyNumber,
    currentClub,
    contractStartDate,
    contractEndDate,
    marketValue,
    bio,
    coverImage,
  } = req.body

  const player = new Player({
    user: req.user._id,
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    position,
    height,
    weight,
    preferredFoot,
    jerseyNumber,
    currentClub,
    contractStartDate,
    contractEndDate,
    marketValue,
    bio,
    coverImage,
  })

  const createdPlayer = await player.save()
  res.status(201).json(createdPlayer)
})

// @desc    Update a player
// @route   PUT /api/players/:id
// @access  Private
const updatePlayer = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    position,
    height,
    weight,
    preferredFoot,
    jerseyNumber,
    currentClub,
    contractStartDate,
    contractEndDate,
    marketValue,
    bio,
    coverImage,
    skills,
    statistics,
    careerHistory,
    injuries,
  } = req.body

  const player = await Player.findById(req.params.id)

  if (player) {
    // Check if user is owner or admin
    if (player.user && player.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403)
      throw new Error("You don't have permission to update this player")
    }

    player.firstName = firstName || player.firstName
    player.lastName = lastName || player.lastName
    player.dateOfBirth = dateOfBirth || player.dateOfBirth
    player.nationality = nationality || player.nationality
    player.position = position || player.position
    player.height = height || player.height
    player.weight = weight || player.weight
    player.preferredFoot = preferredFoot || player.preferredFoot
    player.jerseyNumber = jerseyNumber || player.jerseyNumber
    player.currentClub = currentClub || player.currentClub
    player.contractStartDate = contractStartDate || player.contractStartDate
    player.contractEndDate = contractEndDate || player.contractEndDate
    player.marketValue = marketValue || player.marketValue
    player.bio = bio || player.bio
    player.coverImage = coverImage || player.coverImage

    if (skills) player.skills = skills
    if (statistics) player.statistics = statistics
    if (careerHistory) player.careerHistory = careerHistory
    if (injuries) player.injuries = injuries

    const updatedPlayer = await player.save()
    res.json(updatedPlayer)
  } else {
    res.status(404)
    throw new Error("Player not found")
  }
})

// @desc    Delete a player
// @route   DELETE /api/players/:id
// @access  Private/Admin
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id)

  if (player) {
    await player.remove()
    res.json({ message: "Player removed" })
  } else {
    res.status(404)
    throw new Error("Player not found")
  }
})

// @desc    Add player skill
// @route   POST /api/players/:id/skills
// @access  Private
const addPlayerSkill = asyncHandler(async (req, res) => {
  const { name, rating } = req.body

  const player = await Player.findById(req.params.id)

  if (player) {
    // Check if user is owner or admin
    if (player.user && player.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403)
      throw new Error("You don't have permission to update this player")
    }

    const skill = {
      name,
      rating,
    }

    player.skills.push(skill)
    await player.save()
    res.status(201).json(player)
  } else {
    res.status(404)
    throw new Error("Player not found")
  }
})

// @desc    Add player statistic
// @route   POST /api/players/:id/statistics
// @access  Private
const addPlayerStatistic = asyncHandler(async (req, res) => {
  const { season, appearances, goals, assists, minutesPlayed, yellowCards, redCards } = req.body

  const player = await Player.findById(req.params.id)

  if (player) {
    // Check if user is owner or admin
    if (player.user && player.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403)
      throw new Error("You don't have permission to update this player")
    }

    const statistic = {
      season,
      appearances,
      goals,
      assists,
      minutesPlayed,
      yellowCards,
      redCards,
    }

    player.statistics.push(statistic)
    await player.save()
    res.status(201).json(player)
  } else {
    res.status(404)
    throw new Error("Player not found")
  }
})

export { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer, addPlayerSkill, addPlayerStatistic }
