
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

function ProductCard({ product, addToCart }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Link
        to={`/product/${product.id}`}
        className="flex h-64 items-center justify-center bg-slate-50 p-8"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">

        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 font-bold text-slate-900 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-1 text-sm text-slate-500">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>
            {product.rating?.rate ?? "N/A"}
          </span>

          <span>
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">

          <p className="text-xl font-black text-slate-950">
            ${Number(product.price).toFixed(2)}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-blue-600"
            aria-label="Add product to cart"
          >
            <ShoppingCart size={18} />
          </button>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;