import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/data";

// Riwayat pesanan hasil checkout dari halaman toko
export default function AdminOrders() {
  const { orders } = useCart();
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-800 mb-4">Pesanan Masuk</h1>
      {orders.length === 0 ? (
        <p className="bg-white p-8 rounded-xl border border-sky-100 text-center text-slate-500">
          Belum ada pesanan. Lakukan checkout di toko untuk melihat data di sini.
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-white p-4 rounded-xl border border-sky-100 shadow-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-bold text-sky-700">{o.id}</p>
                <p className="text-sm text-slate-400">{o.date}</p>
              </div>
              <p className="text-sm text-slate-600">{o.customer.name} — {o.customer.address}</p>
              <ul className="text-sm text-slate-600 mt-2 list-disc ml-5">
                {o.items.map((i) => <li key={i.id + i.size}>{i.name} (ukuran {i.size}) × {i.qty}</li>)}
              </ul>
              <p className="text-right font-bold text-sky-600 mt-2">{rupiah(o.total)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
