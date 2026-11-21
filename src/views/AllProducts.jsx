'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Search, X, ArrowRight, SlidersHorizontal, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { productsList as fallbackProducts } from '../data/products';

const CATEGORIES = [
  'All',
  'Baking Equipments',
  'Food Preparation Machines',
  'Cooking Equipments',
  'Refrigeration Items',
  'Stainless Steel Fabrications',
  'Industrial And Food Service',
];

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

export default function AllProducts({ initialProducts = fallbackProducts }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    const list = initialProducts && initialProducts.length > 0 ? initialProducts : fallbackProducts;
    return list.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (p.category && p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.id?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tagline?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <PageWrapper>
      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 bg-[#F8FAFC]  overflow-hidden">
        {/* <div className="absolute inset-0 bg-[size:3rem_3rem]" /> */}
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8FAFC] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        


        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10 sm:py-14 bg-[#F8FAFC] min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar: Search & Category Filter */}
          <div className="space-y-4 mb-8">
            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by equipment name, category, or model..."
                  className="w-full pl-10 pr-10 py-3 bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 focus:border-[#DE1D3A] transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Status & Counter */}
              <div className="text-xs sm:text-sm text-slate-500 font-sans flex items-center justify-between sm:justify-end gap-2">
                <span>
                  Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
                {(selectedCategory !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="text-xs text-[#DE1D3A] font-semibold hover:underline cursor-pointer ml-2"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (Horizontal Scrollable) */}
            
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 max-w-xl mx-auto my-8">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
                No matching machinery found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Try searching with different keywords or switch category filter to browse our full catalog.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#DE1D3A] text-white text-xs font-bold rounded-xl hover:bg-[#B7152D] transition-colors"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, idx) => {
                const imgSrc = getSrc(product.image);
                const uniqueKey = product._id ? String(product._id) : `${product.id || 'prod'}-${idx}`;

                return (
                  <motion.div
                    layout
                    key={uniqueKey}
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-[#F8FAFC] rounded-3xl border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 text-left"
                  >
                    <div>
                      {/* Product Image Area */}
                      <Link
                        href={`/products/${product.id}`}
                        className="block relative h-48 sm:h-56 lg:h-60 bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={imgSrc}
                          alt={product.name}
                          width={320}
                          height={320}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                          loading="lazy"
                          className="max-h-full max-w-full bg-[#F8FAFC] object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Details Section */}
                      <div className="p-3.5 sm:p-5 pb-0 text-left">
                       
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-medium text-xs sm:text-sm text-gray-500 group-hover:text-[#DE1D3A] transition-colors line-clamp-2 leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                    </div>

                    {/* View Details Link Footer */}
                    <div className="p-2.5 sm:p-5 pt-2 sm:pt-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-slate-50 hover:bg-[#DE1D3A] text-slate-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold sm:font-bold shadow-xs group/btn cursor-pointer whitespace-nowrap"
                      >
                        <span className="whitespace-nowrap">View Details</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom Consultation Banner */}
          <div className="mt-16 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs text-left">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DE1D3A]">
                Custom Fabrication &amp; Engineering
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                Looking for specific machinery dimensions or custom SS fabrication?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We manufacture bespoke commercial kitchen machinery, stainless steel prep tables, exhaust hoods, and bakery systems tailored to your floorplan.
              </p>
            </div>
            <Link
              href="/contact"
              className="whitespace-nowrap px-6 py-3.5 bg-slate-900 hover:bg-[#DE1D3A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
