import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const formatPrice = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

const Cart = () => {
  const { cart, removeFromCart, totalRent, totalDeposit, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Add furniture or appliances to start your rental checkout.</p>
          <Link to="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell cart-page">
      <section className="cart-header">
        <div>
          <span className="section-eyebrow">Cart</span>
          <h1>Your rental cart</h1>
        </div>
        <Link to="/products" className="ghost-link">
          Continue browsing
        </Link>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)} per month</p>
                <span>Deposit {formatPrice(item.deposit)}</span>
              </div>
              <label className="quantity-control">
                Qty
                <input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(event) => updateQuantity(item.productId, event.target.value)}
                />
              </label>
              <button type="button" className="text-button" onClick={() => removeFromCart(item.productId)}>
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Summary</h2>
          <div>
            <span>Monthly rent</span>
            <strong>{formatPrice(totalRent)}</strong>
          </div>
          <div>
            <span>Refundable deposit</span>
            <strong>{formatPrice(totalDeposit)}</strong>
          </div>
          <div className="summary-total">
            <span>Due today</span>
            <strong>{formatPrice(totalRent)}</strong>
          </div>
          <button type="button" className="button-primary" onClick={() => navigate("/checkout")}>
            Proceed to checkout
          </button>
        </aside>
      </section>
    </main>
  );
};

export default Cart;
