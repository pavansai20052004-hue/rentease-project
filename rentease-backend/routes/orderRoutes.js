const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productName, startDate, endDate } = req.body;

    const order = new Order({
      user: req.user.id, // use the authenticated user's id
      productName,
      startDate,
      endDate,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

// GET ALL ORDERS
router.get("/",authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // use the authenticated user's id

    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;