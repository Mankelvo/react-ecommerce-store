import{useEffect,useRef,useState} from "react";
import {Link,NavLink,useLocation} from "react-router-dom"
function Navbar(cart=[], onRemove){
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

const NavLinkClass = ({isActive}) =>
    `relative px-1 py-2 text-sm font-semibold transition-colors duration-300`
return {

}
}