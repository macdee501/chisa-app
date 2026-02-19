export type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images?: string[];
};

const BASE = "https://dummyjson.com";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getProductsByCategory(category: string): Promise<DummyProduct[]> {
  const data = await fetchJson<{ products: DummyProduct[] }>(
    `${BASE}/products/category/${encodeURIComponent(category)}`
  );
  return data.products;
}

export async function getProduct(id: string | number): Promise<DummyProduct> {
  return fetchJson<DummyProduct>(`${BASE}/products/${id}`);
}
