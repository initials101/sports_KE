import express from "express"
import {
  getTransfers,
  getTransferById,
  createTransfer,
  updateTransferStatus,
  submitNegotiation,
  acceptNegotiation,
} from "../controllers/transferController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .get(protect, getTransfers)
  .post(protect, authorize(["clubManager", "agent", "admin"]), createTransfer)

router.route("/:id").get(protect, getTransferById)

router.route("/:id/status").put(protect, authorize(["clubManager", "admin"]), updateTransferStatus)

router.route("/:id/negotiations").post(protect, authorize(["clubManager", "agent", "admin"]), submitNegotiation)

router
  .route("/:id/negotiations/:negotiationId/accept")
  .put(protect, authorize(["clubManager", "admin"]), acceptNegotiation)

export default router
