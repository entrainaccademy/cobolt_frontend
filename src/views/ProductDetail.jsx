'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

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

export default function ProductDetail({ product, relatedProducts = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const formattedSpecs = useMemo(() => {
    if (!product?.specs) return [];
    if (Array.isArray(product.specs)) {
      return product.specs
        .map((item) => {
          if (item && typeof item === 'object') {
            return {
              label: item.label || 'Specification',
              value: item.value || '-',
            };
          }
          if (typeof item === 'string') {
            const idx = item.indexOf(':');
            if (idx !== -1) {
              return {
                label: item.slice(0, idx).trim(),
                value: item.slice(idx + 1).trim(),
              };
            }
            return { label: 'Specification', value: item.trim() };
          }
          return { label: 'Specification', value: String(item) };
        })
        .filter((s) => s.label && s.value);
    }
    if (typeof product.specs === 'string') {
      return product.specs
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const idx = line.indexOf(':');
          if (idx !== -1) {
            return {
              label: line.slice(0, idx).trim(),
              value: line.slice(idx + 1).trim(),
            };
          }
          return { label: 'Specification', value: line };
        });
    }
    return [];
  }, [product?.specs]);
  
  if (!product) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-32 bg-white">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">
            The requested machinery does not exist in our catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DE1D3A] text-white font-medium text-sm rounded-lg hover:bg-[#B7152D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="pt-28 pb-16 print:pt-6 print:pb-0 bg-white min-h-screen print:min-h-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 print:px-2 print:max-w-none">
          
          {/* Top Navigation & Breadcrumbs (Hidden in Print) */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-6 text-xs text-gray-500 bg-white print:hidden">
            <nav className="flex items-center space-x-2">
              <Link href="/" className="hover:text-[#DE1D3A] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link href="/products" className="hover:text-[#DE1D3A] transition-colors">
                Products
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-medium truncate max-w-[180px] sm:max-w-xs">
                {product.name}
              </span>
            </nav>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#DE1D3A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
            </Link>
          </div>

          {/* Unified One-View Container: Photo, Description & Specs all in ONE VIEW */}
          <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
            
            {/* Left Column: Product Image, Gallery & Quote Action (6 cols) */}
            <div className="lg:col-span-6 flex flex-col items-center lg:sticky lg:top-28">
              <div className="w-full flex flex-col items-center justify-center bg-white">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={selectedPhoto || getSrc(product.image)}
                    alt={product.name}
                    width={700}
                    height={700}
                    priority
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="max-h-[360px] sm:max-h-[420px] lg:max-h-[460px] w-auto max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Thumbnails if multiple photos exist */}
                {Array.isArray(product.images) && product.images.length > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3 print:hidden">
                    {product.images.map((img, idx) => {
                      const src = getSrc(img);
                      const isCurrent = (selectedPhoto || getSrc(product.image)) === src;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedPhoto(src)}
                          className={`w-16 h-16 rounded-lg border-2 p-1 overflow-hidden transition-all duration-200 cursor-pointer ${
                            isCurrent
                              ? 'border-[#DE1D3A] ring-2 ring-[#DE1D3A]/20 scale-105'
                              : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`${product.name} photo ${idx + 1}`}
                            width={70}
                            height={70}
                            className="w-full h-full object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Title, Description & Specs directly together (6 cols) */}
            <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-display leading-snug uppercase">
                  {product.name}
                </h1>

                {product.tagline && (
                  <p className="text-xs sm:text-sm font-medium text-[#DE1D3A] mt-1">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Technical Specifications (Integrated into the same view) */}
              <div>

                {formattedSpecs.length > 0 ? (
                  <div className="overflow-hidden bg-white">
                    <table className="min-w-full divide-y divide-gray-100 print:divide-gray-200 text-left">
                      <tbody className="divide-y divide-gray-100 print:divide-gray-200 bg-white">
                        {formattedSpecs.map((spec, idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? 'bg-gray-50/60' : 'bg-white hover:bg-gray-50/30'}
                          >
                            <td className="px-3.5 py-1.5 sm:py-2 print:px-2.5 print:py-1.5 text-[10px] sm:text-[11px] font-bold text-gray-800 w-2/5">
                              {spec.label}
                            </td>
                            <td className="px-3.5 py-1.5 sm:py-2 print:px-2.5 print:py-1.5 text-[10px] sm:text-[11px] font-medium text-gray-600">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                    Contact us for custom mechanical tolerances and drawings.
                  </p>
                )}
              </div>

              {/* Action Button: Request Quote (At bottom of spec details) */}
              <div className="w-full pt-2 flex justify-start print:hidden">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="w-full sm:w-[450px] max-w-full py-3 px-5 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Request Quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Related Products (Hidden in Print) */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-100 text-left print:hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 font-display">
                  Related Products
                </h2>
                <Link
                  href="/products"
                  className="text-xs font-semibold text-[#DE1D3A] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((item, idx) => (
                  <Link
                    key={item._id ? String(item._id) : `${item.id || 'rel'}-${idx}`}
                    href={`/products/${item.id}`}
                    className="group border border-gray-200 rounded-xl p-4 bg-white hover:border-[#DE1D3A]/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="h-40 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-4 mb-4">
                      <Image
                        src={getSrc(item.image)}
                        alt={item.name}
                        width={200}
                        height={160}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#DE1D3A] uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#DE1D3A] transition-colors mt-0.5 line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </PageWrapper>
  );
}
