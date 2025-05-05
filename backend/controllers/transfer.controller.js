import Transfer from "../models/transferModel.js"
import Player from "../models/playerModel.js"
import Club from "../models/clubModel.js"
import asyncHandler from "express-async-handler"

// @desc    Get all transfers
// @route   GET /api/transfers
// @access  Private
const getTransfers = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const status = req.query.status

  const filter = {}
  if (status) {
    filter.status = status
  }

  const count = await Transfer.countDocuments(filter)
  const transfers = await Transfer.find(filter)
    .populate("player", "firstName lastName position coverImage")
    .populate("fromClub", "name logo")
    .populate("toClub", "name logo")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

  res.json({
    transfers,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  })
})

// @desc    Get transfer by ID
// @route   GET /api/transfers/:id
// @access  Private
const getTransferById = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id)
    .populate("player", "firstName lastName position coverImage age marketValue")
    .populate("fromClub", "name logo")
    .populate("toClub", "name logo")
    .populate("negotiations.proposedBy", "name role")
    .populate("negotiations.acceptedBy", "name role")

  if (transfer) {
    res.json(transfer)
  } else {
    res.status(404)
    throw new Error("Transfer not found")
  }
})

// @desc    Create a transfer
// @route   POST /api/transfers
// @access  Private
const createTransfer = asyncHandler(async (req, res) => {
  const { player, fromClub, toClub, askingPrice, transferType } = req.body

  // Validate player and clubs exist
  const playerExists = await Player.findById(player)
  const fromClubExists = await Club.findById(fromClub)
  const toClubExists = await Club.findById(toClub)

  if (!playerExists || !fromClubExists || !toClubExists) {
    res.status(400)
    throw new Error("Invalid player or club data")
  }

  const transfer = await Transfer.create({
    player,
    fromClub,
    toClub,
    askingPrice,
    transferType,
    status: "initiated",
    initiatedBy: req.user._id,
  })

  if (transfer) {
    res.status(201).json(transfer)
  } else {
    res.status(400)
    throw new Error("Invalid transfer data")
  }
})

// @desc    Update transfer status
// @route   PUT /api/transfers/:id/status
// @access  Private
const updateTransferStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  const transfer = await Transfer.findById(req.params.id)

  if (transfer) {
    transfer.status = status

    if (status === "completed") {
      transfer.completedAt = Date.now()

      // Update player's current club if transfer is completed
      if (transfer.transferType === "permanent") {
        await Player.findByIdAndUpdate(transfer.player, {
          currentClub: transfer.toClub,
          $push: {
            careerHistory: {
              club: transfer.toClub,
              startDate: Date.now(),
              transferFee: transfer.finalPrice || transfer.askingPrice,
            },
          },
        })
      }
    }

    const updatedTransfer = await transfer.save()
    res.json(updatedTransfer)
  } else {
    res.status(404)
    throw new Error("Transfer not found")
  }
})

// @desc    Submit negotiation
// @route   POST /api/transfers/:id/negotiations
// @access  Private
const submitNegotiation = asyncHandler(async (req, res) => {
  const { proposedPrice, message } = req.body
  const transfer = await Transfer.findById(req.params.id)

  if (transfer) {
    // Add negotiation to the transfer
    transfer.negotiations.push({
      proposedPrice,
      message,
      proposedBy: req.user._id,
      proposedAt: Date.now(),
    })

    // Update transfer status to negotiating
    if (transfer.status === "initiated") {
      transfer.status = "negotiating"
    }

    const updatedTransfer = await transfer.save()

    res.json(updatedTransfer)
  } else {
    res.status(404)
    throw new Error("Transfer not found")
  }
})

// @desc    Accept negotiation
// @route   PUT /api/transfers/:id/negotiations/:negotiationId/accept
// @access  Private
const acceptNegotiation = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id)

  if (!transfer) {
    res.status(404)
    throw new Error("Transfer not found")
  }

  const negotiation = transfer.negotiations.id(req.params.negotiationId)

  if (!negotiation) {
    res.status(404)
    throw new Error("Negotiation not found")
  }

  // Mark negotiation as accepted
  negotiation.accepted = true
  negotiation.acceptedBy = req.user._id
  negotiation.acceptedAt = Date.now()

  // Update transfer status and final price
  transfer.status = "agreed"
  transfer.finalPrice = negotiation.proposedPrice

  const updatedTransfer = await transfer.save()
  res.json(updatedTransfer)
})

export { getTransfers, getTransferById, createTransfer, updateTransferStatus, submitNegotiation, acceptNegotiation }
