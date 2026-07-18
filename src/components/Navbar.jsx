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
        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
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
                typeof="button"
                onClick={() => setIsCartOpen((current) => !current)}
                className="relative flex items-center gap-2 rounded=full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95"
                >
                    <span>Cart</span>
                    <ShoppingCart className="h-4 w-4"/>
                    {
                        cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white ring-2 ring-white">
                                {cartCount > 99 ? "99+" :cartCount}
                            </span>
                        )
                    }
                </button>

                {isCartOpen && (
                <div className=" absolute right-0 mt-4 w-[min(92wv, 390px)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <div>
                            <h3 className="text-base font-black text-slate-950">Shopping Cart</h3>
                            <p className="text-sm text-slate-500">
                                {cartCount}{cartCount === 1 ? "item": "items"}
                            </p>
                        </div>
                        <button
                        type="button"
                        onClick={() =>setIsCartOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100  hover:text-slate-950"
                        aria-label="Close cart preview"
                        >
                            <X className="h-4 w-4"/>

                        </button>
                    </div>
                    {cart.length === 0 ?(
                        <div className="px-5 py-10 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <ShoppingCart className="h-7 text-slate-500"/>
                            </div>
                            <h4 className="mt-4 text-lg font-bold text-slate-950">
                                Your cart is empty
                            </h4>
                            <p className="mt-1 text-sm text-slate-500">Add products to see them here</p>
                            
                            <Link
                            to="/productList"
                            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 "
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <>
                        <div className="max-h-80 space-y-3 overflow-y-auto px-5 py-4">
                            {
                                cart.map((item, index) =>{
                                    const price= Number(item.price ?? 0);
                                    const quantity = Number(item.quantity ?? 1);
                                    const itemTotal = price * quantity;

                                    return (
                                        <div
                                        key ={item.id || `${item.title}-${index}`}
                                        className="flex gap-4 rounded-2xl bg-slate-50 p-3"
                                        >
                                    
                                            <div
                
                                            className="flex h-20 w-20 shrink-0 items justify-center rounded-xl bg-white p-2"
                                            >
                                                <img
                                            src={item.image}
                                            alt = {item.title || "Cart item"}
                                            className="h-full w-full object-contain"
                                            />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h4 className="truncate text-sm font-bold text-slate-950">{item.center}</h4>
                                                <p>Qty: {quantity}</p>

                                                <div className="mt-2 flex items-center justify-between gap-3">
                                                    <p>${itemTotal.toFixed(2)}</p>
                                                    <button 
                                                    type="button"
                                                    onClick={()=>onRemove(item.id)}
                                                    className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-red-500 transition hover:bg-red-50"
                                                
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5"/>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    );

                                                            })
                            }

                        </div>

                        <div className="border-t border-slate-100 px-5 py-4">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-500"
                                >Subtotal</span>
                                <span className="text-xl font-black text-slate-950">${subtotal.toFixed(2)}</span>
                            </div>
                            <Link
                            to="/cart"
                            className="block rounded-full blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
                            >
                                View Cart
                            </Link>

                        </div>
                        </>
                    )}
                    </div>

                    
                )}
                
                                </div>
<button
type="button"
onClick={() =>setIsMenuOpen((current)=>!current)}
className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
aria-label="Toggle mobile menu"
>
    {isMenuOpen ? (
        <X className="h-5 w-5"/>
    ) : (
        <Menu className="h-5 w-5"/>
    )}

</button>
            {/*<NavLink
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
                <span className="absolute -right-2 -top-2 flex h-7 w-7 p-2 items-center justify-center rounded-full bg-red-500 px-2 text-sm font-bold text-white ring-2 ring-white">
                    {cartCount > 99 ? "99+": cartCount}
                </span>
            )}

            </NavLink>
            */}

        </div>
        </nav>

        { isMenuOpen && (
            <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
                <div className="mx-auto max-w-7xl space-y-2">
                    <NavLink
                    to="/"
                    end
                    onClick={()=> setIsMenuOpen(false)}
                    className={mobileNavLinkClass}
                
                    >
                        Home

                    </NavLink>
                    <NavLink
                    to="/shop"
                    onClick={()=>setIsMenuOpen(false)}
                    className={mobileNavLinkClass}
                    >
                        Shop
                    </NavLink>

                    <NavLink
                    to="/productList"
                    onClick={()=>isMenuOpen(false)}
                    className={mobileNavLinkClass}
                    >

                        Products
                    </NavLink>
                    <NavLink
                    to="/signin"
                    onClick={()=>isMenuOpen(false)}
                    className={mobileNavLinkClass}
                    >
                        Sign In 
                    </NavLink>

                    <NavLink
                    to="/cart"
                    onClick={()=>isMenuOpen(false)}
                    className={({isActive}) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive 
                        ?
                        "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`
                    }
                    >
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                                {cartCount > 90 ? "90+" : cartCount}
                            </span>
                        )}

                    </NavLink>

                </div>

            </div>
        )}
    </header>
);

}


export default Navbar;