"use client";
import { HelpCircle, RefreshCcw, ShieldCheck, Clock } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-2">Customer Support & Returns</h1>
      <p className="text-slate-500 mb-10">Transparent policies, easy returns, and clear tracking.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Clock, title: "30-Day Returns", desc: "Most items can be returned within 30 days of delivery with original packaging." },
          { icon: RefreshCcw, title: "Easy Exchanges", desc: "Wrong size? Exchange for the correct variant through your order history." },
          { icon: ShieldCheck, title: "Verified Refunds", desc: "Refunds are processed to your original payment method within 5-7 business days after inspection." },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><item.icon size={22} /></div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl border border-amber-100 p-8">
        <h2 className="text-2xl font-extrabold text-slate-950 mb-4">Smart Returns Assistant</h2>
        <p className="text-slate-600 mb-6">Check return eligibility before buying. Visit your order history to request a return and receive a tracking number for your request.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold mb-2">Before Checkout</h4>
            <p className="text-sm text-slate-500">Every product page clearly shows return eligibility, deadlines, and conditions before you purchase.</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold mb-2">After Purchase</h4>
            <p className="text-sm text-slate-500">Request returns directly from your order history. Get a return request number and real-time status updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
