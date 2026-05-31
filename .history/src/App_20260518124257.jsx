import { BrowserRouter,Router, Routes, Link } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
             <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
          </nav>

          <Routes>
            <Route path="" />
          </Routes>

    </BrowserRouter>
  
      
  )
}

export default App
