import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFoundPage } from "./pages/NotFound";
import { ProductsPage } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { useState } from "react";
import { CartContext } from "./store/context";
import { CartItem } from "./types/store";

function App() {
  // Global state
  const [cartItems, setCartItems] = useState<Record<number, CartItem>>({});

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product-details" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
