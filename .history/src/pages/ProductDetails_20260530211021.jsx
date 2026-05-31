import React from 'react'

function ProductDetails() {
  const response =await fetch("https://fakestoreapi.com/products")
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails