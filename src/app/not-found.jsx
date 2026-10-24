import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | 404',
  description: 'The requested machinery page or industrial documentation could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-32 px-4 bg-[#F8FAFC]">
      <div className="max-w-xl w-full text-center space-y-6 bg-white p-10 rounded-2xl border border-[#E5E7EB] shadow-lg">
        <span className="inline-block px-3.5 py-1.5 bg-[#FCE8EC] text-[#DE1D3A] text-xs font-bold uppercase tracking-widest rounded-full">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] font-display">
          Page Not Found
        </h1>
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
          The machinery specification, catalog page, or engineering resource you are searching for might have been moved or updated.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-[#DE1D3A] hover:bg-[#c51831] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
          <Link
            href="/#categories"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Browse Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
