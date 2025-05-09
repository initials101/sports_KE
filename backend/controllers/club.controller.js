import asyncHandler from "express-async-handler"
import Club from "../models/clubModel.js"

// @desc    Fetch all clubs
// @route   GET /api/clubs
// @access  Public
const getClubs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const league = req.query.league
  const search = req.query.search

  const filter = {}

  if (league) {
    filter.league = league
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" }
  }

  const count = await Club.countDocuments(filter)
  const clubs = await Club.find(filter)
    .sort({ name: 1 })
    .limit(limit)
    .skip((page - 1) * limit)

  res.json({
    clubs,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  })
})

// @desc    Fetch single club
// @route   GET /api/clubs/:id
// @access  Public
const getClubById = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id).populate("players")

  if (club) {
    res.json(club)
  } else {
    res.status(404)
    throw new Error("Club not found")
  }
})

// @desc    Create a club
// @route   POST /api/clubs
// @access  Private/Admin
const createClub = asyncHandler(async (req, res) => {
  const {
    name,
    shortName,
    founded,
    logo,
    coverImage,
    stadium,
    location,
    league,
    website,
    colors,
    manager,
    description,
    socialMedia,
  } = req.body

  const clubExists = await Club.findOne({ name })

  if (clubExists) {
    res.status(400)
    throw new Error("Club already exists")
  }

  const club = new Club({
    name,
    shortName,
    founded,
    logo,
    coverImage,
    stadium,
    location,
    league,
    website,
    colors,
    manager,
    description,
    socialMedia,
  })

  const createdClub = await club.save()
  res.status(201).json(createdClub)
})

// @desc    Update a club
// @route   PUT /api/clubs/:id
// @access  Private/Admin
const updateClub = asyncHandler(async (req, res) => {
  const {
    name,
    shortName,
    founded,
    logo,
    coverImage,
    stadium,
    location,
    league,
    website,
    colors,
    manager,
    description,
    socialMedia,
  } = req.body

  const club = await Club.findById(req.params.id)

  if (club) {
    club.name = name || club.name
    club.shortName = shortName || club.shortName
    club.founded = founded || club.founded
    club.logo = logo || club.logo
    club.coverImage = coverImage || club.coverImage
    club.stadium = stadium || club.stadium
    club.location = location || club.location
    club.league = league || club.league
    club.website = website || club.website
    club.colors = colors || club.colors
    club.manager = manager || club.manager
    club.description = description || club.description
    club.socialMedia = socialMedia || club.socialMedia

    const updatedClub = await club.save()
    res.json(updatedClub)
  } else {
    res.status(404)
    throw new Error("Club not found")
  }
})

// @desc    Delete a club
// @route   DELETE /api/clubs/:id
// @access  Private/Admin
const deleteClub = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id)

  if (club) {
    await club.remove()
    res.json({ message: "Club removed" })
  } else {
    res.status(404)
    throw new Error("Club not found")
  }
})

export { getClubs, getClubById, createClub, updateClub, deleteClub }
