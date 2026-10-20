'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  MapPin,
  Youtube,
  Facebook,
  Instagram,
  Mail,
  Shield,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

import blacklogo from '../assets/blacklogotr.webp';

const productCategories = [
  { name: 'Food Preparation Machines', slug: 'food-preparation-machines' },
  { name: 'Refrigeration Items', slug: 'refrigeration-items' },
  { name: 'Baking Equipments', slug: 'baking-equipments' },
  { name: 'Cooking Equipments', slug: 'cooking-equipments' },
  { name: 'Stainless Steel Fabrications', slug: 'stainless-steel-fabrications' },
  { name: 'Industrial And Food Service', slug: 'industrial-and-food-service' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const productsTimeoutRef = useRef(null);
  const pathname = usePathname();

  const handleMouseEnterProducts = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setIsProductsHovered(true);
  };

  const handleMouseLeaveProducts = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false);
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu & hover popups when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsHovered(false);
  }, [pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Hide public navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    // { name: 'Shop', path: '/products' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <div className="print:hidden">
      {/* Top Info Bar (Desktop Only) */}
      <div className="hidden md:block w-full bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 py-2.5 text-xs relative z-50">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/contact?loc=veepoor" className="flex items-center gap-2 hover:text-accent transition-colors text-slate-600 font-sans">
              <MapPin className="w-3.5 h-3.2 text-[#DE1D3A]" />
              <span className="text-xs font-semibold text-slate-700">Veembur, Manjeri, Kerala</span>
            </Link>
            <a
              href="mailto:infocobolt123@gmail.com?subject=Enquiry&body=Hello COBOLT Machineries,"
              className="flex items-center gap-2 hover:text-accent transition-colors text-slate-600 font-sans"
            >
              <Mail className="w-3.5 h-3.5 text-[#DE1D3A]" />
              <span className="text-xs font-semibold text-slate-700">infocobolt123@gmail.com</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <a
                href="https://www.youtube.com/@coboltmachineries"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent text-slate-400 hover:scale-105 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5 text-[#DE1D3A]" />
              </a>
              <a
                href="https://www.facebook.com/people/Cobolt-Machineries/pfbid0gxTrWUxQHVPqtLuogLtgoc1uMcM2FDJkFQueQfYoxopVvW3wzneqV2bq1EBBWsRFl/?mibextid=ZbWKwL"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent text-slate-400 hover:scale-105 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3 text-[#DE1D3A]" />
              </a>
              <a
                href="https://www.instagram.com/coboltmachineries"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent text-slate-400 hover:scale-105 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3 text-[#DE1D3A]" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919061782023"
              className="flex items-center gap-1.5 px-4 py-1 bg-red/10 hover:bg-accent text-[#2596be] hover:text-white text-xs font-poppins font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 animate-pulse-glow"
            >
              <Phone className="w-3 h-3 text-[#DE1D3A]" />
              <span className="text-[#DE1D3A]">Call Now</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'top-0.5 px-0'
            : 'top-5 sm:top-14 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div
          className={`mx-auto w-full transition-all duration-500 ease-in-out ${
            isScrolled
              ? 'max-w-none rounded-none bg-white/90 backdrop-blur-lg shadow-[0_4px_25px_rgba(15,23,42,0.06)] border-b border-slate-100 py-3 px-4 sm:px-6 lg:px-8'
              : 'max-w-7xl rounded-2xl bg-white/30 md:bg-white/40 backdrop-blur-lg border-red-900/40 shadow-[0_8px_30px_rgba(15,23,42,0.04)] py-4 px-6 md:px-8'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Brand Block */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group gap-2">
                <Image
                  className="h-8 md:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  src={blacklogo}
                  alt="Cobolt Machineries Logo"
                  width={600}
                  height={178}
                  sizes="(max-width: 768px) 115px, 202px"
                />
              </Link>
            </div>

            {/* Navigation links (Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.name === 'Shop'
                    ? pathname === '/products'
                    : link.name === 'Products'
                    ? pathname.startsWith('/products/category')
                    : pathname === link.path;

                // Products link with category popup dropdown
                if (link.name === 'Products') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterProducts}
                      onMouseLeave={handleMouseLeaveProducts}
                    >
                      <Link
                        href={link.path}
                        prefetch={false}
                        className={`px-4 py-2 text-[13px] font-sans font-medium uppercase tracking-wider transition-all duration-300 relative group flex items-center gap-1 ${
                          isActive || isProductsHovered
                            ? 'text-[#DE1D3A] font-semibold'
                            : 'text-slate-800 hover:text-[#DE1D3A] font-medium'
                        }`}
                      >
                        <span className="relative block">
                          <span className="relative z-10 flex items-center gap-1 transition-transform duration-300 group-hover:-translate-y-[2px]">
                            {link.name}
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                isProductsHovered
                                  ? 'rotate-180 text-[#DE1D3A]'
                                  : 'text-slate-400 group-hover:text-[#DE1D3A]'
                              }`}
                            />
                          </span>
                          <span
                            className={`absolute -bottom-1 left-0 h-[2px] bg-[#DE1D3A] transition-all duration-300 ease-out ${
                              isActive
                                ? 'w-full opacity-100'
                                : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                            }`}
                          />
                        </span>
                      </Link>

                      {/* Categories Dropdown Popup */}
                      {isProductsHovered && (
                        <div
                          className="absolute top-full -left-36 lg:-left-28 pt-3 w-[540px] lg:w-[580px] z-50 animate-fade-in"
                          onMouseEnter={handleMouseEnterProducts}
                          onMouseLeave={handleMouseLeaveProducts}
                        >
                          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.16)] p-3.5 text-left">
                            {/* 2-Column Categories Grid */}
                            <div className="grid grid-cols-2 gap-1.5">
                              {productCategories.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  href={`/products/category/${cat.slug}`}
                                  onClick={() => setIsProductsHovered(false)}
                                  className="group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-red-50/80 transition-all duration-200 text-slate-700 hover:text-[#DE1D3A]"
                                >
                                  <span className="font-display font-medium text-[13px] transition-colors truncate">
                                    {cat.name}
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 text-[#DE1D3A] flex-shrink-0 ml-1" />
                                </Link>
                              ))}
                            </div>

                            {/* Dropdown Footer Callout */}
                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-3.5 -mb-3.5 px-4 py-2.5 rounded-b-2xl">
                              <span className="text-[11px] text-slate-500 font-sans">
                                Need custom equipment specifications?
                              </span>
                              <Link
                                href="/products"
                                onClick={() => setIsProductsHovered(false)}
                                className="text-[11px] font-bold text-[#DE1D3A] hover:underline flex items-center gap-1 font-sans"
                              >
                                View All Products →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    prefetch={false}
                    className={`px-4 py-2 text-[13px] font-sans font-medium uppercase tracking-wider transition-all duration-300 relative group block ${
                      isActive
                        ? 'text-[#DE1D3A] font-semibold'
                        : 'text-slate-800 hover:text-[#DE1D3A] font-medium'
                    }`}
                  >
                    <span className="relative block">
                      <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-[2px]">
                        {link.name}
                      </span>
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#DE1D3A] transition-all duration-300 ease-out ${
                          isActive
                            ? 'w-full opacity-100'
                            : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                        }`}
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Action CTA Block (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-[#DE1D3A] text-white font-poppins font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#DE1D3A]/25 hover:shadow-[#DE1D3A]/40 hover:bg-[#c51831] hover:-translate-y-0.5 transition-all duration-300 ease-out active:translate-y-0 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  Get Quote
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="absolute inset-0 bg-[#c51831] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2.5 rounded-full text-slate-700 hover:text-[#DE1D3A] hover:bg-slate-100/80 focus:outline-none transition-all duration-200"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="block text-[#DE1D3A] h-5.5 w-5.5" />
                ) : (
                  <Menu className="block text-[#DE1D3A] h-5.5 w-5.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Screen Mobile Overlay Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] bg-white border-l border-slate-100 md:hidden transition-all duration-500 ease-in-out transform flex flex-col justify-between p-8 pt-24 shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button in drawer */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Large Links List */}
        <div className="space-y-2 text-left relative z-10 flex-grow mt-6 overflow-y-auto">
          {navLinks.map((link, idx) => {
            const isActive =
              link.name === 'Shop'
                ? pathname === '/products'
                : link.name === 'Products'
                ? pathname.startsWith('/products/category')
                : pathname === link.path;

            // Mobile Products with Collapsible Categories
            if (link.name === 'Products') {
              return (
                <div
                  key={link.name}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  className={`transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Link
                      href={link.path}
                      prefetch={false}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex-grow py-3.5 px-4 text-xs font-poppins font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'text-[#DE1D3A] bg-[#DE1D3A]/10 border-l-4 border-[#DE1D3A] pl-5'
                          : 'text-slate-700 hover:text-[#DE1D3A] hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                      className="p-3 text-slate-500 hover:text-[#DE1D3A] transition-colors"
                      aria-label="Toggle categories"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isMobileProductsOpen ? 'rotate-180 text-[#DE1D3A]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isMobileProductsOpen && (
                    <div className="ml-4 pl-3 border-l-2 border-red-100 space-y-1 mt-1 mb-2">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products/category/${cat.slug}`}
                          prefetch={false}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 px-3 text-[12px] font-medium text-slate-600 hover:text-[#DE1D3A] hover:bg-red-50/60 rounded-lg transition-colors truncate"
                        >
                          {cat.name}
                        </Link>
                      ))}
                      <Link
                        href="/products"
                        prefetch={false}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-3 text-[12px] font-bold text-[#DE1D3A] hover:bg-red-50/60 rounded-lg transition-colors"
                      >
                        All Products →
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={link.name}
                style={{ transitionDelay: `${idx * 40}ms` }}
                className={`transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
              >
                <Link
                  href={link.path}
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3.5 px-4 text-xs font-poppins font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-[#DE1D3A] bg-[#DE1D3A]/10 border-l-4 border-[#DE1D3A] pl-5'
                      : 'text-slate-700 hover:text-[#DE1D3A] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile Info Footer */}
        <div
          className={`space-y-6 border-t border-slate-100 pt-6 text-left relative z-10 transform transition-all duration-500 delay-200 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                24/7 Hotline Support
              </span>
              <a
                href="tel:9061782023"
                className="block text-sm font-sora font-semibold tracking-wider text-slate-800 hover:text-[#DE1D3A] transition-colors duration-200"
              >
                +91 9061782023
              </a>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Branch Facility
              </span>
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                <Link href="/contact?loc=veepoor" className="hover:text-[#DE1D3A] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#DE1D3A] flex-shrink-0" />
                  <span>Veemboor, Manjeri, Kerala</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-[#DE1D3A] to-[#F04A63] hover:from-[#C91834] hover:to-[#DE1D3A] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#DE1D3A]/30 hover:shadow-xl hover:shadow-[#DE1D3A]/40 hover:scale-[1.02] text-center"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            {/* <Link
              href="/admin"
              className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-700 hover:text-[#DE1D3A] hover:border-[#DE1D3A] text-xs font-bold uppercase tracking-widest rounded-xl transition-all bg-slate-50 hover:bg-white text-center"
            >
              <Shield className="w-4 h-4 text-[#DE1D3A]" />
              <span>Admin Portal</span>
            </Link> */}
          </div>

          {/* Social Icons for Mobile */}
          <div className="flex justify-center gap-6 pt-2 border-t border-slate-100 mt-2">
            <a
              href="https://www.youtube.com/@coboltmachineries"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-accent transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/people/Cobolt-Machineries/pfbid0gxTrWUxQHVPqtLuogLtgoc1uMcM2FDJkFQueQfYoxopVvW3wzneqV2bq1EBBWsRFl/?mibextid=ZbWKwL"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-accent transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/coboltmachineries"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-accent transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:infocobolt123@gmail.com"
              className="text-slate-400 hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
