// Isolated educational example of server fetch plus a child list.
//
// In a real application, InteractiveProductList would be moved into a
// separate file with "use client" if it required state, effects, browser
// APIs, or event handlers.
//
// The architectural idea is:
// Server → fetch data.
// Client → receive serializable data through props and provide interactivity.

type Product = {
  id: number;
  name: string;
};

type ProductListProps = {
  products: Product[];
};

function InteractiveProductList({
  products,
}: ProductListProps) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}

async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 1,
      name: "Keyboard",
    },
    {
      id: 2,
      name: "Monitor",
    },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Products</h1>

      <InteractiveProductList
        products={products}
      />
    </main>
  );
}
