import asyncHandler from 'express-async-handler';
import Player from '../models/playerModel.js';
import User from '../models/userModel.js';

// @desc    Get all players
// @route   GET /api/players
// @access  Public
const getPlayers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  
  // Build query based on filters
  const query = {};
  
  if (req.query.position) {
    query.position = req.query.position;
  }
  
  if (req.query.club) {
    query.currentClub = req.query.club;
  }
  
  if (req.query.age) {
    // Calculate the date of birth range for the requested age
    const today = new Date();
    const yearForMaxAge = today.getFullYear() - parseInt(req.query.age);
    const yearForMinAge = today.getFullYear() - (parseInt(req.query.age) + 1);
    
    query.dateOfBirth = {
      $gte: new Date(`${yearForMaxAge}-${today.getMonth() + 1}-${today.getDate()}`),
      $lt: new Date(`${yearForMinAge}-${today.getMonth() + 1}-${today.getDate()}`),
    };
  }
  
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    query.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
    ];
  }
  
  if (req.query.nationality) {
    query.nationality = req.query.nationality;
  }
  
  // Count total documents matching the query
  const total = await Player.countDocuments(query);
  
  // Get players with pagination
  const players = await Player.find(query)
    .populate('currentClub', 'name logo primaryColor')
    .populate('user', 'name email')
    .sort(req.query.sortBy ? { [req.query.sortBy]: req.query.order === 'desc' ? -1 : 1 } : { createdAt: -1 })
    .limit(limit)
    .skip(startIndex);
  
  res.json({
    players,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get player by ID
// @route   GET /api/players/:id
// @access  Public
const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id)
    .populate('currentClub', 'name logo primaryColor stadium league')
    .populate('user', 'name email profileImage')
    .populate('agent', 'name email');
  
  if (player) {
    res.json(player);
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Create a player
// @route   POST /api/players
// @access  Private
const createPlayer = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    height,
    weight,
    position,
    preferredFoot,
    currentClub,
    jerseyNumber,
    contractStartDate,
    contractEndDate,
    bio,
    userId,
  } = req.body;
  
  // Check if player already exists for the user
  const existingPlayer = await Player.findOne({ user: userId || req.user._id });
  
  if (existingPlayer) {
    res.status(400);
    throw new Error('Player profile already exists for this user');
  }
  
  const player = await Player.create({
    user: userId || req.user._id,
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    height,
    weight,
    position,
    preferredFoot,
    currentClub,
    jerseyNumber,
    contractStartDate,
    contractEndDate,
    bio,
  });
  
  if (player) {
    // Update user role to player if it's not already
    const user = await User.findById(userId || req.user._id);
    if (user && user.role !== 'player') {
      user.role = 'player';
      await user.save();
    }
    
    res.status(201).json(player);
  } else {
    res.status(400);
    throw new Error('Invalid player data');
  }
});

// @desc    Update a player
// @route   PUT /api/players/:id
// @access  Private
const updatePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  
  if (player) {
    // Only player, their agent, club manager or admin can update
    if (
      req.user._id.toString() !== player.user.toString() &&
      req.user.role !== 'admin' &&
      (player.agent && req.user._id.toString() !== player.agent.toString()) &&
      (req.user.role === 'clubManager' && req.user.club.toString() !== player.currentClub.toString())
    ) {
      res.status(403);
      throw new Error('Not authorized to update this player profile');
    }
    
    // Update allowed fields
    player.firstName = req.body.firstName || player.firstName;
    player.lastName = req.body.lastName || player.lastName;
    player.height = req.body.height || player.height;
    player.weight = req.body.weight || player.weight;
    player.position = req.body.position || player.position;
    player.preferredFoot = req.body.preferredFoot || player.preferredFoot;
    player.jerseyNumber = req.body.jerseyNumber || player.jerseyNumber;
    player.bio = req.body.bio || player.bio;
    
    // Fields that require specific permissions
    if (req.user.role === 'admin' || req.user.role === 'clubManager') {
      player.currentClub = req.body.currentClub || player.currentClub;
      player.contractStartDate = req.body.contractStartDate || player.contractStartDate;
      player.contractEndDate = req.body.contractEndDate || player.contractEndDate;
    }
    
    // Add statistics if provided
    if (req.body.statistics) {
      // Check if statistics for the season already exist
      const existingStatIndex = player.statistics.findIndex(
        s => s.season === req.body.statistics.season
      );
      
      if (existingStatIndex >= 0) {
        player.statistics[existingStatIndex] = {
          ...player.statistics[existingStatIndex],
          ...req.body.statistics,
        };
      } else {
        player.statistics.push(req.body.statistics);
      }
    }
    
    // Update social media if provided
    if (req.body.socialMedia) {
      player.socialMedia = {
        ...player.socialMedia,
        ...req.body.socialMedia,
      };
    }
    
    // Save changes
    const updatedPlayer = await player.save();
    
    res.json(updatedPlayer);
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Delete a player
// @route   DELETE /api/players/:id
// @access  Private/Admin
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  
  if (player) {
    if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to delete player profiles');
    }
    
    await player.deleteOne();
    res.json({ message: 'Player removed' });
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Add player injury
// @route   POST /api/players/:id/injuries
// @access  Private
const addPlayerInjury = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  
  if (player) {
    // Only club manager of player's club or admin can add injuries
    if (
      req.user.role !== 'admin' &&
      (req.user.role !== 'clubManager' || req.user.club.toString() !== player.currentClub.toString())
    ) {
      res.status(403);
      throw new Error('Not authorized to add injury records');
    }
    
    const { injury, startDate, endDate, description } = req.body;
    
    player.injuries.push({
      injury,
      startDate,
      endDate,
      description,
    });
    
    await player.save();
    
    res.status(201).json(player);
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Add player skill
// @route   POST /api/players/:id/skills
// @access  Private
const addPlayerSkill = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  
  if (player) {
    // Only club manager, scout, agent or admin can add skills
    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'scout' &&
      req.user.role !== 'agent' &&
      (req.user.role !== 'clubManager' || req.user.club.toString() !== player.currentClub.toString())
    ) {
      res.status(403);
      throw new Error('Not authorized to add skill ratings');
    }
    
    const { name, rating } = req.body;
    
    // Check if skill already exists
    const existingSkillIndex = player.skills.findIndex(s => s.name === name);
    
    if (existingSkillIndex >= 0) {
      player.skills[existingSkillIndex].rating = rating;
    } else {
      player.skills.push({
        name,
        rating,
      });
    }
    
    await player.save();
    
    res.status(201).json(player);
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Get top players
// @route   GET /api/players/top
// @access  Public
const getTopPlayers = asyncHandler(async (req, res) => {
  // Get top 10 players by market value
  const topByValue = await Player.find({})
    .populate('currentClub', 'name logo')
    .sort({ marketValue: -1 })
    .limit(10);
  
  // Get top 10 goalscorers from latest season
  const latestSeason = await Player.findOne({}).sort({ 'statistics.season': -1 });
  
  let topScorers = [];
  if (latestSeason && latestSeason.statistics.length > 0) {
    const season = latestSeason.statistics[0].season;
    
    // Aggregate pipeline to find top scorers
    topScorers = await Player.aggregate([
      { $unwind: '$statistics' },
      { $match: { 'statistics.season': season } },
      { $sort: { 'statistics.goals': -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'clubs',
          localField: 'currentClub',
          foreignField: '_id',
          as: 'clubInfo'
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          position: 1,
          goals: '$statistics.goals',
          assists: '$statistics.assists',
          club: { $arrayElemAt: ['$clubInfo.name', 0] },
          clubLogo: { $arrayElemAt: ['$clubInfo.logo', 0] }
        }
      }
    ]);
  }
  
  // Get fastest rising stars (highest % market value increase in past year)
  // This would typically involve comparing market values over time
  // For the MVP, we'll use players under 23 with highest market values
  const youngStars = await Player.find({})
    .populate('currentClub', 'name logo')
    .where('dateOfBirth').gte(new Date(new Date().setFullYear(new Date().getFullYear() - 23)))
    .sort({ marketValue: -1 })
    .limit(5);
  
  res.json({
    topByValue,
    topScorers,
    youngStars,
  });
});

export {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  addPlayerInjury,
  addPlayerSkill,
  getTopPlayers,
};