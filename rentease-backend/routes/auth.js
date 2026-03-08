const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const {name, email, password } = req.body;
    if (!email || !passward){
      return res.status(400).json({ message:"Email and passward are required"});
    }

    const existing = await User.findOne({ email });
    if (existing){
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      " JWT_SECRET",
      { expiresIn: "1d" }
    );

      res.status(201).json({
      message: "Registration successful",
      token,
      user:{id:user._id,name:user.name,email:user.email},
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password){
      return res.status(400).json({ message:"Email and password are required"});
    }

    const user = await User.findOne({ email });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id },
       JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user:{id:user._id,name:user.name,email:user.email},
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;