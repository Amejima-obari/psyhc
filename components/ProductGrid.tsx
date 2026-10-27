import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

export default function ProductGrid({
  products,
  isLoading,
  error,
  onRetry,
  wishlist,
  onToggleWishlist,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        role="status"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-lg border border-gray-200 bg-gray-50"
          />
        ))}

        <span className="sr-only">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center">
        <h3 className="font-semibold">Could not load products</h3>

        <p className="mt-2 text-sm text-gray-600">{error.message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Try again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 p-10 text-center">
        <h3 className="font-semibold">No products found</h3>

        <p className="mt-2 text-sm text-gray-600">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          onToggleWishlist={() => onToggleWishlist(product.id)}
        />
      ))}
    </div>
  );
}