const u = (id) => "https://images.unsplash.com/photo-" + id + "?w=600&q=80";

// Data dummy awal (disimpan ke state di CartContext agar stok bisa berubah)
export const shoesData = [
  // ===== Running =====
  { id: 1, name: "SneakerLab Swift 450", price: 450000, stock: 5, category: "Running", desc: "Sepatu lari ringan dengan bantalan responsif untuk jarak menengah.", img: u("1542291026-7eec264c27ff") },
  { id: 2, name: "Pro Marathon X", price: 650000, stock: 3, category: "Running", desc: "Dirancang untuk pelari maraton dengan sol stabil dan bantalan tebal.", img: u("1606107557195-0e29a4b5b4aa") },
  { id: 3, name: "AeroRun Blue", price: 520000, stock: 7, category: "Running", desc: "Upper mesh breathable, cocok untuk lari pagi harian.", img: u("1571008887538-b36bb32f4571") },
  { id: 4, name: "Tempo Grey Runner", price: 480000, stock: 4, category: "Running", desc: "Ringan dan fleksibel untuk latihan tempo dan interval.", img: u("1562183241-b937e95585b6") },
  // ===== Sport =====
  { id: 5, name: "Court Master", price: 720000, stock: 2, category: "Sport", desc: "Cengkeraman kuat untuk lapangan basket indoor.", img: u("1552346154-21d32810aba3") },
  { id: 6, name: "Hoops Shadow", price: 680000, stock: 6, category: "Sport", desc: "Bantalan tumit empuk dan pergelangan stabil untuk basket.", img: u("1605348532760-6753d2c43329") },
  { id: 7, name: "Baseline Red", price: 590000, stock: 3, category: "Sport", desc: "Desain agresif dengan sol traksi tinggi untuk permainan cepat.", img: u("1605523741177-cd660595c2cf") },
  { id: 8, name: "Dunk Zone Pro", price: 750000, stock: 8, category: "Sport", desc: "Sepatu performa tinggi untuk latihan dan pertandingan.", img: u("1595909336425-5bf541155dec") },
  // ===== Casual =====
  { id: 9, name: "Urban Street Low", price: 390000, stock: 9, category: "Casual", desc: "Siluet low-top putih-hitam bergaya urban, nyaman seharian.", img: u("1587563871167-1ee9c731aefb") },
  { id: 10, name: "Classic Canvas High", price: 340000, stock: 0, category: "Casual", desc: "Sneakers canvas high-top klasik untuk gaya santai.", img: u("1612942910539-9ff28b2e00d3") },
  { id: 11, name: "Daily Mono", price: 360000, stock: 10, category: "Casual", desc: "Warna monokrom yang mudah dipadukan dengan outfit apa pun.", img: u("1641997465126-c73cc4070337") },
  { id: 12, name: "Cloud White", price: 410000, stock: 5, category: "Casual", desc: "Sneakers putih bersih untuk kuliah, kerja, dan jalan-jalan.", img: u("1620989928625-08536e746255") },
  // ===== Outdoor =====
  { id: 13, name: "Trail Hunter", price: 710000, stock: 6, category: "Outdoor", desc: "Sol bergerigi dan tahan air untuk medan trail.", img: u("1575987116913-e96e7d490b8a") },
  { id: 14, name: "Summit Boot", price: 830000, stock: 4, category: "Outdoor", desc: "Boots kulit untuk pendakian dengan perlindungan pergelangan.", img: u("1600100315760-ac46b65f6fdd") },
  { id: 15, name: "Rockside Black", price: 640000, stock: 3, category: "Outdoor", desc: "Sepatu hitam tangguh untuk jalur berbatu dan perjalanan jauh.", img: u("1655976795374-6b519928f1e1") },
  { id: 16, name: "Ridge Leather Lace", price: 780000, stock: 5, category: "Outdoor", desc: "Boots kulit tali klasik, awet untuk petualangan.", img: u("1606036525923-525fa3b35465") },
];

export const categories = ["Running", "Sport", "Casual", "Outdoor"];
export const sizes = ["39", "40", "41", "42", "43"];
export const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

// Gambar cadangan (SVG) bila foto gagal dimuat
export const fallbackImg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="100%" height="100%" fill="#e0f2fe"/><text x="50%" y="50%" font-size="64" text-anchor="middle" dominant-baseline="middle">👟</text></svg>'
  );
