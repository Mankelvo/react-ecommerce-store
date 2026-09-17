import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");

    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [searchParams]);


  let displayedProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });


  if (sort === "low-high") {
    displayedProducts = [...displayedProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    displayedProducts = [...displayedProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="bg-slate-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-blue-400">
            Mankelvo Market
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Shop Our Collection
          </h1>

          <p className="mt-3 max-w-xl text-slate-400">
            Browse fashion, electronics, jewelry and more.
          </p>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-12">

        {/* FILTERS */}
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-3">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />


          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="all">
              All Categories
            </option>

            <option value="electronics">
              Electronics
            </option>

            <option value="men's clothing">
              Men's Clothing
            </option>

            <option value="women's clothing">
              Women's Clothing
            </option>

            <option value="jewelery">
              Jewelry
            </option>
          </select>


          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="default">
              Sort Products
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>
          </select>

        </div>


        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">
            Products
          </h2>

          <p className="text-sm text-slate-500">
            {displayedProducts.length} products
          </p>
        </div>


        {loading ? (
          <p className="py-20 text-center">
            Loading products...
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Shop;