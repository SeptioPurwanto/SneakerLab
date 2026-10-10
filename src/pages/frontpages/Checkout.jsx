import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/data";
import ShoeImg from "../../components/ShoeImg";

export default function Checkout() {
  const { checkoutItems, placeOrder } = useCart();
  const [form, setForm] = useState({ name: "", address: "" });
  const [errors, setErrors] = useState({});
  const [orderError, setOrderError] = useState("");
  const [done, setDone] = useState(null);

  const total = checkoutItems.reduce((s, i) => s + i.price * i.qty, 0);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Nama wajib diisi";
    if (form.address.trim().length < 10) err.address = "Alamat minimal 10 karakter";
    setErrors(err);
    if (Object.keys(err).length) return;
    const res = placeOrder({ name: form.name.trim(), address: form.address.trim() });
    if (res.ok) setDone(res.order);
    else setOrderError(res.error);
  };

  // Conditional rendering 1: pesanan sukses
  if (done) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl border border-sky-100 text-center">
        <p className="text-5xl mb-3">🎉</p>
        <h1 className="text-2xl font-extrabold text-sky-600 mb-2">Pesanan Berhasil!</h1>
        <p className="text-slate-600">Terima kasih, {done.customer.name}.</p>
        <p className="text-slate-600 mb-1">No. pesanan: <b>{done.id}</b></p>
        <p className="text-slate-600 mb-4">Total dibayar: <b>{rupiah(done.total)}</b></p>
        <Link to="/" className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg">Belanja Lagi</Link>
      </div>
    );
  }

  // Conditional rendering 2: belum ada snapshot dari keranjang
  if (checkoutItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-sky-100">
        <p className="text-5xl mb-3">🧾</p>
        <p className="text-slate-500 mb-1">Belum ada barang untuk di-checkout.</p>
        <p className="text-slate-400 text-sm mb-4">Pilih barang di keranjang lalu tekan "Lanjut ke Checkout".</p>
        <Link to="/cart" className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg">Ke Keranjang</Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl border border-sky-100 flex flex-col gap-3">
        <h1 className="text-2xl font-extrabold text-slate-800">Data Pengiriman</h1>
        <div>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap"
            className="w-full border border-sky-200 rounded-lg px-3 py-2" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Alamat lengkap" rows={3}
            className="w-full border border-sky-200 rounded-lg px-3 py-2" />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        {orderError && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{orderError} <Link to="/cart" className="underline">Ke keranjang</Link></p>}
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg">Bayar {rupiah(total)}</button>
      </form>

      <div className="bg-white p-6 rounded-2xl border border-sky-100">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Ringkasan Pesanan</h2>
        <ul className="divide-y divide-sky-100">
          {checkoutItems.map((i) => (
            <li key={i.id + i.size} className="py-3 flex gap-3 items-center">
              <ShoeImg src={i.img} alt={i.name} className="w-16 h-14 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{i.name}</p>
                <p className="text-sm text-slate-500">Ukuran {i.size} × {i.qty}</p>
              </div>
              <p className="font-semibold text-sky-600">{rupiah(i.price * i.qty)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right text-xl font-extrabold text-sky-600">Total: {rupiah(total)}</p>
      </div>
    </div>
  );
}
