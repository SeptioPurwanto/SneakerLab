import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/data";
import ShoeImg from "../../components/ShoeImg";

// Props: stock (angka) -> badge status stok
function StockBadge({ stock }) {
  if (stock <= 0) return <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">Habis</span>;
  if (stock <= 3) return <span className="px-2 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600">Menipis</span>;
  return <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">Aman</span>;
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { products, orders, changeStock, deleteProduct } = useCart();

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const soldOut = products.filter((p) => p.stock <= 0).length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const soldQty = (id) => orders.reduce((s, o) => s + o.items.filter((i) => i.id === id).reduce((a, i) => a + i.qty, 0), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-800">Dashboard & Stok</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jumlah Produk" value={products.length} color="text-sky-600" />
        <StatCard label="Total Stok (pasang)" value={totalStock} color="text-sky-600" />
        <StatCard label="Produk Habis" value={soldOut} color="text-red-500" />
        <StatCard label={`Pendapatan (${orders.length} pesanan)`} value={rupiah(revenue)} color="text-emerald-600" />
      </div>

      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-sky-100 text-sky-800 text-left">
            <tr>
              <th className="p-3">Produk</th><th className="p-3">Kategori</th><th className="p-3">Harga</th>
              <th className="p-3">Stok</th><th className="p-3">Terjual</th><th className="p-3">Status</th><th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-sky-50">
                <td className="p-3 flex items-center gap-2">
                  <ShoeImg src={p.img} alt={p.name} className="w-12 h-10 rounded object-cover" />
                  <span className="font-medium text-slate-700">{p.name}</span>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{rupiah(p.price)}</td>
                <td className="p-3 font-bold">{p.stock}</td>
                <td className="p-3">{soldQty(p.id)}</td>
                <td className="p-3"><StockBadge stock={p.stock} /></td>
                <td className="p-3 whitespace-nowrap">
                  <button onClick={() => changeStock(p.id, -1)} className="w-7 h-7 border border-sky-200 rounded hover:bg-sky-100">−</button>
                  <button onClick={() => changeStock(p.id, 1)} className="w-7 h-7 border border-sky-200 rounded hover:bg-sky-100 ml-1">+</button>
                  <button onClick={() => changeStock(p.id, 10)} className="px-2 h-7 border border-sky-200 rounded hover:bg-sky-100 ml-1">+10</button>
                  <button onClick={() => window.confirm(`Hapus ${p.name}?`) && deleteProduct(p.id)} className="text-red-500 hover:underline ml-3">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
