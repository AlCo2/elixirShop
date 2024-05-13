import { createContext } from "react";
import Footer from "./Pages/components/Footer";
import Navbar from "./Pages/components/Navbar";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export const CartContext = createContext(null);

const Layout = ({children}) => {
  const { cart } = usePage().props;
  const [cartTotalProducts, setCartTotalProducts] = useState(cart.total);
  return (
    <CartContext.Provider value={{cartTotalProducts:cartTotalProducts, setCartTotalProducts:setCartTotalProducts}}>
      <Navbar />
        {children}
      <Footer/>
    </CartContext.Provider>
  )
}

export default Layout;