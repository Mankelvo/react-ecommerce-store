
import { useState } from "react";

function ProductCard({product, addToCart}){

    const[isExpanded, setisExpanded] = useState(false);
    const isLongDescription = product.description.length > 80;

    return (

<div className=" max-w-7xl mx-auto grid-cols-1">
    
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow  duration-300">
            <img className=" w-full h-56 object-contain p-4 bg-gray-50"
            src={product.image}
            alt={product.title}
            />
            <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

            <p className="mt-2 text-sm text-gray-600 leading-6">
                {isExpanded
                ? product.description 
        : isLongDescription
        ? `${product.description.slice(0,80)}...`
    :product.description}
{isLongDescription && (<button
    onClick={()=>setisExpanded(!isExpanded)}
    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
    >
        {isExpanded
        ? "Show less" :
        "Read more"}
        
    </button>)}
    
            </p>
            <p className=" mt-4 text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <button onClick={()=>addToCart(product)} >+Add
            </button>
</div>
        </div>
    
</div>
    )
}

export default ProductCard;