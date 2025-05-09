import colors from "colors"

import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

import userRoutes from "./routes/user.routes.js"
import playerRoutes from "./routes/player.routes.js"
import clubRoutes from "./routes/club.routes.js"
import transferRoutes from "./routes/transfer.routes.js"
import scoutRoutes from "./routes/scout.routes.js"

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Body parser
app.use(express.json())

// Enable CORS with specific options
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// API routes
app.use("/api/users", userRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/clubs", clubRoutes)
app.use("/api/transfers", transferRoutes)
app.use("/api/scouts", scoutRoutes)

// Get current file directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  // Any route not caught by API will load the index.html
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html")))
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

// Error middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
