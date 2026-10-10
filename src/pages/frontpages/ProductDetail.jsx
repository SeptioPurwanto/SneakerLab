import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { rupiah, sizes } from "../../utils/data";
import ShoeImg from "../../components/ShoeImg";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, addToCart, remainingFor } = useCart();
  const shoe = getProduct(id);
  const [size, setSize] = useState(sizes[2]);
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", text: "" });

  if (!shoe) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-4">Produk tidak ditemukan.</p>
        <Link to="/" className="text-sky-600 underline">← Kembali ke Beranda</Link>
      </div>
    );
  }

  const soldOut = shoe.stock <= 0;
  const remaining = remainingFor(shoe.id);

  const submitReview = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setReviews([{ ...form }, ...reviews]);
    setForm({ name: "", text: "" });
  };

  return (
    <div>
      <Link to="/" className="text-sky-600 hover:underline">← Kembali</Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4 bg-white p-6 rounded-2xl shadow-sm border border-sky-100">
        <ShoeImg src={shoe.img} alt={shoe.name} className={`w-full rounded-xl object-cover max-h-96 ${soldOut ? "grayscale opacity-60" : ""}`} />
        <div className="flex flex-col gap-3">
          <span className="self-start bg-sky-100 text-sky-700 text-xs px-3 py-1 rounded-full">{shoe.category}</span>
          <h1 className="text-3xl font-extrabold text-slate-800">{shoe.name}</h1>
          <p className="text-2xl font-bold text-sky-600">{rupiah(shoe.price)}</p>
          <p className="text-slate-600">{shoe.desc}</p>
          {soldOut
            ? <p className="text-red-500 font-bold">Stok habis</p>
            : <p className={shoe.stock <= 3 ? "text-orange-500 font-semibold" : "text-slate-500"}>Stok tersedia: {shoe.stock} pasang</p>}
          <select value={size} onChange={(e) => setSize(e.target.value)} disabled={soldOut}
            className="border border-sky-200 rounded-lg px-3 py-2 w-40">
            {sizes.map((s) => <option key={s} value={s}>Ukuran {s}</option>)}
          </select>
          <button disabled={soldOut || remaining <= 0}
            onClick={() => { if (addToCart(shoe, size)) { setAdded(true); setTimeout(() => setAdded(false), 1200); } }}
            className={`py-3 rounded-lg font-semibold text-white ${soldOut || remaining <= 0 ? "bg-slate-300 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"}`}>
            {soldOut ? "Stok Habis" : remaining <= 0 ? "Maks. di Keranjang" : added ? "Ditambahkan ✓" : "+ Tambah ke Keranjang"}
          </button>
        </div>
      </div>

      <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-sky-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Ulasan ({reviews.length})</h2>
        <form onSubmit={submitReview} className="flex flex-col gap-2 mb-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama"
            className="border border-sky-200 rounded-lg px-3 py-2" />
          <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Tulis ulasan..."
            className="border border-sky-200 rounded-lg px-3 py-2" rows={2} />
          <button className="self-start bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg">Kirim Ulasan</button>
        </form>
        {reviews.length === 0 ? <p className="text-slate-400">Belum ada ulasan.</p> : (
          <ul className="space-y-2">
            {reviews.map((r, i) => (
              <li key={i} className="bg-sky-50 rounded-lg p-3"><b>{r.name}</b><p className="text-slate-600">{r.text}</p></li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
