import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { categories } from "../../utils/data";
import ShoeCard from "../../components/ShoeCard";

export default function Dashboard() {
  const { products } = useCart();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Semua");

  const filtered = products.filter(
    (s) => (cat === "Semua" || s.category === cat) && s.name.toLowerCase().includes(search.toLowerCase())
  );
  const available = products.filter((p) => p.stock > 0).length;

  return (
    <div>
      <section className="bg-gradient-to-r from-sky-500 to-sky-300 text-white rounded-2xl p-8 mb-6 shadow">
        <h1 className="text-3xl font-extrabold mb-2">Temukan Sepatu Terbaikmu 👟</h1>
        <p className="text-sky-50">Running, Sport, Casual, dan Outdoor — {products.length} model, {available} masih tersedia.</p>
      </section>

      <div className="flex flex-wrap gap-3 mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari sepatu..."
          className="flex-1 min-w-48 border border-sky-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <div className="flex gap-2 flex-wrap">
          {["Semua", ...categories].map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                cat === c ? "bg-sky-500 text-white border-sky-500" : "bg-white text-sky-700 border-sky-200 hover:bg-sky-100"
              }`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Conditional rendering: hasil kosong vs daftar */}
      {filtered.length === 0 ? (
        <p className="text-center text-slate-500 py-16">Sepatu tidak ditemukan 😢</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((s) => <ShoeCard key={s.id} shoe={s} />)}
        </div>
      )}
    </div>
  );
}
