import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFoundPage } from "./pages/NotFound";
import { ProductsPage } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product-details" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
