require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rentease";
const DB_RETRY_MS = Number(process.env.DB_RETRY_MS) || 15000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

if (process.env.NODE_ENV === "production") {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required in production");
  }

  if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL is required in production");
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "RentEase API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "rentease-api",
    database: mongoose.connection.readyState === 1 ? "connected" : "reconnecting",
  });
});

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  return res.status(503).json({
    message: "The rental service is starting up. Please try again shortly.",
  });
};

app.use("/api/auth", requireDatabase, require("./routes/auth"));
app.use("/api/orders", requireDatabase, require("./routes/orderRoutes"));
app.use("/api/payments", requireDatabase, require("./routes/paymentsRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

let retryTimer;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log(`Retrying MongoDB connection in ${Math.round(DB_RETRY_MS / 1000)} seconds`);
    clearTimeout(retryTimer);
    retryTimer = setTimeout(connectToDatabase, DB_RETRY_MS);
  }
};

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectToDatabase();

const shutdown = async () => {
  clearTimeout(retryTimer);
  await mongoose.disconnect();
  server.close(() => process.exit(0));
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
