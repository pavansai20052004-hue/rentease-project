import { useEffect, useState } from "react";
import { getOrders } from "../api/authApi";
import "./Dashboard.css";

const formatDate = (value) => (value ? new Date(value).toLocaleDateString("en-IN") : "Not selected");

const MyRentals = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const { data } = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load rentals.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return (
    <main className="page-shell rentals-page">
      <section className="dashboard-hero compact-hero">
        <div>
          <span className="section-eyebrow">Rentals</span>
          <h1>My rentals</h1>
          <p>Review rental dates, item status, and payment confirmation.</p>
        </div>
      </section>

      {loading && <p className="muted-text">Loading rentals...</p>}
      {error && <div className="form-error">{error}</div>}
      {!loading && !error && orders.length === 0 && (
        <div className="empty-state">
          <h2>No rentals found</h2>
          <p>Completed checkouts will appear here.</p>
        </div>
      )}

      <section className="rental-grid">
        {orders.map((order) => (
          <article className="rental-card" key={order._id}>
            <div>
              <span className="status-pill">{order.status || "Active"}</span>
              <h3>{order.productName || "Rental order"}</h3>
            </div>
            <div className="rental-dates">
              <span>From {formatDate(order.startDate)}</span>
              <span>To {formatDate(order.endDate)}</span>
            </div>
            <ul>
              {(order.items || []).map((item) => (
                <li key={`${order._id}-${item.name}`}>
                  {item.name} x {item.quantity || 1}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
};

export default MyRentals;
