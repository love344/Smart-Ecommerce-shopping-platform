import Link from "next/link";
import { ShieldCheck, RefreshCcw, Clock, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">L</div>
              <span className="text-xl font-extrabold tracking-tight text-white">Lumina</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">Smart shopping with transparent pricing, honest comparisons, and accessible design for everyone.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare</Link></li>
              <li><Link href="/budget" className="hover:text-white transition-colors">Budget Assistant</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/help" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Trust</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-400" /> Verified Sellers</li>
              <li className="flex items-center gap-2"><RefreshCcw size={16} className="text-emerald-400" /> Easy Returns</li>
              <li className="flex items-center gap-2"><Clock size={16} className="text-emerald-400" /> Transparent Tracking</li>
              <li className="flex items-center gap-2"><Truck size={16} className="text-emerald-400" /> Sustainable Packaging</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Lumina. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
            <Link href="/shipping" className="hover:text-slate-300">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
