import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalQty, wishlist } = useCart();
  const link = ({ isActive }) =>
    isActive ? "font-bold border-b-2 border-white pb-1" : "hover:text-sky-100";

  return (
    <nav className="bg-sky-500 text-white px-6 md:px-8 py-4 flex flex-wrap gap-3 justify-between items-center shadow-md">
      <Link to="/" className="font-extrabold text-2xl tracking-wide">
        👟 Sneaker<span className="text-sky-100">Lab</span>
      </Link>
      <div className="flex gap-6 items-center">
        <NavLink to="/" end className={link}>
          Beranda
          {/* Conditional rendering: badge wishlist */}
          {wishlist.length > 0 && <span className="ml-1 text-pink-200">♥{wishlist.length}</span>}
        </NavLink>
        <NavLink to="/cart" className={link}>
          <span className="relative inline-block">
            🛒 Keranjang
            {totalQty > 0 && (
              <span className="absolute -top-3 -right-5 bg-white text-sky-600 text-xs px-2 py-0.5 rounded-full font-bold">{totalQty}</span>
            )}
          </span>
        </NavLink>
        <NavLink to="/checkout" className={link}>Checkout</NavLink>
        <NavLink to="/admin/dashboard" className={link}>Admin</NavLink>
      </div>
    </nav>
  );
}
