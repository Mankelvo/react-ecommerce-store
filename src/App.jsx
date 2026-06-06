import { BrowserRouter,Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import SignIn from "./pages/SignIn"
import ProductList from "./components/ProductList"


function App() {

  return (
    <div>
    <BrowserRouter>
          <nav className="flex flex-col md:flex-row justify-around py-8 px-6">
            <Link to="/">Home</Link>
             <Link to="/shop">Shop</Link>
              <Link to="/ProductList">Product Details</Link>
              <Link to="signin">Sign In</Link>
                <Link to="/cart">Cart</Link>
          </nav>

          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/shop" element ={<Shop/>}/>
            <Route path="/signin" element ={<SignIn/>}/>
            <Route path="/cart" element ={<Cart/>}/>
            <Route path="/productList" element ={<ProductList/>}/>

          </Routes>

    </BrowserRouter>

    <main>
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Store</h1>
      <ProductList/>
    </main>

    </div>
  
      
  )
}

export default App
