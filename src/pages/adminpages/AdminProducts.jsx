import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { categories } from "../../utils/data";

// Halaman Backpage: simulasi input data oleh admin (form tambah produk)
export default function AdminProducts() {
  const { addProduct, products } = useCart();
  const empty = { name: "", price: "", stock: "", category: "Running", desc: "", img: "" };
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setErr("Nama produk wajib diisi");
    if (!(Number(form.price) > 0)) return setErr("Harga harus lebih dari 0");
    if (!(Number(form.stock) >= 0) || form.stock === "") return setErr("Stok harus 0 atau lebih");
    setErr("");
    addProduct({
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      desc: form.desc.trim() || "Produk baru SneakerLab.",
      img: form.img.trim() || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    });
    setMsg(`"${form.name.trim()}" berhasil ditambahkan. Cek di Beranda toko!`);
    setForm(empty);
  };

  const input = "w-full border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400";
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Input Produk Baru</h1>
      <p className="text-slate-500 mb-4">Simulasi input data admin. Total produk saat ini: <b>{products.length}</b>.</p>
      <form onSubmit={submit} className="bg-white p-6 rounded-xl border border-sky-100 shadow-sm grid gap-3">
        <input className={input} placeholder="Nama sepatu" value={form.name} onChange={set("name")} />
        <div className="grid grid-cols-2 gap-3">
          <input className={input} type="number" placeholder="Harga (Rp)" value={form.price} onChange={set("price")} />
          <input className={input} type="number" placeholder="Stok awal" value={form.stock} onChange={set("stock")} />
        </div>
        <select className={input} value={form.category} onChange={set("category")}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <textarea className={input} rows={2} placeholder="Deskripsi" value={form.desc} onChange={set("desc")} />
        <input className={input} placeholder="URL gambar (opsional)" value={form.img} onChange={set("img")} />
        {/* Conditional rendering: pesan error / sukses */}
        {err && <p className="text-red-500 text-sm">{err}</p>}
        {msg && <p className="text-emerald-600 text-sm">{msg}</p>}
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg">Simpan Produk</button>
      </form>
    </div>
  );
}
