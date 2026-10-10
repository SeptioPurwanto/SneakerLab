import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminProducts from "./pages/adminpages/AdminProducts";
import AdminOrders from "./pages/adminpages/AdminOrders";
import AboutPage from "./pages/adminpages/AboutPage";

export default function App() {
  return (
    <Routes>
      {/* Layout toko (Outlet) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      {/* Layout admin (Outlet) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="produk" element={<AdminProducts />} />
        <Route path="pesanan" element={<AdminOrders />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
