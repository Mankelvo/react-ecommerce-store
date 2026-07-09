import CartItem from "./CartItem";



function Cart({
  cart = []
  ,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
}) {

  const subtotal = cart.reduce((sum , item)=>{
    const price = Number(item.price.toFixed(2) ?? 0);
    const quantity = Number(item.quantity ?? 1);
    return sum + price * quantity
  },0);

  const shipping = subtotal > 0?  5.99 : 0;
const tax = subtotal * 0.088;
const total = subtotal + shipping + tax;



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
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center gap-5">
   <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center"><span className="text-4xl">🛒</span></div>
   <h3 className="text-xl font-semibold text-slate-900">Your cart is empty</h3>
    <p className="text-slate-500 mt-2">Add some products to your cart first</p>
  </div>
  
) :
(
 
<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
<div className="min-w-0 space-y-5">
  {cart.map((item, index) =>(
   
     <CartItem key={item.id ?? index} item={item}
     onIncrease={onIncrease}
     onDecrease={onDecrease}
     onRemove= {onRemove}
     />
  ))}
  </div>

  <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
    <h3 className="text-xl font-bold text-slate-900">
Order Summary
    </h3>
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between text-slate-600">
        <span>Subtotal</span>
        <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
      </div>

      <div className=" flex items-center justify-between text-slate-600">
        <span>
          Shipping
        </span>
<span className="font-semibold text-slate-900"> 
  ${shipping.toFixed(2)}
</span>
      </div>

      <div className="flex items-center justify-between text-slate-600"> 
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>

      </div>

      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>
    </div>
    <button type="button" className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]">
      Proceed to Checkout ➡
    </button>
    <button
    type="button"
    onClick={onClearCart}
    className="mt-3 w-full rounded-2xl bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.98]"
    >
      Clear Cart</button>
  </aside>
  </div>
  
)

  }

 
</div>
  </section>
);


}
export default Cart;