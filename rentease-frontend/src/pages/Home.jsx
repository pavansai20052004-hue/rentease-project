import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/Products";
import sofa from "../assets/sofa.jpg";
import "./Home.css";

export default function Home() {
  const featuredProducts = products
    .filter((product) => ["Best seller", "Bundle value", "Energy saver", "WFH pick"].includes(product.badge))
    .slice(0, 4);

  const collections = [
    {
      title: "Full Home Setup",
      detail: "Bedroom, living, kitchen, and utility essentials bundled for quick move-ins.",
      count: "18 items",
    },
    {
      title: "Work From Anywhere",
      detail: "Desk, chair, monitor-ready surfaces, and quiet productivity upgrades.",
      count: "9 items",
    },
    {
      title: "Appliance Core",
      detail: "Daily-use machines with installation, relocation, and service support.",
      count: "11 items",
    },
  ];

  const plans = [
    { name: "Starter", price: "From Rs. 2,400/mo", detail: "Perfect for students and compact studios." },
    { name: "Family", price: "From Rs. 6,800/mo", detail: "Room-by-room essentials with flexible swaps." },
    { name: "Business", price: "Custom quote", detail: "Bulk rentals for teams, stays, and offices." },
  ];

  const supportHighlights = [
    "Maintenance included",
    "Flexible swaps",
    "Relocation support",
    "Verified inventory",
  ];

  return (
    <main className="home-container">
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(8, 23, 32, 0.84), rgba(8, 23, 32, 0.36)), url(${sofa})`,
        }}
      >
        <div className="hero-content">
          <span className="section-eyebrow">Rent smarter, move faster</span>
          <h1>RentEase</h1>
          <p>
            Premium furniture, appliances, electronics, and complete room bundles with clear
            monthly pricing, quick delivery, and service throughout the rental.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="button-primary">
              Browse products
            </Link>
            <Link to="/register" className="button-secondary">
              Create account
            </Link>
          </div>
          <div className="hero-metrics" aria-label="RentEase highlights">
            <span>
              <strong>{products.length}+</strong>
              rental picks
            </span>
            <span>
              <strong>4.7</strong>
              average rating
            </span>
            <span>
              <strong>48 hr</strong>
              fast delivery
            </span>
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
        <div>
          <strong>6+</strong>
          <span>inventory categories</span>
        </div>
      </section>

      <section className="home-section" id="collections">
        <div className="section-heading split-heading">
          <div>
            <span className="section-eyebrow">Collections</span>
            <h2>Rent by room, lifestyle, or move-in goal</h2>
          </div>
          <Link to="/products" className="ghost-link">
            View catalog
          </Link>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <article className="collection-card" key={collection.title}>
              <span>{collection.count}</span>
              <h3>{collection.title}</h3>
              <p>{collection.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="featured">
        <div className="section-heading">
          <span className="section-eyebrow">Popular rentals</span>
          <h2>Ready-to-rent essentials with a premium finish</h2>
          <p>Curated items for new homes, temporary stays, students, families, and teams.</p>
        </div>

        <div className="home-products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="home-section plans-section" id="plans">
        <div className="section-heading split-heading">
          <div>
            <span className="section-eyebrow">Plans</span>
            <h2>Flexible packages for every stay length</h2>
          </div>
          <Link to="/products?category=Packages" className="ghost-link">
            Explore bundles
          </Link>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article className="plan-card" key={plan.name}>
              <span>{plan.name}</span>
              <strong>{plan.price}</strong>
              <p>{plan.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section process-section" id="process">
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

      <section className="support-band" id="support">
        <div>
          <span className="section-eyebrow">Support</span>
          <h2>Rental care that stays active after delivery</h2>
          <p>
            RentEase keeps service, swaps, and move support tied to every item so renters do not
            have to chase separate vendors.
          </p>
        </div>
        <div className="support-grid">
          {supportHighlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
