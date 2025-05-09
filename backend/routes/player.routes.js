import express from "express"
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  addPlayerSkill,
  addPlayerStatistic,
} from "../controllers/player.controller.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getPlayers).post(protect, createPlayer)

router
  .route("/:id")
  .get(getPlayerById)
  .put(protect, updatePlayer)
  .delete(protect, authorize(["admin"]), deletePlayer)

router.route("/:id/skills").post(protect, addPlayerSkill)
router.route("/:id/statistics").post(protect, addPlayerStatistic)

export default router
