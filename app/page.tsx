"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";

export default function HomePage() {
  const { data, isLoading, error, refetch } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const products = data ?? [];

  const categories = useMemo(
    () =>
      [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const min = minPrice.trim() === "" ? null : Number(minPrice);
    const max = maxPrice.trim() === "" ? null : Number(maxPrice);

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesMinPrice =
        min === null || product.price >= min;

      const matchesMaxPrice =
        max === null || product.price <= max;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [products, search, category, minPrice, maxPrice]);

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-6xl px-5">
        <section className="border-b border-gray-200 py-12 sm:py-16">
          <p className="text-sm font-medium text-gray-500">
            OUR CATALOGUE
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find your next favourite.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Browse our collection, search for products, and filter
            by category or price.
          </p>
        </section>

        <section id="products" className="py-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Browse the collection below.
              </p>
            </div>

            {!isLoading && !error && (
              <p className="text-sm text-gray-500">
                {filteredProducts.length} of {products.length} products
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
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

            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              error={error}
              onRetry={() => {
                void refetch();
              }}
            />
          </div>
        </section>

        <ProductForm />
      </div>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-gray-500">
        © 2026 Storefront. Built with Next.js
          and React.
        </div>
      </footer>
    </main>
  );
}