const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeItems = (body) => {
  if (Array.isArray(body.items) && body.items.length > 0) {
    return body.items.map((item) => ({
      productId: item.productId || item.id || item._id,
      name: item.name,
      price: toNumber(item.price),
      deposit: toNumber(item.deposit),
      image: item.image,
      quantity: Math.max(1, toNumber(item.quantity) || 1),
    }));
  }

  if (body.productName) {
    return [
      {
        productId: body.productId,
        name: body.productName,
        price: toNumber(body.price),
        deposit: toNumber(body.deposit),
        quantity: 1,
      },
    ];
  }

  return [];
};

// CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const items = normalizeItems(req.body).filter((item) => item.name);

    if (items.length === 0) {
      return res.status(400).json({ message: "At least one order item is required" });
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    const totalRent =
      req.body.totalRent ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDeposit =
      req.body.totalDeposit ?? items.reduce((sum, item) => sum + item.deposit * item.quantity, 0);

    const order = new Order({
      user: req.user.id,
      productName: req.body.productName || items.map((item) => item.name).join(", "),
      items,
      startDate,
      endDate,
      totalRent,
      totalDeposit,
      totalAmount: req.body.totalAmount ?? totalRent,
      paymentStatus: req.body.paymentStatus || "Pending",
      status: req.body.status || "Active",
    });

    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Order creation failed" });
  }
});

// GET ALL ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
