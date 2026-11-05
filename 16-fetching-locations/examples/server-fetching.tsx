// Isolated educational Server Component.
// No "use client" is present.
// async/await can be used directly.
// The request happens server-side.
// Caching is outside this lesson.

type Product = {
  id: number;
  name: string;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://example.com/api/products"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products"
    );
  }

  return response.json() as Promise<Product[]>;
}

export default async function ServerProducts() {
  const products = await getProducts();

  return (
    <main>
      <h1>Server Products</h1>

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
