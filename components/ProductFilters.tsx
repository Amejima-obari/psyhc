interface ProductFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    categories: string[];
    minPrice: string;
    onMinPriceChange: (value: string) => void;
    maxPrice: string;
    onMaxPriceChange: (value: string) => void;
    onReset: () => void;
  }
  
  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black";
  
  export default function ProductFilters({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    categories,
    minPrice,
    onMinPriceChange,
    maxPrice,
    onMaxPriceChange,
    onReset,
  }: ProductFiltersProps) {
    return (
      <section
        aria-label="Product filters"
        className="space-y-4 rounded-lg border border-gray-200 p-4"
      >
        <div>
          <label
            htmlFor="search"
            className="mb-1.5 block text-sm font-medium"
          >
            Search products
          </label>
  
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by product name..."
            className={inputClass}
          />
        </div>
  
        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-sm font-medium"
          >
            Category
          </label>
  
          <select
            id="category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={inputClass}
          >
            <option value="all">All categories</option>
  
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <p className="mb-2 text-sm font-medium">Price range ($)</p>
  
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="min-price"
                className="mb-1 block text-xs text-gray-500"
              >
                Minimum
              </label>
  
              <input
                id="min-price"
                type="number"
                min="0"
                step="0.01"
                value={minPrice}
                onChange={(event) =>
                  onMinPriceChange(event.target.value)
                }
                placeholder="0"
                className={inputClass}
              />
            </div>
  
            <div>
              <label
                htmlFor="max-price"
                className="mb-1 block text-xs text-gray-500"
              >
                Maximum
              </label>
  
              <input
                id="max-price"
                type="number"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={(event) =>
                  onMaxPriceChange(event.target.value)
                }
                placeholder="Any"
                className={inputClass}
              />
            </div>
          </div>
        </div>
  
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
        >
          Clear filters
        </button>
      </section>
    );
  }