import { BrowserRouter,Router, Routes, Link } from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"


function App() {

  return (
    <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
             <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/productdetails">Product </Link>
          </nav>

          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/shop" element ={<Shop/>}/>
            <Route path="/cart" element ={<Cart/>}/>
            <Route path="/productdetails" element ={<ProductDetails/>}/>

          </Routes>

    </BrowserRouter>
  
      
  )
}

export default App
