import getProducts from "../api/productApi";
import { useState, useEffect } from "react";

function ProductList(){
  const [products, setProducts]= useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
    const fetchData =async ()=>{
try{
  const data = await getProducts();
  setProducts(data);
}
catch(error){
  console.error("Failed to fetch the data", error)
}
finally{
  setLoading(false)
}
    }
    
    fetchData()}
  ,[])

  
  return(

   
    
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{
          loading? (
            <div className="flex items-center">Products loading...</div>):(
          
        products.map(product =>(
          <div key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image}></img>
            <p>{product.description}</p>
            <p>{product.price}</p>


          </div>
          
        ))
      )
      
}

    </div>

  )





}
export  default ProductList;