require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rentease";
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

if (isProduction) {
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

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }

  return next(error);
});

const getDatabaseStatus = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return states[mongoose.connection.readyState] || "unknown";
};

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  return res.status(503).json({
    message: "Database is not connected. Start MongoDB or set MONGO_URI.",
    database: getDatabaseStatus(),
  });
};

app.get("/", (req, res) => {
  res.json({
    message: "RentEase API is running",
    database: getDatabaseStatus(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "rentease-api",
    database: getDatabaseStatus(),
  });
});

app.use("/api/auth", requireDatabase, require("./routes/auth"));
app.use("/api/orders", requireDatabase, require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentsRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error("Unhandled server error:", error.message);
  res.status(500).json({ message: "Internal server error" });
});

const startServer = () => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
  });
};

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected to MongoDB");
    startServer();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);

    if (isProduction) {
      process.exit(1);
    }

    console.warn("Starting API without MongoDB. Database-backed routes will return 503.");
    startServer();
  });
