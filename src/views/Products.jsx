'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, Loader2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { categories as defaultCategories, productsList as initialProducts } from '../data/products';
import { fetchProducts, fetchCategories } from '../lib/api';

const getSrc = (img) => {
  if (!img) return '/slider1.webp';
  if (typeof img === 'object' && img?.src) return img.src;
  if (typeof img === 'string') {
    let s = img.trim();
    if (s.startsWith('http://cobolt-backend.onrender.com')) {
      s = s.replace('http://', 'https://');
    } else if (s.startsWith('http://') && s.includes('.onrender.com')) {
      s = s.replace('http://', 'https://');
    }
    return s;
  }
  return img;
};

// Helper for e-commerce price showcase
const getPriceDisplay = (product, idx) => {
  const p = product?.price ? Number(product.price) : null;
  const op = product?.offerPrice ? Number(product.offerPrice) : null;

  if (op && p && op < p) {
    const discount = `-${Math.round(((p - op) / p) * 100)}%`;
    return {
      orig: `₹ ${p.toLocaleString('en-IN')}`,
      current: `₹ ${op.toLocaleString('en-IN')}`,
      discount,
      hasOffer: true,
    };
  }

  if (op || p) {
    const currentNum = op || p;
    return {
      orig: null,
      current: `₹ ${currentNum.toLocaleString('en-IN')}`,
      discount: null,
      hasOffer: false,
    };
  }

  const basePrices = [5899, 18600, 3400, 6199, 24500, 42000, 15800, 32000, 68000, 28900];
  const currentNum = basePrices[idx % basePrices.length];
  const origNum = Math.round(currentNum * 1.1);
  return {
    orig: `₹ ${origNum.toLocaleString('en-IN')}`,
    current: `₹ ${currentNum.toLocaleString('en-IN')}`,
    discount: '-9%',
    hasOffer: true,
  };
};

export default function Products() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams?.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(false);

  // Sync state if URL query param changes
  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  // Fetch real-time products and categories from backend
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [liveProducts, liveCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        if (!isMounted) return;

        if (Array.isArray(liveProducts) && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
        if (Array.isArray(liveCategories) && liveCategories.length > 0) {
          setCategories(liveCategories);
        }
      } catch (err) {
        console.error('Failed to load live catalog:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayedProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative pt-32 pb-8 sm:pt-28 md:pt-32 md:pb-12 bg-[#F8FAFC] border-b border-[#E5E7EB]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 sm:space-y-2 md:space-y-5 max-w-3xl">
              <span className="text-[#DE1D3A] font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                Industrial Catalog
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-display leading-tight">
                Our Machineries & Toolings
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                Explore our line of industrial setups. Engineered with heavy components, high safety ratios, and intuitive controller architectures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-8 sm:py-12 bg-[#FFFFFF] min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Category Filter Controls */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search machineries by model or specification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all shadow-xs"
              />
              {loading && (
                <Loader2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#DE1D3A] text-white border-[#DE1D3A] shadow-sm'
                      : 'bg-white/70 border-gray-200 text-gray-600 hover:border-[#DE1D3A]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Showcase Cards Grid */}
          {displayedProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-gray-500 text-sm">No machineries found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-[#DE1D3A] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product, idx) => {
                const imgSrc = getSrc(product.image);
                const uniqueKey = product._id ? String(product._id) : `${product.id || 'prod'}-${idx}`;
                const pricing = getPriceDisplay(product, idx);

                return (
                  <motion.div
                    layout
                    key={uniqueKey}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
                  >
                    <div>
                      {/* Product Image Area with Warm Neutral Backdrop */}
                      <Link
                        href={`/products/${product.id}`}
                        className="block relative h-48 sm:h-56 lg:h-60 bg-white flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={imgSrc}
                          alt={product.name}
                          width={320}
                          height={320}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                          loading="lazy"
                          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Discount Badge in Top Right Corner */}
                        {pricing.hasOffer && pricing.discount && (
                          <span className="absolute top-3 right-3 bg-[#DE1D3A] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-xs tracking-tight">
                            {pricing.discount}
                          </span>
                        )}
                      </Link>

                      {/* Product Details Section */}
                      <div className="p-3.5 sm:p-4 pb-0 text-left">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-xs sm:text-sm text-gray-900 group-hover:text-[#DE1D3A] transition-colors line-clamp-1 leading-snug">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Price Line (Original strikethrough + active price) */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 font-sans">
                          {pricing.orig && (
                            <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                              {pricing.orig}
                            </span>
                          )}
                          <span className="text-xs sm:text-sm font-bold text-[#DE1D3A]">
                            {pricing.current}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Buy Pill Button */}
                    <div className="p-3.5 sm:p-4 pt-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="w-full py-2 sm:py-2.5 rounded-full border border-[#00A6E8]/40 hover:border-[#00A6E8] bg-white hover:bg-[#00A6E8] text-[#00A6E8] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-xs group/btn"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-[#00A6E8] group-hover/btn:text-white transition-colors" />
                        <span>Buy</span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
