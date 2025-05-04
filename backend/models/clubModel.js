import mongoose from 'mongoose';

const clubSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a club name'],
      unique: true,
    },
    founded: {
      type: Number,
    },
    logo: {
      type: String,
      default: 'default-club-logo.jpg',
    },
    coverImage: {
      type: String,
      default: 'default-club-cover.jpg',
    },
    primaryColor: {
      type: String,
      default: '#000000',
    },
    secondaryColor: {
      type: String,
      default: '#FFFFFF',
    },
    stadium: {
      name: String,
      capacity: Number,
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
    },
    league: {
      type: String,
      enum: [
        'Kenya Premier League',
        'National Super League',
        'Division One',
        'County League',
        'Other',
      ],
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    website: {
      type: String,
    },
    socialMedia: {
      twitter: String,
      facebook: String,
      instagram: String,
    },
    contact: {
      email: String,
      phone: String,
    },
    trophies: [
      {
        name: String,
        year: Number,
        description: String,
      },
    ],
    budget: {
      type: Number,
      default: 0,
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

// Reverse populate with players
clubSchema.virtual('players', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'currentClub',
  justOne: false,
});

// Reverse populate with matches
clubSchema.virtual('matches', {
  ref: 'Match',
  localField: '_id',
  foreignField: {
    $in: ['homeTeam', 'awayTeam'],
  },
  justOne: false,
});

const Club = mongoose.model('Club', clubSchema);

export default Club;