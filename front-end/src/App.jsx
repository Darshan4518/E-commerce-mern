import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Listing from "./pages/listing/Listing";
import Footer from "./components/footer/Footer";
import ProductDetail from "./pages/productDetails/ProductDetail";
import Cart from "./pages/cart/Cart";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { ContextProvider } from "./store/Store";

function App() {
  return (
    <ContextProvider>
      <KindeProvider
        clientId="a0c4bbd353e249f592ca9336f523ba06"
        domain="https://ecommercebydarshan.kinde.com"
        redirectUri="http://localhost:5173"
        logoutUri="http://localhost:5173"
      >
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/shop" element={<Listing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Router>
      </KindeProvider>
    </ContextProvider>
  );
}

export default App;
