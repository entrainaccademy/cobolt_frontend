'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, ChevronRight, ShieldCheck, Award, Printer } from 'lucide-react';
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

          {/* Product Header Title (Printed) */}
          <div className="text-left mb-8 print:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl print:text-2xl font-bold text-gray-900 font-display leading-tight uppercase">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-sm sm:text-base print:text-sm font-medium text-[#DE1D3A] mt-1">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Main Showcase: Image + Technical Specifications (Printed) */}
          <div className="mb-12 print:mb-0 flex flex-col md:flex-row print:flex-row items-center md:items-start print:items-start gap-8 lg:gap-12 print:gap-8">
            
            {/* Left: Product Image & Gallery */}
            <div className="w-full md:w-1/2 print:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 print:p-2 bg-white">
              <div className="w-full min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
                <Image
                  src={selectedPhoto || getSrc(product.image)}
                  alt={product.name}
                  width={500}
                  height={500}
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="max-h-[320px] print:max-h-[340px] w-auto max-w-full object-contain filter drop-shadow-sm print:drop-shadow-none transition-all duration-300"
                />
              </div>

              {/* Thumbnails if multiple photos exist */}
              {Array.isArray(product.images) && product.images.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 print:hidden">
                  {product.images.map((img, idx) => {
                    const src = getSrc(img);
                    const isCurrent = (selectedPhoto || getSrc(product.image)) === src;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPhoto(src)}
                        className={`w-14 h-14 rounded-lg border-2 p-1 overflow-hidden transition-all duration-200 cursor-pointer ${
                          isCurrent
                            ? 'border-[#DE1D3A] ring-2 ring-[#DE1D3A]/20 scale-105'
                            : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${product.name} photo ${idx + 1}`}
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Technical Specifications */}
            <div className="w-full md:w-1/2 print:w-1/2 flex flex-col justify-center text-left">
              <h2 className="text-sm sm:text-base print:text-sm font-bold text-gray-900 font-display uppercase tracking-wider mb-4 print:mb-3">
                Technical Specifications
              </h2>

              {product.specs ? (
                <div className="border border-gray-200 print:border-gray-300 rounded-xl print:rounded-lg overflow-hidden bg-white shadow-xs print:shadow-none">
                  <table className="min-w-full divide-y divide-gray-100 print:divide-gray-200 text-left">
                    <tbody className="divide-y divide-gray-100 print:divide-gray-200 bg-white">
                      {Array.isArray(product.specs) ? (
                        product.specs.map((spec, idx) => (
                          <tr key={idx} className="bg-white">
                            <td className="px-5 py-3.5 print:px-4 print:py-3 text-sm sm:text-base print:text-xs font-bold text-gray-900 w-2/5 border-r border-gray-100 print:border-gray-200">
                              {typeof spec === 'object' ? spec.label : 'Specification'}
                            </td>
                            <td className="px-5 py-3.5 print:px-4 print:py-3 text-sm sm:text-base print:text-xs font-medium text-gray-700">
                              {typeof spec === 'object' ? spec.value : spec}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="bg-white">
                          <td className="px-5 py-4 print:px-4 print:py-3 text-sm sm:text-base print:text-xs text-gray-700" colSpan={2}>
                            {product.specs}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Contact us for custom mechanical tolerances and drawings.</p>
              )}
            </div>
          </div>

          {/* Bottom Section: Description & Actions + Accessories & Trust Badges (Hidden in Print) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start text-left pt-6 border-t border-gray-100 print:hidden">
            
            {/* Description & Action Buttons */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 min-w-[160px] px-6 py-3.5 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* <button
                  onClick={() => window.print()}
                  className="px-5 py-3.5 border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-400 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Print Specification Sheet"
                >
                  <Printer className="w-4 h-4" /> Print Specs
                </button> */}
              </div>
            </div>

            {/* Included Accessories & Quality Badges */}
            <div className="space-y-6">
              {product.accessories && product.accessories.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Included Accessories
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.accessories.map((acc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-700 bg-white border border-gray-200 px-3 py-2.5 rounded-lg shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                        <span>{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality & Assurance Badges */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#DE1D3A] flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-gray-900">Food Grade SUS304</p>
                    <p className="text-[10px] text-gray-500">Commercial Standard</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <Award className="w-4 h-4 text-[#DE1D3A] flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-gray-900">Warranty Coverage</p>
                    <p className="text-[10px] text-gray-500">Parts & Factory Support</p>
                  </div>
                </div>
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
