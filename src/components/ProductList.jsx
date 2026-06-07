import getProducts from "../api/productApi";
import { useState, useEffect } from "react";

function ProductList() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {
      loading? (<div className="text-center">Loading...</div>):
      (products.map(product => (
        <div className="bg-white p-4 shadow-md" key={product.id}>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4  " />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>)
      ))}
    </div>
  );
}

export default ProductList;