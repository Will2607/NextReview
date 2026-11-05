// Isolated educational Client Component.
// "use client" creates a Client Component boundary.
// useEffect executes in the browser.
// Private credentials must not appear here.
// This is an educational example.

"use client";

import {
  useEffect,
  useState,
} from "react";

type Product = {
  id: number;
  name: string;
};

export default function ClientProducts() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response =
          await fetch("/api/products");

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data =
          (await response.json()) as Product[];

        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <main>
      <h1>Client Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
