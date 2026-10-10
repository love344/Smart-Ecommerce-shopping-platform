import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-extrabold text-slate-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-950 mb-2">Page not found</h2>
      <p className="text-slate-500 mb-8">Sorry, the page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-200">Back to Home</Link>
    </div>
  );
}
