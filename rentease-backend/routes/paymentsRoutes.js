const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const getRazorpayClient = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const payableAmount = Number(req.body.amount);

    if (!payableAmount || payableAmount <= 0) {
      return res.status(400).json({ message: "A valid payment amount is required" });
    }

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return res.status(500).json({ message: "Payment gateway is not configured" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(payableAmount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: "Razorpay order failed" });
  }
});

router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Payment verification data is required" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Payment gateway is not configured" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    return res.json({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports = router;
