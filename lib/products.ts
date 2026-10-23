export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    rating: number;
  }
  
  interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  const API_URL = "https://dummyjson.com/products?limit=100";
  
  export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
  
    if (!response.ok) {
      throw new Error("Unable to load products. Please try again.");
    }
  
    const data: ProductsResponse = await response.json();
  
    return data.products;
  }