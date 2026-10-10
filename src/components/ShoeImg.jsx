import { fallbackImg } from "../utils/data";

// Komponen gambar dengan fallback jika URL gagal dimuat
export default function ShoeImg({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallbackImg;
      }}
    />
  );
}
