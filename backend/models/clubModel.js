import mongoose from "mongoose"

const clubSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
    },
    founded: {
      type: Number,
    },
    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    stadium: {
      name: {
        type: String,
      },
      capacity: {
        type: Number,
      },
      location: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    location: {
      city: {
        type: String,
      },
      country: {
        type: String,
        default: "Kenya",
      },
    },
    league: {
      type: String,
    },
    website: {
      type: String,
    },
    colors: {
      primary: {
        type: String,
      },
      secondary: {
        type: String,
      },
    },
    manager: {
      name: {
        type: String,
      },
      nationality: {
        type: String,
      },
      appointedDate: {
        type: Date,
      },
    },
    description: {
      type: String,
    },
    socialMedia: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for getting players in the club
clubSchema.virtual("players", {
  ref: "Player",
  localField: "_id",
  foreignField: "currentClub",
})

const Club = mongoose.model("Club", clubSchema)

export default Club
