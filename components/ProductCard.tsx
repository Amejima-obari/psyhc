import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="relative flex h-52 items-center justify-center bg-gray-50 p-5">
        <button
          type="button"
          onClick={onToggleWishlist}
          aria-pressed={isWishlisted}
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-105 hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition ${
              isWishlisted
                ? "fill-red-500 stroke-red-500"
                : "fill-none stroke-gray-600"
            }`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-2 text-xs capitalize text-gray-500">
          {product.category.replaceAll("-", " ")}
        </p>

        <h3 className="line-clamp-2 font-semibold">{product.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-lg font-semibold">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-sm text-gray-500">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}