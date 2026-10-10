import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/data";
import ShoeImg from "../../components/ShoeImg";

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, clearCart, totalPrice, totalQty, startCheckout, remainingFor } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    startCheckout();      // snapshot keranjang -> state checkout
    navigate("/checkout");
  };

  // Conditional rendering: keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-sky-100">
        <p className="text-5xl mb-3">🛒</p>
        <p className="text-slate-500 mb-4">Keranjang masih kosong.</p>
        <Link to="/" className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-800 mb-4">Keranjang Belanja</h1>
      <div className="space-y-3">
        {cartItems.map((i) => (
          <div key={i.id + "-" + i.size} className="bg-white p-4 rounded-xl border border-sky-100 flex gap-4 items-center flex-wrap">
            <ShoeImg src={i.img} alt={i.name} className="w-24 h-20 object-cover rounded-lg" />
            <div className="flex-1 min-w-40">
              <p className="font-bold text-slate-800">{i.name}</p>
              <p className="text-sm text-slate-500">Ukuran {i.size} • {rupiah(i.price)}</p>
              <p className="text-xs text-slate-400">Stok tersedia: {i.stock}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(i.id, i.size, i.qty - 1)} className="w-8 h-8 rounded border border-sky-200 hover:bg-sky-100">−</button>
              <span className="w-6 text-center">{i.qty}</span>
              <button onClick={() => updateQty(i.id, i.size, i.qty + 1)} disabled={remainingFor(i.id) <= 0}
                className="w-8 h-8 rounded border border-sky-200 hover:bg-sky-100 disabled:opacity-40 disabled:cursor-not-allowed">+</button>
            </div>
            <p className="w-32 text-right font-bold text-sky-600">{rupiah(i.price * i.qty)}</p>
            <button onClick={() => removeFromCart(i.id, i.size)} className="text-red-500 hover:underline text-sm">Hapus</button>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white p-5 rounded-xl border border-sky-100 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <p className="text-slate-500">{totalQty} pasang</p>
          <p className="text-2xl font-extrabold text-sky-600">{rupiah(totalPrice)}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={clearCart} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">Kosongkan</button>
          <button onClick={goCheckout} className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold">Lanjut ke Checkout →</button>
        </div>
      </div>
    </div>
  );
}
