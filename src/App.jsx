import { BrowserRouter,Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import SignIn from "./pages/SignIn"
import ProductList from "./components/ProductList"
import { useEffect,useState } from "react"
const CART_STORAGE_KEY = "shopping-cart"

function App() {
const [cart,setCart]= useState(()=>{
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  }
  catch (error){
    console.error("Failed to loat cart from localStorage:", error);
    return [];
  }
});

useEffect(()=>{
  try{
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
  catch (error){
    console.error("Failed to save cart to localStorage:", error);
  }
}, [cart]);

function increaseQuantity(id){
setCart((currentCart) =>
currentCart.map((item)=>
item.id === id
? {...item, quantity: Number(item.quantity ?? 1) + 1} : item
)
);
}

function decreaseQuantity(id){
  setCart((currentCart) =>
  currentCart.map((item) =>
    item.id === id 
  ? {...item, quantity: Number(item.quantity ?? 1)-1}
  : item
  )
  .filter((item) => item.quantity > 0)
  );
}

function removeFromCart(id){
setCart((currentCart) => currentCart.filter((item) => item.id !==id));
}

function clearCart(){
  setCart([]);
  localStorage.removeItem(CART_STORAGE_KEY)
}

const addToCart =(product) =>{
  setCart((prevCart) =>{
const existingProduct = prevCart.find((item) => item.id === product.id)
if(existingProduct){
  return prevCart.map((item) =>
  item.id === product.id
?{...item, quantity: item.quantity + 1}
: item
);
}
return [...prevCart, {...product, quantity: 1}]
  });
};



  return (
    
    <div>

    <BrowserRouter>
          <nav className="flex flex-col md:flex-row justify-around py-8 px-6">
            <Link to="/">Home</Link>
             <Link to="/shop">Shop</Link>
              <Link to="/ProductList">Product Details</Link>
              <Link to="signin">Sign In</Link>
                <Link to="/cart">Cart<p>{cart.length}</p></Link>
          </nav>

          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/shop" element ={<Shop/>}/>
            <Route path="/signin" element ={<SignIn/>}/>
            <Route path="/cart" element ={<Cart 
            cart={cart}
            onIncrease = {increaseQuantity}
            onDecrease = {decreaseQuantity}
            onRemove = {removeFromCart}
            onClearCart = {clearCart}
            
            />}/>
            <Route path="/productList" element ={<ProductList addToCart={addToCart}/>}/>

          </Routes>
    </BrowserRouter>

    

    </div>
  
      
  )

}

export default App
