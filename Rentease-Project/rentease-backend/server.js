require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", require("./routes/paymentsRoutes"));

app.get("/",(req,res)=>{
  res.send("Backend is running");
});

mongoose.connect("mongodb://127.0.0.1:27017/rentease")
  .then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => console.log("Server running on port 5000"));