import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const formatPrice = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-badge">{product.badge}</span>
      </Link>

      <div className="product-card-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.rating} rating</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-signals">
          <span>{product.room}</span>
          <span>{product.delivery}</span>
          <span>{product.tenure}</span>
        </div>

        <div className="price-row">
          <div>
            <span>Monthly rent</span>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <div>
            <span>Deposit</span>
            <strong>{formatPrice(product.deposit)}</strong>
          </div>
        </div>

        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="ghost-link">
            Details
          </Link>
          <button type="button" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
