import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";

import { getProductById } from "../api/productApi";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen p-20 text-center">
        Loading product...
      </div>
    );
  }


  if (!product) {
    return (
      <div className="min-h-screen p-20 text-center">
        Product not found.
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">

      <div className="mx-auto max-w-6xl">

        <Link
          to="/shop"
          className="mb-8 inline-flex items-center gap-2 font-bold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>


        <div className="grid gap-12 rounded-[40px] bg-white p-6 shadow-sm md:grid-cols-2 md:p-12">

          <div className="flex min-h-[450px] items-center justify-center rounded-3xl bg-slate-50 p-10">

            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] w-full object-contain"
            />

          </div>


          <div className="flex flex-col justify-center">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950">
              {product.title}
            </h1>


            <div className="mt-4 flex items-center gap-2">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-bold">
                {product.rating?.rate}
              </span>

              <span className="text-slate-400">
                ({product.rating?.count} reviews)
              </span>

            </div>


            <p className="mt-6 text-3xl font-black text-slate-950">
              ${Number(product.price).toFixed(2)}
            </p>


            <p className="mt-6 leading-7 text-slate-600">
              {product.description}
            </p>


            <button
              onClick={() => addToCart(product)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <ShoppingCart size={19} />

              Add to Cart
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}

export default ProductDetails;