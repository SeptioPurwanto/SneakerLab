import { NavLink } from "react-router-dom";

// Props: sidebarOpen (boolean), setSidebarOpen dari AdminLayout
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const link = ({ isActive }) =>
    `p-2 rounded hover:bg-sky-100 ${isActive ? "bg-sky-100 text-sky-700 font-semibold" : "text-slate-600"}`;
  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-white shadow-md`}>
      <div className="p-4 font-extrabold text-xl text-sky-600">👟 SneakerLab Admin</div>
      <nav className="flex flex-col p-4 space-y-2" onClick={() => setSidebarOpen(false)}>
        <NavLink to="/admin/dashboard" className={link}>📊 Dashboard & Stok</NavLink>
        <NavLink to="/admin/produk" className={link}>➕ Input Produk</NavLink>
        <NavLink to="/admin/pesanan" className={link}>🧾 Pesanan</NavLink>
        <NavLink to="/admin/about" className={link}>ℹ️ About</NavLink>
        <NavLink to="/" className="p-2 rounded hover:bg-sky-100 text-sky-600 font-medium">← Ke Toko</NavLink>
      </nav>
    </div>
  );
}
