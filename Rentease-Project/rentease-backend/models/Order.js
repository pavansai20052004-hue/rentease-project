const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    deposit: { type: Number, default: 0, min: 0 },
    image: String,
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: { type: String, trim: true },
    items: {
      type: [orderItemSchema],
      validate: [(items) => items.length > 0, "At least one item is required"],
    },
    startDate: Date,
    endDate: Date,
    totalRent: { type: Number, default: 0, min: 0 },
    totalDeposit: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, default: 0, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
