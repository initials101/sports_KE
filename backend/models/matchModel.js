import mongoose from 'mongoose';

const playerPerformanceSchema = mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
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
    redCard: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    notes: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const matchSchema = mongoose.Schema(
  {
    season: {
      type: String,
      required: true,
    },
    competition: {
      type: String,
      required: true,
    },
    matchday: {
      type: Number,
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'completed', 'postponed', 'cancelled'],
      default: 'scheduled',
    },
    result: {
      homeScore: {
        type: Number,
        default: 0,
      },
      awayScore: {
        type: Number,
        default: 0,
      },
      winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
      },
    },
    homeTeamPerformance: [playerPerformanceSchema],
    awayTeamPerformance: [playerPerformanceSchema],
    highlights: [
      {
        type: {
          type: String,
          enum: ['goal', 'yellowCard', 'redCard', 'substitution', 'penalty', 'other'],
        },
        minute: Number,
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player',
        },
        description: String,
      },
    ],
    attendance: {
      type: Number,
    },
    referee: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Update player statistics after match completion
matchSchema.pre('save', async function (next) {
  if (this.isModified('status') && this.status === 'completed') {
    // Here we would update player statistics based on match data
    // This would be expanded in a real implementation
    console.log('Match completed - updating player statistics');
  }
  next();
});

const Match = mongoose.model('Match', matchSchema);

export default Match;