import getProducts from "../api/productApi";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList({addToCart}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-2 text-gray-600">
            Browse our latest collection of quality products.
          </p>
          </div>
    <div>
      {
      loading? (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
        </div>

      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100">
       {
        products.map((product) =>(
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
    </div>
      )}
    </div>
    
    </div>
    </section>
  );
}

export default ProductList;