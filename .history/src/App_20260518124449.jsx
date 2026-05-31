import { BrowserRouter,Router, Routes, Link } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
             <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
              <Link to=>Products</Link>
          </nav>

          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/shop" element ={<Shop/>}/>
            <Route path="/Cart" element ={<Cart/>}/>

          </Routes>

    </BrowserRouter>
  
      
  )
}

export default App
