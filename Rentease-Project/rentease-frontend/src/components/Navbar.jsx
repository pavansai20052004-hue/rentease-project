import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        <span className="brand-mark">R</span>
        <span>
          <strong>RentEase</strong>
          <small>Furniture and appliances</small>
        </span>
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Catalog</NavLink>
        <Link to="/#collections">Collections</Link>
        <Link to="/#plans">Plans</Link>
        <Link to="/#process">Process</Link>
        <Link to="/#support">Support</Link>
        {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        {isAuthenticated && <NavLink to="/my-rentals">My Rentals</NavLink>}
        <NavLink to="/cart" className="cart-link">
          Cart <span>{cartCount}</span>
        </NavLink>
      </nav>

      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="nav-user">{user?.name || "Account"}</span>
            <button type="button" className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="ghost-link">
              Login
            </NavLink>
            <NavLink to="/register" className="primary-link">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
