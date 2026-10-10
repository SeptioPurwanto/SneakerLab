import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { rupiah, sizes } from "../utils/data";
import ShoeImg from "./ShoeImg";

// Props: shoe (objek produk dari context)
export default function ShoeCard({ shoe }) {
  const { addToCart, toggleWishlist, wishlist, remainingFor } = useCart();
  const [size, setSize] = useState(sizes[2]);
  const [added, setAdded] = useState(false);

  const remaining = remainingFor(shoe.id);   // stok - yang sudah di keranjang
  const soldOut = shoe.stock <= 0;
  const inWish = wishlist.includes(shoe.id);

  const handleAdd = () => {
    if (addToCart(shoe, size)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-sky-100 flex flex-col">
      <div className="relative">
        <Link to={`/product/${shoe.id}`}>
          <ShoeImg src={shoe.img} alt={shoe.name} className={`w-full h-48 object-cover ${soldOut ? "opacity-50 grayscale" : ""}`} />
        </Link>
        <span className="absolute top-2 left-2 bg-sky-500 text-white text-xs px-2 py-1 rounded-full">{shoe.category}</span>
        <button onClick={() => toggleWishlist(shoe.id)} className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 shadow text-lg" aria-label="wishlist">
          {inWish ? "❤️" : "🤍"}
        </button>
        {/* Conditional rendering: label stok habis */}
        {soldOut && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">HABIS</span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link to={`/product/${shoe.id}`} className="font-bold text-slate-800 hover:text-sky-600">{shoe.name}</Link>
        <p className="text-sky-600 font-bold">{rupiah(shoe.price)}</p>
        {/* Conditional rendering: peringatan stok menipis */}
        {!soldOut && shoe.stock <= 3 && <p className="text-xs text-orange-500 font-semibold">Sisa {shoe.stock} pasang!</p>}
        {!soldOut && shoe.stock > 3 && <p className="text-xs text-slate-400">Stok: {shoe.stock}</p>}
        <select value={size} onChange={(e) => setSize(e.target.value)} disabled={soldOut}
          className="border border-sky-200 rounded-lg px-2 py-1 text-sm disabled:bg-slate-100">
          {sizes.map((s) => <option key={s} value={s}>Ukuran {s}</option>)}
        </select>
        <button onClick={handleAdd} disabled={soldOut || remaining <= 0}
          className={`mt-auto py-2 rounded-lg font-semibold text-white transition ${
            soldOut || remaining <= 0 ? "bg-slate-300 cursor-not-allowed" : added ? "bg-emerald-500" : "bg-sky-500 hover:bg-sky-600"
          }`}>
          {soldOut ? "Stok Habis" : remaining <= 0 ? "Maks. di Keranjang" : added ? "Ditambahkan ✓" : "+ Keranjang"}
        </button>
      </div>
    </div>
  );
}
