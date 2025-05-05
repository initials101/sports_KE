import express from "express"
import {
  getScouts,
  getScoutById,
  updateScoutProfile,
  connectWithScout,
  respondToConnection,
} from "../controllers/scoutController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(protect, getScouts)

router.route("/profile").put(protect, authorize(["scout"]), updateScoutProfile)

router.route("/:id").get(protect, getScoutById)

router.route("/:id/connect").post(protect, connectWithScout)

router.route("/connections/:connectionId").put(protect, authorize(["scout"]), respondToConnection)

export default router
