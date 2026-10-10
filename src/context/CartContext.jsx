import { createContext, useContext, useState } from "react";
import { shoesData } from "../utils/data";

const CartContext = createContext();

export function CartProvider({ children }) {
  // ===== STATE GLOBAL (useState + useContext) =====
  const [products, setProducts] = useState(shoesData); // katalog + stok (live)
  const [cart, setCart] = useState([]);                 // [{ id, size, qty }]
  const [wishlist, setWishlist] = useState([]);         // [id]
  const [checkoutItems, setCheckoutItems] = useState([]); // snapshot, diisi HANYA lewat startCheckout()
  const [orders, setOrders] = useState([]);             // riwayat pesanan (dibaca admin)

  const getProduct = (id) => products.find((p) => p.id === Number(id));

  // Total qty suatu sepatu di keranjang (semua ukuran)
  const cartQtyOf = (id, exceptSize = null) =>
    cart.filter((i) => i.id === id && i.size !== exceptSize).reduce((s, i) => s + i.qty, 0);

  // Sisa stok yang masih bisa dimasukkan ke keranjang
  const remainingFor = (id) => {
    const p = getProduct(id);
    return p ? Math.max(0, p.stock - cartQtyOf(id)) : 0;
  };

  // Item keranjang + data produk terbaru
  const cartItems = cart
    .map((i) => {
      const p = getProduct(i.id);
      return p ? { ...p, size: i.size, qty: i.qty } : null;
    })
    .filter(Boolean);

  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  // ===== KERANJANG =====
  const addToCart = (shoe, size) => {
    if (remainingFor(shoe.id) <= 0) return false;
    setCart((prev) => {
      const ex = prev.find((i) => i.id === shoe.id && i.size === size);
      return ex
        ? prev.map((i) => (i === ex ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id: shoe.id, size, qty: 1 }];
    });
    return true;
  };

  const updateQty = (id, size, qty) => {
    const p = getProduct(id);
    if (!p) return;
    const max = p.stock - cartQtyOf(id, size);
    const q = Math.min(qty, max);
    if (q <= 0) return removeFromCart(id, size);
    setCart((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: q } : i)));
  };

  const removeFromCart = (id, size) =>
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // ===== CHECKOUT =====
  // Dipanggil dari tombol "Lanjut ke Checkout" di halaman Keranjang
  const startCheckout = () => {
    setCheckoutItems(cartItems.map((i) => ({ ...i }))); // snapshot
  };

  // Dipanggil saat user menekan "Bayar" di halaman Checkout
  const placeOrder = (customer) => {
    // validasi stok terbaru
    for (const it of checkoutItems) {
      const p = getProduct(it.id);
      const totalWanted = checkoutItems.filter((x) => x.id === it.id).reduce((s, x) => s + x.qty, 0);
      if (!p || p.stock < totalWanted) {
        return { ok: false, error: `Stok "${it.name}" tidak mencukupi (sisa ${p ? p.stock : 0}). Kembali ke keranjang.` };
      }
    }
    const total = checkoutItems.reduce((s, i) => s + i.qty * i.price, 0);
    const order = {
      id: "SL-" + String(orders.length + 1).padStart(4, "0"),
      customer,
      items: checkoutItems.map((i) => ({ id: i.id, name: i.name, size: i.size, qty: i.qty, price: i.price })),
      total,
      date: new Date().toLocaleString("id-ID"),
    };
    // 1) kurangi stok produk
    setProducts((prev) =>
      prev.map((p) => {
        const sold = checkoutItems.filter((i) => i.id === p.id).reduce((s, i) => s + i.qty, 0);
        return sold ? { ...p, stock: p.stock - sold } : p;
      })
    );
    // 2) hapus item yang dibeli dari keranjang
    setCart((prev) =>
      prev.filter((c) => !checkoutItems.some((i) => i.id === c.id && i.size === c.size))
    );
    // 3) simpan riwayat & kosongkan snapshot
    setOrders((prev) => [order, ...prev]);
    setCheckoutItems([]);
    return { ok: true, order };
  };

  // ===== ADMIN (simulasi input) =====
  const addProduct = (data) => {
    const id = products.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    setProducts((prev) => [...prev, { id, ...data }]);
  };
  const changeStock = (id, delta) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.id !== id));
    setCheckoutItems((prev) => prev.filter((c) => c.id !== id));
  };

  const value = {
    products, getProduct, cartItems, wishlist, checkoutItems, orders,
    totalQty, totalPrice, remainingFor,
    addToCart, updateQty, removeFromCart, clearCart, toggleWishlist,
    startCheckout, placeOrder,
    addProduct, changeStock, deleteProduct,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
