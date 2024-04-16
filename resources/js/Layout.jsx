import Footer from "./Pages/components/Footer";
import Navbar from "./Pages/components/Navbar";

const Layout = ({children}) => {
  return (
    <>
      <Navbar/>
        {children}
      <Footer/>
    </>
  )
}

export default Layout;