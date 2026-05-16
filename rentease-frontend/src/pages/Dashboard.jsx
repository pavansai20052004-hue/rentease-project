import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const formatPrice = (value = 0) => `Rs. ${Number(value).toLocaleString("en-IN")}`;

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load orders right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    const activeOrders = orders.filter((order) => order.status === "Active").length;
    const totalRent = orders.reduce((sum, order) => sum + (order.totalRent || order.totalAmount || 0), 0);

    return [
      { label: "Active rentals", value: activeOrders },
      { label: "Total orders", value: orders.length },
      { label: "Monthly rent", value: formatPrice(totalRent) },
    ];
  }, [orders]);

  return (
    <main className="page-shell dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="section-eyebrow">Account</span>
          <h1>Hi {user?.name || "there"}, manage your rentals</h1>
          <p>Track payment status, active items, and upcoming rental windows.</p>
        </div>
        <Link to="/products" className="button-primary">
          Add rental
        </Link>
      </section>

      <section className="dashboard-stats">
        {stats.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="orders-section">
        <div className="section-heading compact">
          <span className="section-eyebrow">Recent activity</span>
          <h2>Your orders</h2>
        </div>

        {loading && <p className="muted-text">Loading orders...</p>}
        {error && <div className="form-error">{error}</div>}
        {!loading && !error && orders.length === 0 && (
          <div className="empty-state slim">
            <h3>No rentals yet</h3>
            <p>Your active rentals will appear here after checkout.</p>
          </div>
        )}

        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order._id}>
              <div>
                <h3>{order.productName || "Rental order"}</h3>
                <p>{order.items?.length || 1} item rental</p>
              </div>
              <div>
                <span>Payment</span>
                <strong className="status-pill">{order.paymentStatus || "Pending"}</strong>
              </div>
              <div>
                <span>Monthly rent</span>
                <strong>{formatPrice(order.totalRent || order.totalAmount)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
