const features = [
  ["🛍️", "Katalog 16+ Sepatu", "Empat kategori: Running, Sport, Casual, dan Outdoor, lengkap dengan pencarian dan filter."],
  ["📦", "Stok Real-time", "Stok berkurang otomatis saat checkout berhasil; produk habis ditandai dan tidak bisa dibeli."],
  ["🛒", "Keranjang Pintar", "Item dibedakan per ukuran dan jumlahnya dibatasi sesuai stok yang tersedia."],
  ["🧾", "Checkout Terpandu", "Halaman checkout hanya terisi setelah tombol \"Lanjut ke Checkout\" ditekan di keranjang."],
  ["🧑‍💼", "Backpage Admin", "Admin dapat menambah produk, mengubah stok, menghapus produk, dan melihat pesanan masuk."],
  ["❤️", "Wishlist & Ulasan", "Simpan sepatu favorit dan tulis ulasan pada halaman detail produk."],
];
const stack = [
  ["React 19", "Library UI berbasis komponen (React Component)."],
  ["Vite 6", "Build tool & dev server yang cepat."],
  ["Tailwind CSS 4", "Utility-first CSS untuk tema biru langit dan putih."],
  ["React Router DOM 7", "Routing SPA, nested layout dengan Outlet, HashRouter."],
  ["Context API + useState", "State global (produk, keranjang, checkout, pesanan) dan state lokal."],
  ["NPM", "Pengelola paket dan skrip (dev, build, preview)."],
];
const concepts = [
  ["React Component", "Navbar, Sidebar, ShoeCard, ShoeImg, layout, dan halaman dipecah menjadi komponen terpisah."],
  ["Passing Props", "ShoeCard menerima shoe, Sidebar menerima sidebarOpen & setSidebarOpen, StockBadge menerima stock."],
  ["Conditional Rendering", "Label HABIS, peringatan stok menipis, keranjang/checkout kosong, pesan error, dan layar sukses."],
  ["useState", "Form, pilihan ukuran, pencarian, filter kategori, ulasan, dan status tombol."],
  ["useContext", "CartContext menjadi sumber data tunggal untuk toko (frontpage) dan admin (backpage)."],
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <section className="bg-gradient-to-r from-sky-500 to-sky-300 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold mb-2">Tentang SneakerLab 👟</h1>
        <p className="text-sky-50">Laboratorium sneakers untuk setiap langkahmu — dari lintasan lari, lapangan, jalanan kota, hingga jalur pendakian.</p>
      </section>

      <section className="bg-white p-6 rounded-xl border border-sky-100">
        <h2 className="text-xl font-bold text-sky-700 mb-2">Siapa Kami</h2>
        <p className="text-slate-600 leading-relaxed">
          SneakerLab adalah prototipe toko sepatu online yang dibangun sebagai tugas mata kuliah Web Programming
          (Universitas Pendidikan Ganesha). Aplikasi ini mensimulasikan alur belanja lengkap: menjelajah katalog,
          memilih ukuran, memasukkan ke keranjang, checkout, hingga pengelolaan stok oleh admin. Seluruh data berupa
          data dummy yang dikelola dengan state React, sehingga tidak memerlukan server atau database.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="bg-white p-6 rounded-xl border border-sky-100">
          <h2 className="text-xl font-bold text-sky-700 mb-2">Visi</h2>
          <p className="text-slate-600">Menjadi tempat pertama bagi pecinta sepatu untuk menemukan pasangan yang tepat sesuai aktivitas dan gaya mereka.</p>
        </section>
        <section className="bg-white p-6 rounded-xl border border-sky-100">
          <h2 className="text-xl font-bold text-sky-700 mb-2">Misi</h2>
          <ul className="list-disc ml-5 text-slate-600 space-y-1">
            <li>Menyediakan koleksi yang dikurasi per kategori aktivitas.</li>
            <li>Memberi informasi stok yang jujur dan akurat.</li>
            <li>Menghadirkan pengalaman belanja yang sederhana dan cepat.</li>
          </ul>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Fitur Utama</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {features.map(([icon, t, d]) => (
            <div key={t} className="bg-white p-4 rounded-xl border border-sky-100">
              <p className="font-bold text-slate-800">{icon} {t}</p>
              <p className="text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl border border-sky-100">
        <h2 className="text-xl font-bold text-sky-700 mb-3">Alur Belanja</h2>
        <ol className="list-decimal ml-5 text-slate-600 space-y-1">
          <li>Pilih sepatu di Beranda (cari atau filter kategori).</li>
          <li>Tentukan ukuran lalu tekan "+ Keranjang".</li>
          <li>Atur jumlah di halaman Keranjang, lalu tekan "Lanjut ke Checkout".</li>
          <li>Isi data pengiriman dan bayar; stok otomatis berkurang.</li>
          <li>Admin dapat melihat pesanan dan stok terbaru di backpage.</li>
        </ol>
      </section>

      <section className="bg-white p-6 rounded-xl border border-sky-100">
        <h2 className="text-xl font-bold text-sky-700 mb-3">Tech Stack</h2>
        <ul className="space-y-1 text-slate-600">
          {stack.map(([n, d]) => <li key={n}><b className="text-slate-800">{n}</b> — {d}</li>)}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl border border-sky-100">
        <h2 className="text-xl font-bold text-sky-700 mb-3">Konsep React yang Diterapkan</h2>
        <ul className="space-y-1 text-slate-600">
          {concepts.map(([n, d]) => <li key={n}><b className="text-slate-800">{n}</b> — {d}</li>)}
        </ul>
      </section>
    </div>
  );
}
