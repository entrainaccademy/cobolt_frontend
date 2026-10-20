'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home as HomeIcon, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { productsList } from '../data/products';
import { fetchProducts } from '../lib/api';

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

export default function CategoryDetail({ category }) {
  const fallback = productsList.filter(
    (p) => p.category?.toLowerCase() === category.name.toLowerCase()
  );
  const [products, setProducts] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const live = await fetchProducts({ category: category.name });
        if (isMounted && Array.isArray(live) && live.length > 0) {
          setProducts(live);
        }
      } catch (err) {
        console.error('Failed to load category products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [category.name]);

  return (
    <PageWrapper>
      {/* Category Hero / Header */}
      

      {/* Category Products Grid */}
      <section className="py-12 sm:py-16 mt-10 bg-[#FFFFFF] min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] font-display">
                Available Models & Equipment
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Showing {products.length} {products.length === 1 ? 'machinery' : 'machineries'} in this category
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#DE1D3A] hover:underline flex items-center gap-1"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {products.length === 0 && !loading ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-gray-500 text-sm">No machineries currently listed under this category.</p>
              <Link
                href="/products"
                className="mt-3 inline-block text-xs font-bold text-[#DE1D3A] hover:underline"
              >
                Browse all catalog items
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product, idx) => {
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
                      {/* Product Image Area */}
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
                        {/* Discount Badge */}
                        {/* {pricing.hasOffer && pricing.discount && (
                          <span className="absolute top-3 right-3 bg-[#DE1D3A] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-xs tracking-tight">
                            {pricing.discount}
                          </span>
                        )} */}
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
