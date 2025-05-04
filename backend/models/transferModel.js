import mongoose from 'mongoose';

const negotiationSchema = mongoose.Schema(
  {
    offeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    responseMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const transferSchema = mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    fromClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    toClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transferType: {
      type: String,
      enum: ['permanent', 'loan'],
      default: 'permanent',
    },
    askingPrice: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },
    negotiations: [negotiationSchema],
    status: {
      type: String,
      enum: ['initiated', 'negotiating', 'agreed', 'completed', 'cancelled', 'rejected'],
      default: 'initiated',
    },
    contractLength: {
      years: {
        type: Number,
        default: 0,
      },
      months: {
        type: Number,
        default: 0,
      },
    },
    loanDuration: {
      months: {
        type: Number,
      },
    },
    contractDetails: {
      type: String,
    },
    completedDate: {
      type: Date,
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add automatic notification to involved parties on transfer status update
transferSchema.pre('save', async function (next) {
  if (this.isModified('status')) {
    // Here we would typically create notifications or trigger Socket.IO events
    // This would be expanded in a real implementation
    console.log(`Transfer status updated to ${this.status}`);
  }
  next();
});

const Transfer = mongoose.model('Transfer', transferSchema);

export default Transfer;