import Link from "next/link";
import { ShoppingBag, User, Search, Menu, Heart, ShieldCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">L</div>
          <span className="text-xl font-extrabold tracking-tight hidden sm:block">Lumina</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <Link href="/compare" className="hover:text-indigo-600 transition-colors">Compare</Link>
          <Link href="/budget" className="hover:text-indigo-600 transition-colors">Budget Assistant</Link>
          <Link href="/help" className="hover:text-indigo-600 transition-colors">Support</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/shop" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm transition-colors">
            <Search size={16} /> Search
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-rose-500 transition-colors">
            <Heart size={20} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors relative">
            <ShoppingBag size={20} />
          </Link>
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors">
              <User size={16} /> {user.name?.split(" ")[0] || "Account"}
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
              <User size={16} /> Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
