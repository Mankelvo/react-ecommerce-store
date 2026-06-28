


function Cart({cart}) {
  const total = cart.reduce((sum,item)=>sum + item.price *item.quantity,0);
return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
 <div className=" max-w-7xl mx-auto">
  <div className="mb-10">
  <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
  <p className="text-slate-500 mt-2">Review your items before checkout</p>
  </div>
  {
cart.length === 0 ?
(
  <p>cart is empty</p>
) :
(
  <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

  {cart.map((item) =>(
   
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow  duration-300"
      key={item.id}
      >
      <img className=" w-full h-56 object-contain p-4 bg-gray-50"
            src={item.image}
            alt={item.title}
            />
      <h3 className="text-lg font-semibold text-gray-900" mt-4>{item.title}</h3>
      <p className=" mt-4 text-lg font-bold text-gray-900">Price: ${item.price.toFixed(2)}</p>
      <p className=" mt-2 text-lg font-bold text-gray-900"> Quantity: {item.quantity}</p>
</div>  
  ))}
  </div>
  <div className="mt-10 text-2xl font-bold text-gray-900">
    Total:${total.toFixed(2)}
  </div>
</>
)
  }
 
</div>
  </section>
);


}
export default Cart;