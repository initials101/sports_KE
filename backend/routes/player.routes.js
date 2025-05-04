import express from 'express';
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  addPlayerInjury,
  addPlayerSkill,
  getTopPlayers,
} from '../controllers/player.controller.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPlayers).post(protect, createPlayer);
router.get('/top', getTopPlayers);
router
  .route('/:id')
  .get(getPlayerById)
  .put(protect, updatePlayer)
  .delete(protect, authorize('admin'), deletePlayer);
router.route('/:id/injuries').post(protect, addPlayerInjury);
router.route('/:id/skills').post(protect, addPlayerSkill);

export default router;