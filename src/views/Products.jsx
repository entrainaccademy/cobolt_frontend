'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
<<<<<<< HEAD
import { Info, ChevronRight, Search, Loader2 } from 'lucide-react';
=======
import { Info, ChevronRight, Search, Loader2, Shield } from 'lucide-react';
>>>>>>> ca192ae (admin portal)
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { categories as defaultCategories, productsList as initialProducts } from '../data/products';
import { fetchProducts, fetchCategories } from '../lib/api';

const getSrc = (img) => {
  if (!img) return '/slider1.webp';
  if (typeof img === 'object' && img?.src) return img.src;
<<<<<<< HEAD
=======
  if (typeof img === 'string') {
    let s = img.trim();
    if (s.startsWith('http://cobolt-backend.onrender.com')) {
      s = s.replace('http://', 'https://');
    } else if (s.startsWith('http://') && s.includes('.onrender.com')) {
      s = s.replace('http://', 'https://');
    }
    return s;
  }
>>>>>>> ca192ae (admin portal)
  return img;
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(false);

  // Fetch real-time products and categories from backend
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [backendProducts, backendCategories] = await Promise.all([
          fetchProducts({ category: selectedCategory, search: searchQuery }),
          fetchCategories(),
        ]);

        if (isMounted) {
          if (backendProducts && Array.isArray(backendProducts)) {
            setProducts(backendProducts);
          }
          if (backendCategories && Array.isArray(backendCategories)) {
            setCategories(backendCategories);
          }
        }
      } catch (err) {
        console.error('Failed to load products from backend:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadData();
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery]);

  // Client-side fallback filter if offline or using initial static data
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

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-[#DE1D3A] text-gray-700 hover:text-[#DE1D3A] text-xs font-bold uppercase tracking-wider shadow-xs transition-all w-fit cursor-pointer"
              title="Open Admin Panel"
            >
              <Shield className="w-4 h-4 text-[#DE1D3A]" />
              <span>Admin Panel</span>
            </Link>
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

          {/* Product Grid */}
          {displayedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm">No machineries found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-[#DE1D3A] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<<<<<<< HEAD
              {displayedProducts.map((product) => {
                const imgSrc = getSrc(product.image);
                return (
                  <motion.div
                    layout
                    key={`${product.id}-${product.category}`}
=======
              {displayedProducts.map((product, idx) => {
                const imgSrc = getSrc(product.image);
                const uniqueKey = product._id ? String(product._id) : `${product.id || 'prod'}-${idx}`;
                return (
                  <motion.div
                    layout
                    key={uniqueKey}
>>>>>>> ca192ae (admin portal)
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="group border border-[#E5E7EB] bg-[#FFFFFF] rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#DE1D3A]/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="flex flex-col h-full cursor-pointer"
                    >
                      {/* Image Section */}
                      <div className="relative h-60 bg-[#FFFFFF] flex items-center justify-center p-6">
                        <Image
                          src={imgSrc}
                          alt={product.name}
                          width={400}
                          height={300}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          loading="lazy"
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Details Section */}
                      <div className="p-6 pt-2 flex-grow flex flex-col items-start text-left justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold text-[#DE1D3A] uppercase tracking-wider">
                              {product.category}
                            </span>
                            {product.isAvailable === false && (
                              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium border border-amber-200">
                                Pre-Order
                              </span>
                            )}
                          </div>
                          <h3 className="font-display font-bold text-lg text-[#111827] group-hover:text-[#DE1D3A] transition-colors duration-200 mb-2">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed line-clamp-3">
                              {product.description}
                            </p>
                          )}
                        </div>

                        <div className="w-full pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280] font-semibold mt-4">
                          <span className="flex items-center text-[#DE1D3A] group-hover:underline">
                            <Info className="w-3.5 h-3.5 mr-1" /> View Full Details & Specs
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#DE1D3A] group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </Link>
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
