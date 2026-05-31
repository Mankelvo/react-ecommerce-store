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
            <Route path="/" element ={<Home/>}/>
            <Route path="/" element ={<Home/>}/>

          </Routes>

    </BrowserRouter>
  
      
  )
}

export default App
