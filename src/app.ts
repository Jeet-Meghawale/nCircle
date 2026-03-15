import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// JSON parser
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running",
  });
});

// API routes
app.use("/", routes);

// Global error handler
app.use(errorHandler);

export default app;