"use client";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

export default function AddToCartButton({ product }: { product: any }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId: product.id, name: product.name, price: Number(product.basePrice), quantity: 1, variant: "Standard", image: Array.isArray(product.images) ? product.images[0] : product.images });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0">
      {added ? <><Check size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
    </button>
  );
}
