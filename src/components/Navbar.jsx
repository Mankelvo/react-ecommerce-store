import{useEffect,useRef,useState} from "react";
import {Link,NavLink,useLocation} from "react-router-dom"
import { ShoppingCart,Menu, Trash2, X } from 'lucide-react';

function Navbar({cart=[], onRemove = () =>{}}){
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const[isCartOpen, setIsCartOpen] = useState(false);
const cartRef = useRef(null);
const location = useLocation();

const cartCount = cart.reduce((total, item) =>{
    return total + Number(item.quantity || 1);

},0)

const subtotal = cart.reduce((total,item) =>{
    const price = Number(item.price ?? 0);
    const quantity = Number(item.quantity  ?? 1);
    return total + price * quantity;
},0);

useEffect(() =>{
    setIsMenuOpen(false)
    setIsCartOpen(false);
}, [location.pathname]);

useEffect(()=>{
    function handleClickOutside(event){
        if (cartRef.current && !cartRef.current.contains(event.target)){
            setIsCartOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>{
        document.removeEventListener("mousedown", handleClickOutside)
    };
}, [])

const navLinkClass = ({isActive}) =>
    `relative px-1 py-2 text-sm font-semibold transition-colors duration-300
${isActive
    ?"text-slate-950"
    :
    "text-slate-500 hover:text-slate-950"
}`;

const mobileNavLinkClass = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-slate-950 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;



return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-900/20">C</div>
        <span className="text-lg font-black tracking-tight text-slate-950">Cartify</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
        <NavLink to="/" className={{navLinkClass}}>Home</NavLink>
        <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
        <NavLink to="/productList" className={navLinkClass}>Products</NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
            <NavLink
            to="/signin"
            className={({isActive}) =>
            `rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                isActive 
                ? "bg-slate-100 text-slate-950"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`
        }
            >
                Sign In

            </NavLink>

            <div ref={cartRef} className="relative">
            <button
            type="button"
            onClick={() =>setIsCartOpen((current)=>!current)}
            className="relative flex flex-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-800 active:scale-95"
            >
                <span>Cart</span>
                <ShoppingCart className="h-4 w-4"/>
                {cartCount > 0 && (
                    <span className="bsolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white ring-2 ring-white" >
                        {cartCount > 99 ? "99+" :cartCount}
                    </span>
                )}
            </button>
            </div>

            <NavLink
            to="/cart"
            className={({isActive}) =>
            `relative flex items-center gap-2 rounded-full px-5 py-2.5  text-sm font-semibold shadow-sm transition
            ${
                isActive 
                ? "bg-blue-600 text-white"
                : "bg-slate-950 text-white hover:bg-slate-800"
            }`
            }
            >
             <span>Cart</span>
                <ShoppingCart className= "h-4 w-4 "/>
            {cartCount >0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 px-2 text-sm font-bold text-white ring-2 ring-white">
                    {cartCount > 99 ? "99+": cartCount}
                </span>
            )}

            </NavLink>
            

        </div>
        </nav>
    </header>
);

}


export default Navbar;