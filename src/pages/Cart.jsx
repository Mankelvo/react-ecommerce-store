


function Cart({cart}) {
  const total = cart.reduce((sum,item)=>sum + item.price *item.quantity,0);
return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
 <div className=" max-w-7xl mx-auto">
  <div className="mb-10">
  <h2 className="text-3xl font-bold text-slate-900">Shopping Cart</h2>
  <p className="text-slate-500 mt-2">Review your items before checkout</p>
  </div>
  {
cart.length === 0 ?
(
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 gap-5">
    <h3 className="text-xl font-semibold text-slate-900">Your cart is empty</h3>
    <p className="text-slate-500 mt-2">Add some products to your cart first</p>
  </div>
  
) :
(
  <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
<div className="lg:col-span-2 space-y-4">
  {cart.map((item) =>(
   
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow  duration-300"
      key={item.id}
      >
        <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center">
      <img className=" w-full h-full object-contain p-4 bg-gray-50"
            src={item.image}
            alt={item.title}
            />

            </div>
      <h3 className="text-md font-semibold text-gray-900 mt-4">{item.title}</h3>
      <p className=" mt-4 text-md font-bold text-gray-900">Price: ${item.price.toFixed(2)}</p>
      <p className=" mt-2 text-sm font-bold text-gray-900 mb-2"> Quantity: {item.quantity}</p>
</div>  
  ))}
  </div>
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