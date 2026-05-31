import React from 'react'

function ProductDetails() {
  const response =await fetch("https://fakestoreapi.com/products");
  const data = await response.json()
  return (
    <div>{data.map(product=>{
    <div>
      <h3>{</h3>
          </div>
    })}

    </div>
  )
}

export default ProductDetails