const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { productName, startDate, endDate } = req.body;

    const order = new Order({
      user: "000000000000000000000001", // temporary user id
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
router.get("/", async (req, res) => {
  try {
    const userId = "000000000000000000000001"; // same temp user

    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;