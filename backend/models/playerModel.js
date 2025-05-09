import mongoose from "mongoose"

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
})

const statisticSchema = mongoose.Schema({
  season: {
    type: String,
    required: true,
  },
  appearances: {
    type: Number,
    default: 0,
  },
  goals: {
    type: Number,
    default: 0,
  },
  assists: {
    type: Number,
    default: 0,
  },
  minutesPlayed: {
    type: Number,
    default: 0,
  },
  yellowCards: {
    type: Number,
    default: 0,
  },
  redCards: {
    type: Number,
    default: 0,
  },
})

const careerHistorySchema = mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  transferFee: {
    type: Number,
  },
  loanSpell: {
    type: Boolean,
    default: false,
  },
})

const injurySchema = mongoose.Schema({
  injury: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
  },
})

const playerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },
    preferredFoot: {
      type: String,
      enum: ["Left", "Right", "Both"],
    },
    jerseyNumber: {
      type: Number,
    },
    currentClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    contractStartDate: {
      type: Date,
    },
    contractEndDate: {
      type: Date,
    },
    marketValue: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    skills: [skillSchema],
    statistics: [statisticSchema],
    careerHistory: [careerHistorySchema],
    injuries: [injurySchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for age
playerSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null
  const today = new Date()
  const birthDate = new Date(this.dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
})

const Player = mongoose.model("Player", playerSchema)

export default Player
