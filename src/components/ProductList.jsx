import getProducts from "../api/productApi";
import { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProductId, setExpandedProductId] = useState(null)

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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-2 text-gray-600">
            Browse our latest collection of quality products.
          </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gray-50">
      {
      loading? (<div className="text-center">Loading...</div>):
      (products.map(product => (
        <div className="bg-white p-4 shadow-md" key={product.id}>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4  " />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-600">
            {expandedProductId === product.id
            ? product.description
           
            : `${product.description.slice(0,80)}...`
           
            
        }
        </p>
        <button
        onClick={() =>
          setExpandedProductId(
            expandedProductId === product.id? null : product.id 
          )
        }
        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
        {expandedProductId === product.id ? "Show less": "Read more"}
        </button>
          <p>${product.price.toFixed(2)}</p>
        </div>)
      ))}
    </div>
    </div>
    </div>
    </section>
  );
}

export default ProductList;