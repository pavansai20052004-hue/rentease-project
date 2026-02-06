const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);