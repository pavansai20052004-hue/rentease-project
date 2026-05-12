import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/Products";
import "./Products.css";

const categories = ["All", ...new Set(products.map((product) => product.category))];

const Products = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="page-shell products-page">
      <section className="products-header">
        <div>
          <span className="section-eyebrow">Inventory</span>
          <h1>Furniture and appliances for rent</h1>
          <p>Browse verified rental items with upfront deposits and monthly prices.</p>
        </div>
        <div className="products-controls">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            aria-label="Search products"
          />
          <div className="category-tabs" aria-label="Filter products by category">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Products;
