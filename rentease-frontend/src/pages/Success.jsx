import { Link } from "react-router-dom";
import "./Success.css";

const Success = () => {
  return (
    <main className="success-page">
      <section className="success-panel">
        <span className="success-mark">✓</span>
        <span className="section-eyebrow">Payment confirmed</span>
        <h1>Order successful</h1>
        <p>Your rental order has been placed and saved to your account.</p>
        <div className="success-actions">
          <Link to="/dashboard" className="button-primary">
            Go to dashboard
          </Link>
          <Link to="/products" className="ghost-link">
            Browse more
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Success;
