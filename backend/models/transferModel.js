import mongoose from "mongoose"

const negotiationSchema = mongoose.Schema({
  proposedPrice: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  proposedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposedAt: {
    type: Date,
    default: Date.now,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  acceptedAt: {
    type: Date,
  },
})

const transferSchema = mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    fromClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    toClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    askingPrice: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
    },
    transferType: {
      type: String,
      enum: ["permanent", "loan"],
      default: "permanent",
    },
    loanDuration: {
      type: Number, // In months
    },
    status: {
      type: String,
      enum: ["initiated", "negotiating", "agreed", "completed", "rejected", "cancelled"],
      default: "initiated",
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    negotiations: [negotiationSchema],
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const Transfer = mongoose.model("Transfer", transferSchema)

export default Transfer
