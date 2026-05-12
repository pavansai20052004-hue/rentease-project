import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>RentEase</h2>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/my-rentals">Rentals</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/">Home</NavLink>
    </aside>
  );
}
