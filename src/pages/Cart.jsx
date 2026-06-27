


function Cart({cart}) {
return (
 <div>
  <h2>Shopping Cart</h2>
  {
cart.length === 0 ?
(
  <p>cart is empty</p>
) :
(
  cart.map((item) =>(
    <div key={item.id}>
      <h3>{item.title}</h3>
      <p>Price: ${item.price.toFixed(2)}</p>
      <p> Quantity: {item.quantity}</p>
      <p>Subtotal: ${(item.price * item.quantity).toFixed(2)} </p>

    </div>
  ))
)
  }
  </div>
);
}
export default Cart;