import mongoose from 'mongoose';

// Sub-schema for player statistics
const statisticsSchema = mongoose.Schema(
  {
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
    cleanSheets: {
      type: Number,
      default: 0,
    },
    concededGoals: {
      type: Number,
      default: 0,
    },
    passAccuracy: {
      type: Number,
      default: 0,
    },
    tacklesPerGame: {
      type: Number,
      default: 0,
    },
    interceptionPerGame: {
      type: Number,
      default: 0,
    },
    savesPerGame: {
      type: Number,
      default: 0,
    },
    duelsWon: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

// Sub-schema for career history
const careerHistorySchema = mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    loanSpell: {
      type: Boolean,
      default: false,
    },
    transferFee: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const playerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add date of birth'],
    },
    nationality: {
      type: String,
      default: 'Kenyan',
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },
    position: {
      type: String,
      enum: [
        'Goalkeeper',
        'Center Back',
        'Right Back',
        'Left Back',
        'Defensive Midfielder',
        'Central Midfielder',
        'Attacking Midfielder',
        'Right Winger',
        'Left Winger',
        'Striker',
      ],
      required: true,
    },
    preferredFoot: {
      type: String,
      enum: ['Right', 'Left', 'Both'],
      default: 'Right',
    },
    currentClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
    },
    jerseyNumber: {
      type: Number,
    },
    marketValue: {
      type: Number,
      default: 0,
    },
    contractStartDate: {
      type: Date,
    },
    contractEndDate: {
      type: Date,
    },
    statistics: [statisticsSchema],
    careerHistory: [careerHistorySchema],
    injuries: [
      {
        type: String,
        injury: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    skills: [
      {
        name: String,
        rating: {
          type: Number,
          min: 1,
          max: 100,
        },
      },
    ],
    bio: {
      type: String,
    },
    socialMedia: {
      twitter: String,
      instagram: String,
      facebook: String,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    coverImage: {
      type: String,
      default: 'default-player-cover.jpg',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      address: String,
      city: String,
      county: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for player's age
playerSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Calculate market value
playerSchema.methods.calculateMarketValue = function () {
  // Get the latest season statistics
  const latestStats = this.statistics.sort((a, b) => {
    return new Date(b.season) - new Date(a.season);
  })[0];
  
  // Base value based on age
  const age = this.age;
  let baseValue = 0;
  
  if (age < 20) {
    baseValue = 50000; // Young prospect
  } else if (age < 25) {
    baseValue = 100000; // Prime development years
  } else if (age < 30) {
    baseValue = 80000; // Prime years
  } else {
    baseValue = 40000; // Declining years
  }
  
  // Performance multiplier
  let performanceMultiplier = 1;
  
  if (latestStats) {
    // Goals and assists impact
    const goalContribution = (latestStats.goals * 1.5) + latestStats.assists;
    
    // Playing time impact
    const playingTimeImpact = latestStats.minutesPlayed / 1000;
    
    performanceMultiplier = 1 + (goalContribution * 0.05) + (playingTimeImpact * 0.1);
  }
  
  // Position impact
  let positionMultiplier = 1;
  
  if (this.position === 'Striker' || this.position === 'Attacking Midfielder') {
    positionMultiplier = 1.2;
  } else if (this.position === 'Goalkeeper') {
    positionMultiplier = 0.9;
  }
  
  // Contract length impact
  let contractMultiplier = 1;
  
  if (this.contractEndDate) {
    const today = new Date();
    const contractEnd = new Date(this.contractEndDate);
    const monthsLeft = (contractEnd.getFullYear() - today.getFullYear()) * 12 + 
                      (contractEnd.getMonth() - today.getMonth());
    
    if (monthsLeft < 6) {
      contractMultiplier = 0.7;
    } else if (monthsLeft < 12) {
      contractMultiplier = 0.85;
    } else if (monthsLeft > 36) {
      contractMultiplier = 1.1;
    }
  }
  
  // Calculate final value
  const calculatedValue = baseValue * performanceMultiplier * positionMultiplier * contractMultiplier;
  
  // Round to nearest 1000
  return Math.round(calculatedValue / 1000) * 1000;
};

// Update market value before saving
playerSchema.pre('save', async function (next) {
  this.marketValue = this.calculateMarketValue();
  next();
});

const Player = mongoose.model('Player', playerSchema);

export default Player;