import { useState } from "react";
import products from "../data/Products";
import "./Dashboard.css";

const Admin = () => {
  const [draft, setDraft] = useState({ name: "", price: "" });
  const [localProducts, setLocalProducts] = useState(products);

  const addProduct = (event) => {
    event.preventDefault();

    if (!draft.name || !draft.price) {
      return;
    }

    setLocalProducts((prev) => [
      {
        id: draft.name.toLowerCase().replace(/\s+/g, "-"),
        name: draft.name,
        category: "Draft",
        price: Number(draft.price),
        deposit: 0,
        rating: 0,
        delivery: "Not published",
      },
      ...prev,
    ]);
    setDraft({ name: "", price: "" });
  };

  return (
    <main className="page-shell admin-page">
      <section className="dashboard-hero compact-hero">
        <div>
          <span className="section-eyebrow">Admin</span>
          <h1>Inventory workspace</h1>
          <p>Prototype product entries before connecting a full admin database.</p>
        </div>
      </section>

      <section className="admin-layout">
        <form className="checkout-card" onSubmit={addProduct}>
          <h2>Add draft product</h2>
          <label>
            Product name
            <input
              value={draft.name}
              onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Example: Study table"
            />
          </label>
          <label>
            Monthly price
            <input
              type="number"
              value={draft.price}
              onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))}
              placeholder="1200"
            />
          </label>
          <button type="submit" className="button-primary">
            Add draft
          </button>
        </form>

        <div className="orders-list">
          {localProducts.map((product) => (
            <article className="order-card" key={product.id}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
              </div>
              <strong>Rs. {Number(product.price).toLocaleString("en-IN")}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Admin;
