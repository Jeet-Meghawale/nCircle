import express from "express"
import cors from "cors"
import helmet from "helmet"

const app = express()

// Security middleware
app.use(helmet())

// CORS
app.use(cors())

// Parse JSON body
app.use(express.json())

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running"
  })
})

// Auth routes
import authRoutes from "../src/modules/auth/auth.routes"
app.use("/auth", authRoutes)
export default app