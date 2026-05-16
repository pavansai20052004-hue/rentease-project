import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, createPaymentOrder, verifyPayment } from "../api/authApi";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const formatPrice = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

const Checkout = () => {
  const { cart, clearCart, totalRent, totalDeposit } = useCart();
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Add a rental item before checkout.</p>
          <Link to="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  const createRentalOrder = async (paymentStatus = "Paid") => {
    const payload = {
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        deposit: item.deposit,
        image: item.image,
        quantity: item.quantity || 1,
      })),
      startDate: dates.startDate,
      endDate: dates.endDate,
      totalRent,
      totalDeposit,
      totalAmount: totalRent,
      paymentStatus,
      status: "Active",
    };

    await createOrder(payload);
  };

  const handlePayment = async () => {
    setError("");

    if (!dates.startDate || !dates.endDate) {
      setError("Please choose rental start and end dates.");
      return;
    }

    if (new Date(dates.endDate) < new Date(dates.startDate)) {
      setError("End date must be after start date.");
      return;
    }

    if (!window.Razorpay) {
      setError("Payment checkout is unavailable. Please refresh and try again.");
      return;
    }

    setLoading(true);

    try {
      const { data: order } = await createPaymentOrder(totalRent);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_SBvNqn9uXZSi19",
        amount: order.amount,
        currency: "INR",
        name: "RentEase",
        description: "Rental payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyPayment(response);
            await createRentalOrder("Paid");
            clearCart();
            navigate("/success");
          } catch (err) {
            setError(
              err.response?.data?.message ||
                "Payment succeeded, but verification or order save failed."
            );
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#125f54" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="page-shell checkout-page">
      <section className="checkout-header">
        <span className="section-eyebrow">Checkout</span>
        <h1>Confirm your rental</h1>
      </section>

      <section className="checkout-layout">
        <div className="checkout-card">
          <h2>Rental window</h2>
          <div className="date-grid">
            <label>
              Start date
              <input
                type="date"
                value={dates.startDate}
                onChange={(event) => setDates((prev) => ({ ...prev, startDate: event.target.value }))}
              />
            </label>
            <label>
              End date
              <input
                type="date"
                value={dates.endDate}
                onChange={(event) => setDates((prev) => ({ ...prev, endDate: event.target.value }))}
              />
            </label>
          </div>
          {error && <div className="form-error">{error}</div>}
        </div>

        <aside className="checkout-card checkout-summary">
          <h2>Order summary</h2>
          {cart.map((item) => (
            <div className="checkout-line" key={item.productId}>
              <span>
                {item.name} x {item.quantity || 1}
              </span>
              <strong>{formatPrice((item.price || 0) * (item.quantity || 1))}</strong>
            </div>
          ))}
          <div className="checkout-line">
            <span>Refundable deposit</span>
            <strong>{formatPrice(totalDeposit)}</strong>
          </div>
          <div className="checkout-total">
            <span>Pay now</span>
            <strong>{formatPrice(totalRent)}</strong>
          </div>
          <button type="button" className="button-primary" onClick={handlePayment} disabled={loading}>
            {loading ? "Opening payment..." : "Pay securely"}
          </button>
        </aside>
      </section>
    </main>
  );
};

export default Checkout;
