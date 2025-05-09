import express from "express"
import { getClubs, getClubById, createClub, updateClub, deleteClub } from "../controllers/club.controller.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .get(getClubs)
  .post(protect, authorize(["admin", "clubManager"]), createClub)

router
  .route("/:id")
  .get(getClubById)
  .put(protect, authorize(["admin", "clubManager"]), updateClub)
  .delete(protect, authorize(["admin"]), deleteClub)

export default router
