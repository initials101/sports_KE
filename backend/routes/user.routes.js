import express from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .post(registerUser)
  .get(protect, authorize(["admin"]), getUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router
  .route("/:id")
  .delete(protect, authorize(["admin"]), deleteUser)
  .get(protect, authorize(["admin"]), getUserById)
  .put(protect, authorize(["admin"]), updateUser)

export default router
