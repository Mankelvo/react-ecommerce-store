import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Could not load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      name: "Electronics",
      apiName: "electronics",
      icon: "💻",
    },
    {
      name: "Men's Clothing",
      apiName: "men's clothing",
      icon: "👕",
    },
    {
      name: "Women's Clothing",
      apiName: "women's clothing",
      icon: "👗",
    },
    {
      name: "Jewelry",
      apiName: "jewelery",
      icon: "💎",
    },
  ];

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Welcome to Mankelvo Market
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-tight sm:text-6xl">
              Discover Something
              <span className="text-blue-500"> You'll Love.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Shop fashion, electronics, jewelry and everyday
              essentials in one simple marketplace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-bold text-white transition hover:bg-blue-500"
              >
                Shop Collection
                <ArrowRight size={18} />
              </Link>

              <a
                href="#featured"
                className="rounded-full border border-slate-700 px-7 py-4 font-bold text-white transition hover:bg-slate-800"
              >
                Explore Products
              </a>
            </div>
          </div>

          {/* HERO PRODUCT IMAGE */}
          <div className="relative">
            <div className="rounded-[40px] bg-white p-10 shadow-2xl">
              {products[0] ? (
                <img
                  src={products[0].image}
                  alt={products[0].title}
                  className="mx-auto h-[350px] w-full object-contain"
                />
              ) : (
                <div className="h-[350px]" />
              )}
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-blue-600 px-5 py-4 shadow-xl">
              <p className="text-xs font-semibold text-blue-100">
                Featured Collection
              </p>

              <p className="font-black text-white">
                Shop Mankelvo
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Browse
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Shop by Category
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.apiName}
              to={`/shop?category=${encodeURIComponent(
                category.apiName
              )}`}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl"
            >
              <div className="text-5xl">
                {category.icon}
              </div>

              <h3 className="mt-5 font-black text-slate-900">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Explore collection
              </p>
            </Link>
          ))}
        </div>
      </section>


      {/* FEATURED PRODUCTS */}
      <section
        id="featured"
        className="bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Our Collection
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Featured Products
              </h2>
            </div>

            <Link
              to="/shop"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              View all products →
            </Link>

          </div>

          {loading ? (
            <p className="mt-10 text-slate-500">
              Loading products...
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}

        </div>
      </section>


      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-950">
            Why Shop Mankelvo?
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <Benefit
            icon={<ShieldCheck />}
            title="Secure Shopping"
            description="A simple and trustworthy shopping experience."
          />

          <Benefit
            icon={<Truck />}
            title="Fast Experience"
            description="Browse products quickly from anywhere."
          />

          <Benefit
            icon={<RotateCcw />}
            title="Easy Shopping"
            description="Simple navigation, cart management and checkout."
          />

        </div>
      </section>


      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-blue-600 px-6 py-14 text-center text-white sm:px-12">

          <h2 className="text-3xl font-black">
            Stay in the loop
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-blue-100">
            Get updates about products and future Mankelvo
            collections.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-white px-6 py-4 text-slate-900 outline-none"
            />

            <button
              type="submit"
              className="rounded-full bg-slate-950 px-7 py-4 font-bold"
            >
              Subscribe
            </button>
          </form>

        </div>
      </section>

    </main>
  );
}


function Benefit({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default Home;