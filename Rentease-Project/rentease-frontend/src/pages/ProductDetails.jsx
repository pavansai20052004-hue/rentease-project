import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/Products";
import "./Products.css";

const formatPrice = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h1>Product not found</h1>
          <p>The rental item you opened is no longer available.</p>
          <Link to="/products" className="button-primary">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell product-details-page">
      <section className="product-detail-grid">
        <img src={product.image} alt={product.name} className="product-detail-image" />

        <div className="product-detail-content">
          <span className="section-eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <div className="detail-price-grid">
            <div>
              <span>Monthly rent</span>
              <strong>{formatPrice(product.price)}</strong>
            </div>
            <div>
              <span>Refundable deposit</span>
              <strong>{formatPrice(product.deposit)}</strong>
            </div>
          </div>

          <ul className="spec-list">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>

          <button type="button" className="button-primary" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      </section>
    </main>
  );
}
