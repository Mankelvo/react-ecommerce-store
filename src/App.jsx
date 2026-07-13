import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import SignIn from "./pages/SignIn"
import Navbar from "./components/Navbar"
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


const navLinkClass = ({isActive}) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
    isActive 
    ? "bg-blue-600 text-white shadow-md"
    :
    "bg-slate-900 text-white hover:bg-slate-800"
  }`;


  return (
    
    <div>

    <BrowserRouter>

    <header className="sticky top-0 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4  md:flex-row md:items-center justify-between py-4 px-6">
            <NavLink
            to="/"
            className="text-2xl font-black tracking-tight text-slate-900"
            >
              Cartify <span className="text-blue-600">.</span>
            </NavLink>

            <div className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
             <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
              <NavLink to="/ProductList" className={navLinkClass}>Product Details</NavLink>
              <NavLink to="signin" className={navLinkClass}>Sign In</NavLink>
                <NavLink to="/cart" className={navLinkClass}>Cart<p>{cart.length}</p></NavLink>
         </div>
          </nav>
</header>
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
