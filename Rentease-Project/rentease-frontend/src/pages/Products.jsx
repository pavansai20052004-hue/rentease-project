import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/Products";
import "./Products.css";

const categories = ["All", ...new Set(products.map((product) => product.category))];
const sortOptions = ["Featured", "Price: Low to High", "Top Rated", "Fast Delivery"];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(() => {
    const requestedCategory = searchParams.get("category");
    return categories.includes(requestedCategory) ? requestedCategory : "All";
  });
  const [sortBy, setSortBy] = useState("Featured");

  useEffect(() => {
    const requestedCategory = searchParams.get("category");

    if (categories.includes(requestedCategory)) {
      setCategory(requestedCategory);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matches = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const searchableText = [
        product.name,
        product.category,
        product.room,
        product.badge,
        product.description,
        ...(product.specs || []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    return [...matches].sort((a, b) => {
      if (sortBy === "Price: Low to High") {
        return a.price - b.price;
      }

      if (sortBy === "Top Rated") {
        return b.rating - a.rating;
      }

      if (sortBy === "Fast Delivery") {
        const deliveryScore = (item) =>
          item.delivery.toLowerCase().includes("next") ||
          item.delivery.toLowerCase().includes("48") ||
          item.delivery.toLowerCase().includes("same")
            ? 0
            : 1;
        return deliveryScore(a) - deliveryScore(b);
      }

      return b.availableUnits - a.availableUnits;
    });
  }, [category, query, sortBy]);

  const catalogStats = [
    { label: "Curated items", value: `${products.length}+` },
    { label: "Categories", value: categories.length - 1 },
    { label: "Avg rating", value: "4.7" },
  ];

  return (
    <main className="page-shell products-page">
      <section className="products-header">
        <div>
          <span className="section-eyebrow">Inventory</span>
          <h1>Premium rentals for every room</h1>
          <p>
            Browse verified furniture, appliances, electronics, fitness gear, and ready-made
            room bundles with clear monthly pricing.
          </p>
          <div className="catalog-stats">
            {catalogStats.map((stat) => (
              <span key={stat.label}>
                <strong>{stat.value}</strong>
                {stat.label}
              </span>
            ))}
          </div>
        </div>
        <div className="products-controls">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by item, room, or feature"
            aria-label="Search products"
          />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort products"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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

      <section className="results-bar" aria-live="polite">
        <span>
          Showing <strong>{filteredProducts.length}</strong> rental options
        </span>
        <span>{category === "All" ? "All categories" : category}</span>
      </section>

      <section className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <section className="empty-state slim">
          <h2>No matching rentals</h2>
          <p>Try a different category, room, or product name.</p>
        </section>
      )}
    </main>
  );
};

export default Products;
