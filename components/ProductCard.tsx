import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex h-52 items-center justify-center bg-gray-50 p-5">
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

        <h3 className="line-clamp-2 font-semibold">
          {product.title}
        </h3>

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