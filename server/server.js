import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import socketHandler from "./socket.js"; // import socket logic
import authRoutes from "./routes/auth.js"; // import auth routes

// Load env vars
dotenv.config();

// Connect MongoDB Atlas
connectDB();

const app = express();

const FRONTEND_ORIGIN = "http://localhost:5173"; // Vite default

// Middlewares
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Test API route
app.get("/", (req, res) => {
  res.send("✅ API is running and MongoDB is connected...");
});

// API routes
app.use("/api/auth", authRoutes); // mount auth routes

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Pass socket.io to handler
socketHandler(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
