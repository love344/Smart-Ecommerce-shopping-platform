import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={Array.isArray(product.images) ? product.images[0] : product.images || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.comparePrice && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">Sale</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-950 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">{product.brand}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-extrabold text-slate-950">₹{Number(product.basePrice).toFixed(0)}</span>
          {product.comparePrice && (
            <span className="text-sm text-slate-400 line-through">₹{Number(product.comparePrice).toFixed(0)}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Star size={14} fill="currentColor" /> <span className="text-slate-600 font-medium">4.5</span>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.stockQuantity > 5 ? "bg-emerald-50 text-emerald-700" : product.stockQuantity > 0 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>
            {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}
