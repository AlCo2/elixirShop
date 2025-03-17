import { createContext } from "react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export const CartContext = createContext(null);

const Layout = ({children}) => {
  const { cart } = usePage().props;
  const [cartTotalProducts, setCartTotalProducts] = useState(cart.total);
  return (
    <CartContext.Provider value={{cartTotalProducts:cartTotalProducts, setCartTotalProducts:setCartTotalProducts}}>
      <Navbar/>
        {children}
      <Footer/>
    </CartContext.Provider>
  )
}

export default Layout;