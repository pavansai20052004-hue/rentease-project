import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/Products";
import sofa from "../assets/sofa.jpg";
import "./Home.css";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="home-container">
      <section
        className="hero-section"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(8, 23, 32, 0.82), rgba(8, 23, 32, 0.3)), url(${sofa})` }}
      >
        <div className="hero-content">
          <span className="section-eyebrow">Rent smarter, move faster</span>
          <h1>RentEase</h1>
          <p>
            Flexible furniture and appliance rentals with transparent pricing,
            quick delivery, and service included throughout your rental.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="button-primary">
              Browse products
            </Link>
            <Link to="/register" className="button-secondary">
              Create account
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div>
          <strong>48 hr</strong>
          <span>delivery on selected items</span>
        </div>
        <div>
          <strong>0</strong>
          <span>hidden platform charges</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>rental support tracking</span>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <span className="section-eyebrow">Popular rentals</span>
          <h2>Ready-to-rent essentials</h2>
          <p>Curated items for new homes, temporary stays, and growing teams.</p>
        </div>

        <div className="home-products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="home-section process-section">
        <div className="section-heading">
          <span className="section-eyebrow">Simple process</span>
          <h2>From selection to doorstep</h2>
        </div>

        <div className="process-grid">
          {["Choose your item", "Add rental details", "Pay securely", "Track your rentals"].map(
            (step, index) => (
              <article className="process-card" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </article>
            )
          )}
        </div>
      </section>
    </main>
  );
}
