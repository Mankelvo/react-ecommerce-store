
import { useState} from "react";

function ProductCard({product}){
const [isExpanded, setIsExpanded] = useState(false);
const isLongDescription = product.description.length > 80;

return(
    <div className="bg-white p-4 shadow-md rounded-lg">
        <img
        src={product.image}
        alt = {product.name}
        className="w-full h-64 object-cover mb-4 rounded-md"
        />
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mt-2">
            {isExpanded 
            ? product.description 
        : isLongDescription
        ? `${product.description.slice(0,80)}...`
    :product.description
    }
        </p>
        {isLongDescription && (
            <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className=" mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
                {isExpanded ? "Show less" : "Read more"}
            </button>
        )}
        <p className="mt-3 text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
        </p>

    </div>
);
}

export default ProductCard;