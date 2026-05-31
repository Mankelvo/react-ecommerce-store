import { BrowserRouter,Routes, Route, Link } from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"


function App() {

  return (
    <BrowserRouter>
          <nav className="flex flex-col md:flex-row justify-around py-8 px-6">
            <Link to="/">Home</Link>
             <Link to="/shop">Shop</Link>
              <Link to="/productdetails">Product Details</Link>
              <
                <Link to="/cart">Cart</Link>
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
