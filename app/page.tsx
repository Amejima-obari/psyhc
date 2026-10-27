"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useWishlist } from "@/hooks/useWishlist";

export default function HomePage() {
  const { data, isLoading, error, refetch } = useProducts();
  const { wishlist, toggleWishlist } = useWishlist();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // inputs update instantly, filtering waits until user stops typing
  const debouncedSearch = useDebounce(search);
  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);

  const products = data ?? [];

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const min = debouncedMinPrice.trim() === "" ? null : Number(debouncedMinPrice);
    const max = debouncedMaxPrice.trim() === "" ? null : Number(debouncedMaxPrice);

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesMinPrice = min === null || product.price >= min;
      const matchesMaxPrice = max === null || product.price <= max;

      const matchesWishlist =
        !showWishlistOnly || wishlist.includes(product.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesWishlist
      );
    });
  }, [
    products,
    debouncedSearch,
    category,
    debouncedMinPrice,
    debouncedMaxPrice,
    showWishlistOnly,
    wishlist,
  ]);

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setShowWishlistOnly(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-6xl px-5">
        <section className="border-b border-gray-200 py-12 sm:py-16">
          <p className="text-sm font-medium text-gray-500">OUR CATALOGUE</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find your next favourite.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Browse our collection, search for products, and filter by category
            or price.
          </p>
        </section>

        <section id="products" className="py-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Browse the collection below.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {!isLoading && !error && (
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} of {products.length} products
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowWishlistOnly((prev) => !prev)}
                aria-pressed={showWishlistOnly}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  showWishlistOnly
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"
                }`}
              >
                Wishlist ({wishlist.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
            {/* sticky sidebar on desktop. Change top-20 to match your navbar height */}
            <div className="md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto">
              <ProductFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                categories={categories}
                minPrice={minPrice}
                onMinPriceChange={setMinPrice}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
                onReset={clearFilters}
              />
            </div>

            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              error={error}
              onRetry={() => {
                void refetch();
              }}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        </section>

        <ProductForm />
      </div>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-gray-500">
          © 2026 it-project-store.
        </div>
      </footer>
    </main>
  );
}