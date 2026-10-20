'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Settings,
  ShieldCheck,
  Cpu,
  Clock,
  Award,
  Users,
  ChevronRight,
  Truck,
  Info,
  Search,
  CheckCircle2,
  Building2,
  Factory,
  MessageSquare,
  Sparkles,
  ShoppingCart,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import ScrollReveal from '../components/ScrollReveal';
import ClientMarquee from '../components/ClientMarquee';
import { productsList as fallbackProducts } from '../data/products';
import { fetchProducts } from '../lib/api';

// =========================================================================
// 1. MEDIA ASSETS CONFIGURATION (REPLACE IMAGES / LOGOS HERE)
// =========================================================================

// Cobolt Machineries Logo:
// Replace this import or update the file to change the logo.
import coboltLogo from '../assets/blacklogotr.webp';

import coboltbanner3 from '../assets/banner3.jpeg'
import coboltbanner from '../assets/coboltbanner.jpeg'
// import coboltbanner from '../assets/coboltbanner.jpeg'

// Company Image for Section 4 (About the Company):
// Replace this import with your factory / team / engineering facility photo.
import companyAboutImg from '../assets/hm_about1.webp';

// Category Showcase Images (Section 3):
// Replace individual category images below as needed.
import foodPrepCategoryImg from '../assets/Products/p3.jpeg';
import bakingCategoryImg from '../assets/Products/b1.jpg';
import cookingCategoryImg from '../assets/Products/c1.jpg';
import ssFabCategoryImg from '../assets/Products/s1.jpg';
import industrialCategoryImg from '../assets/3potchoco.jpeg';

// Client Brands Logos
import brandimg1 from '../assets/brand_img01.png';
import brandimg2 from '../assets/brand_img02.png';
import brandimg3 from '../assets/brand_img03.png';
import brandimg4 from '../assets/brand_img04.png';
import brandimg5 from '../assets/brand_img05.png';
import brandimg6 from '../assets/brand_img06.png';
import brandimg7 from '../assets/brand_img07.png';
import brandimg8 from '../assets/brand_img08.png';
import brandimg9 from '../assets/brand_img09.png';
import brandimg10 from '../assets/brand_img10.png';
import brandimg11 from '../assets/brand_img11.png';
import brandimg12 from '../assets/brand_img12.png';
import brandimg13 from '../assets/brand_img13.png';
import brandimg14 from '../assets/icon_sml2.webp';
import brandimg15 from '../assets/neva2.webp';
import brandimg16 from '../assets/sattara2n.webp';
import brandimg17 from '../assets/supreme2.webp';
import brandimg18 from '../assets/mfc.webp';
import brandimg19 from '../assets/eatveg.webp';
import chickyBells from '../assets/chicky_bells.webp';

const brandLogos = [
  brandimg8,
  brandimg6,
  brandimg10,
  brandimg11,
  brandimg12,
  brandimg13,
  brandimg14,
  brandimg15,
  brandimg16,
  brandimg9,
  brandimg17,
  brandimg18,
  brandimg19,
  chickyBells,
  brandimg7,
];

const brandLogos2 = [
  brandimg9,
  brandimg1,
  brandimg2,
  brandimg3,
  chickyBells,
  brandimg4,
  brandimg5,
  brandimg7,
];

const brandLogosinmobile = [
  brandimg8,
  brandimg6,
  brandimg10,
  brandimg11,
  brandimg12,
  brandimg13,
  brandimg14,
  brandimg15,
  brandimg16,
  brandimg9,
  brandimg1,
  brandimg2,
  brandimg3,
  brandimg4,
  brandimg5,
  brandimg7,
  brandimg18,
  brandimg19,
  chickyBells,
];

// =========================================================================
// 2. COMPANY STATISTICS (EDITABLE FIGURES FROM EXISTING PROJECT DATA)
// =========================================================================
const companyStatistics = [
  {
    id: 'clients',
    number: '30000+',
    label: 'Active Clients',
    description: 'Commercial kitchens, cloud chains, and heavy food manufacturing plants.',
  },
  {
    id: 'experience',
    number: '7+',
    label: 'Years Experience',
    description: 'Precision mechanical engineering and machinery fabrication established in 2001.',
  },
  {
    id: 'machines',
    number: '3500+',
    label: 'Machines Installed',
    description: 'High-output commercial fryers, deck ovens, planetary mixers, and fabrication rigs.',
  },
  {
    id: 'quality',
    number: '100%',
    label: 'Food-Grade SUS304',
    description: 'ISO 9001:2015 certified engineering standards with complete warranty & AMC coverage.',
  },
];

// =========================================================================
// 3. PRODUCT CATEGORIES (5 SPECIFIED CATEGORIES WITH IMAGES & LINKS)
// =========================================================================
const categoryCards = [
  {
    name: 'Food Preparation Machines',
    slug: 'food-preparation-machines',
    image: foodPrepCategoryImg,
    tagline: 'Planetary Mixers, Slicers & Commercial Fryers',
    itemCount: '20+ Models',
    description: 'Heavy-duty planetary mixers, vegetable preparation dicers, meat grinders, and commercial open fryers.',
  },
  {
    name: 'Baking Equipments',
    slug: 'baking-equipments',
    image: bakingCategoryImg,
    tagline: 'Industrial Gas & Electric Deck Ovens',
    itemCount: '11+ Models',
    description: 'Precision 1 to 3 deck baking ovens, stone-base pizza ovens, and high-capacity bakery production rigs.',
  },
  {
    name: 'Cooking Equipments',
    slug: 'cooking-equipments',
    image: cookingCategoryImg,
    tagline: 'Heavy Burner Ranges & Shawaya Rotisseries',
    itemCount: '6+ Models',
    description: '4-burner commercial cooking ranges with standard ovens, high-capacity shawaya machines, and patty presses.',
  },
  {
    name: 'Stainless Steel Fabrications',
    slug: 'stainless-steel-fabrications',
    image: ssFabCategoryImg,
    tagline: 'Custom Food-Grade SS 304 Work Tables & Hoods',
    itemCount: 'Custom Built',
    description: 'Bespoke food-grade stainless steel prep tables, overshelves, sinks, and commercial exhaust hoods.',
  },
  {
    name: 'Industrial And Food Service',
    slug: 'industrial-and-food-service',
    image: industrialCategoryImg,
    tagline: 'Bain-Marie Warmers & Curved Display Cases',
    itemCount: 'Commercial Rigs',
    description: 'Precision bain-marie 3-pot chocolate warmers, thermostatically controlled curved warming displays, and buffet units.',
  },
];

// Preserved Core Features
const features = [
  {
    icon: Cpu,
    title: 'High-Precision Systems',
    description: 'Calibrated down to micron levels to deliver flawless part tolerances and repeatability.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Safety & Quality',
    description: 'Full ISO-9001 and CE compliance across all fabricated rigs and machinery components.',
  },
  {
    icon: Settings,
    title: 'Custom Machining Rigs',
    description: 'Bespoke engineering from blueprinting to stress-testing tailored to your manufacturing floor.',
  },
  // {
  //   icon: Clock,
  //   title: '24/7 Deployment Support',
  //   description: 'Dedicated rapid-response service crew for zero-disruption installation and emergency repairs.',
  // },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Optimized logistics and rapid-dispatch pipelines ensuring prompt site delivery and assembly timelines.',
  },
  {
    icon: Award,
    title: '100% Material Quality',
    description: 'Premium food-grade SUS304/316 steels and heavy-duty alloys sourced from certified global foundries.',
  },
];

// Helper to safely extract image source string
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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);

  // Fetch live products from backend with fallback
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load products from backend:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products for Section 5 E-commerce showcase
  const filterCategories = [
    'All',
    'Food Preparation Machines',
    'Baking Equipments',
    'Cooking Equipments',
    'Stainless Steel Fabrications',
    'Industrial And Food Service',
    'Refrigeration Items',
  ];

  const displayedProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery.trim() ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper>
      {/* =========================================================================
          SECTION 1: HERO BANNER
          ========================================================================= */}
      <section className="relative min-h-[640px] sm:min-h-[700px] lg:h-[90vh] lg:min-h-[760px] w-full overflow-hidden bg-[#0F172A] flex items-center">
        {/* Large, premium-looking hero banner video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/mainvd5mb_poster.webp"
            className="w-full h-full object-cover object-center"
          >
            <source src="/mainvd5mb.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:py-0">
          <div className="max-w-3xl text-left space-y-6">
         

            {/* Concise Headline about Industrial Food Machinery */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight font-display tracking-tight drop-shadow-md">
              Commercial &amp; Industrial Food Machinery Solutions
            </h1>

            {/* Short Supporting Line */}
            <p className="text-sm sm:text-base md:text-lg text-slate-900 leading-relaxed font-sans max-w-2xl drop-shadow-sm font-normal">
              Equip your restaurant, bakery, cloud kitchen, or processing plant with heavy-duty machinery engineered for high continuous output, maximum safety, and precision.
            </p>

            {/* Clear Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#categories"
                className="px-5 py-2.5 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#DE1D3A]/30 hover:shadow-xl transition-all duration-300 flex items-center group font-sans cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <Link
                href="/contact"
                className="px-5 py-2.5 bg-black/10 hover:bg-white/20 text-black text-sm font-semibold rounded-xl border border-white/30 hover:border-white/50 backdrop-blur-md transition-all duration-300 font-sans hover:-translate-y-0.5 active:translate-y-0"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPANY STATISTICS
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-white  text-gray-900  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {companyStatistics.map((stat, idx) => (
              <div
                key={stat.id}
                className={`text-center sm:text-left ${
                  idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DE1D3A] font-display tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-800 mt-1.5 uppercase tracking-wider">
                  {stat.label}
                </div>
                {/* {stat.description && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {stat.description}
                  </p>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PRODUCT CATEGORIES
          ========================================================================= */}
      <section id="categories" className="py-14 sm:py-20 bg-[#FFFFFF] relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111827] font-display tracking-tight">
              Explore by Equipment Category
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
              {/* Browse our specialized commercial food machinery divisions engineered for bakeries, restaurants, catering lines, and food processing factories. */}
            </p>
          </div>

          {/* 5 Prominent Category Cards (Matches reference photo) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/category/${cat.slug}`}
                className="group bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 p-5 sm:p-6 flex flex-col items-center justify-between text-center hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Category Image */}
                <div className="relative w-full h-36 sm:h-44 md:h-48 flex items-center justify-center p-2 mb-3">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={260}
                    height={260}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Category Title & Explore Link */}
                <div className="w-full flex flex-col items-center pt-1">
                  <h3 className="font-bold text-xs sm:text-sm lg:text-[15px] text-gray-900 group-hover:text-[#DE1D3A] transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                    {cat.name}
                  </h3>

                  <div className="mt-2 text-xs sm:text-sm font-semibold text-[#1E40AF] group-hover:text-[#DE1D3A] transition-colors inline-flex items-center gap-1 font-sans">
                    <span>Explore</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ABOUT THE COMPANY
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5E7EB] max-h-[520px] bg-white">
                <Image
                  src={companyAboutImg}
                  alt="Cobolt Machineries - Manufacturing Excellence"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>

         
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
            

              {/* Heading: Manufacturing Excellence Since 2001 */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-display leading-tight">
                Manufacturing Excellence Since 2001
              </h2>

              {/* Company Description */}
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-sans font-medium">
                Cobolt Machineries is a premium global manufacturer of high-end industrial machinery. We bridge the gap between complex engineering concepts and reliable physical manufacturing equipment, delivering solutions that scale operations while preserving razor-sharp accuracy.
              </p>

              <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                From in-house metallurgical casting to precision CNC programming, our Kerala-based facility produces commercial bakery deck ovens, planetary dough mixers, cooking ranges, and custom food-grade SUS304 fabrication layouts with complete preventative maintenance and on-site setup.
              </p>
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FCE8EC] flex items-center justify-center text-[#DE1D3A] flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#DE1D3A]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827] text-xs font-display">Heavy-Duty Metallurgy</h5>
                    <p className="text-[#6B7280] text-[11px]">Food-grade SUS304 &amp; cast alloys</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FCE8EC] flex items-center justify-center text-[#DE1D3A] flex-shrink-0">
                    <Award className="w-4 h-4 text-[#DE1D3A]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827] text-xs font-display">ISO 9001:2015 Certified</h5>
                    <p className="text-[#6B7280] text-[11px]">Quality management certified</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-[#DE1D3A] hover:text-[#B7152D] font-bold text-sm transition-colors duration-200 group"
                >
                  Discover Our Story
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: E-COMMERCE-STYLE PRODUCT SHOWCASE
          ========================================================================= */}
      <section id="products" className="py-20 sm:py-28 bg-[#FFFFFF] relative scroll-mt-20">
        <div id="shop" className="scroll-mt-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-display tracking-tight">
              Machineries &amp; Industrial Toolings
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
              Explore our flagship product catalog. Filter by equipment category or search specifications to enquire directly for factory-direct commercial pricing.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="mb-10 space-y-5">
            {/* Search Input */}
            {/* <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search machineries by model, specification, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all shadow-xs"
              />
              {loading && (
                <div className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              )}
            </div> */}

            {/* Category Filter Pills */}
            {/* <div className="flex flex-wrap justify-center gap-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-xl border backdrop-blur-sm transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#DE1D3A] text-white border-[#DE1D3A] shadow-sm font-semibold'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#DE1D3A]/40 hover:text-[#DE1D3A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div> */}
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
                className="mt-3 text-xs font-bold text-[#DE1D3A] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.slice(0, 8).map((product, idx) => {
                const imgSrc = getSrc(product.image);
                const uniqueKey = product._id ? String(product._id) : `${product.id || 'prod'}-${idx}`;
                const pricing = getPriceDisplay(product, idx);

                return (
                  <div
                    key={uniqueKey}
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
                          {/* {pricing.orig && (
                            <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                              {pricing.orig}
                            </span>
                          )} */}
                          {/* <span className="text-xs sm:text-sm font-bold text-[#DE1D3A]">
                            {pricing.current}
                          </span> */}
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
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Catalog Action Link */}
          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-[#DE1D3A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md group"
            >
              <span>View Full Machinery Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRESERVED SUPPORTING SECTIONS (CLIENT MARQUEE, FEATURES, BLOG, CTA)
          ========================================================================= */}

      {/* Client Marquee Strip */}
      <ClientMarquee
        brandLogos={brandLogos}
        brandLogos2={brandLogos2}
        brandLogosinmobile={brandLogosinmobile}
      />

      {/* Why Choose Us / Core Strengths */}
      {/* <section className="py-24 bg-[#F8FAFC]/50 border-y border-[#E5E7EB]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#DE1D3A]/5 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="font-sans font-semibold tracking-wider text-xs text-[#DE1D3A] uppercase px-3.5 py-1.5 bg-[#FCE8EC]/50 rounded-full border border-[#DE1D3A]/20 inline-block">
              Our Core Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-display tracking-tight">
              Why Commercial Kitchens Partner with Cobolt
            </h2>
            <p className="text-[#6B7280] text-[14px] md:text-base max-w-2xl mx-auto leading-relaxed">
              We understand that even a single minute of machine downtime represents massive loss. We engineer stability into every joint and code reliability into every system.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 bg-[#F8FAFC] gap-4 sm:gap-10">
            {features.map((feature, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="group relative border border-[#E5E7EB] shadow-xs shadow-[#DE1D3A]/60 hover:border-[#DE1D3A]/20 hover:shadow-[0_20px_40px_rgba(222,29,58,0.06)] rounded-2xl p-4 md:p-8 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start text-left overflow-hidden bg-white"
              >
                <div className="hidden md:block absolute top-6 right-8 text-3xl font-extrabold font-display text-[#E5E7EB] select-none pointer-events-none group-hover:text-[#DE1D3A]/10 transition-colors duration-500">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#DE1D3A]/5 text-[#DE1D3A] group-hover:bg-[#DE1D3A] group-hover:text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-[#DE1D3A]/5 group-hover:shadow-[#DE1D3A]/25 transition-all duration-500">
                  <feature.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                </div>

                <h3 className="font-display font-semibold md:font-bold text-sm md:text-lg text-[#6B7280] mb-3 group-hover:text-[#DE1D3A] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] text-[12px] md:text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#DE1D3A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* Latest Blog Posts Section */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-4 text-left max-w-2xl">
              <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest">
                Technical Journals
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-display">
                Latest Machinery Updates &amp; Trends
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#E5E7EB] hover:border-[#DE1D3A] text-sm font-semibold rounded-lg text-[#DE1D3A] hover:bg-[#F8FAFC] transition-all duration-200 flex-shrink-0 group"
            >
              Visit Blog
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[#E5E7EB] bg-[#F8FAFC] hover:bg-[#FFFFFF] rounded-xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group">
              <div>
                <span className="text-[#DE1D3A] text-xs font-semibold uppercase tracking-wider">Maintenance Guide</span>
                <h3 className="font-display font-bold text-xl text-[#111827] group-hover:text-[#DE1D3A] transition-colors duration-200 mt-3 mb-2">
                  5 Essential Checks for High-Speed Spindles
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                  Spindle thermal drift is the primary cause of dimension errors. Learn how oil cooling systems and vibration sensing prevent spindle failure.
                </p>
              </div>
              <Link href="/blog" className="text-[#DE1D3A] hover:text-[#B7152D] font-bold text-xs flex items-center gap-1.5 transition-colors duration-200">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="border border-[#E5E7EB] bg-[#F8FAFC] hover:bg-[#FFFFFF] rounded-xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group">
              <div>
                <span className="text-[#DE1D3A] text-xs font-semibold uppercase tracking-wider">Industrial IoT</span>
                <h3 className="font-display font-bold text-xl text-[#111827] group-hover:text-[#DE1D3A] transition-colors duration-200 mt-3 mb-2">
                  Integrating PLC Data with Enterprise ERP Systems
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                  How manufacturing floors leverage automated Modbus/TCP relays to log parts count and predictive health checks directly into billing databases.
                </p>
              </div>
              <Link href="/blog" className="text-[#DE1D3A] hover:text-[#B7152D] font-bold text-xs flex items-center gap-1.5 transition-colors duration-200">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Support / Contact CTA Banner */}
      <section className="py-28 bg-gradient-to-br from-[#121824] via-[#0B0F19] to-[#121824] text-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#DE1D3A]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#DE1D3A]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#DE1D3A]/5 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DE1D3A]/10 border border-[#DE1D3A]/20 text-[#DE1D3A] text-xs font-bold uppercase tracking-widest rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE1D3A] animate-pulse" />
                Operational Support
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                Ready to Optimize Your Production Output?
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Discuss your machinery specifications, structural tolerances, or maintenance schedules with our lead system designers today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#DE1D3A] to-[#B7152D] hover:from-[#B7152D] hover:to-[#DE1D3A] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#DE1D3A]/20 hover:shadow-xl hover:shadow-[#DE1D3A]/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center group"
                >
                  Consult an Engineer
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/919061782023"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.004 0C5.378 0 0 5.378 0 12.004c0 2.115.549 4.18 1.597 6.009L.057 24l6.163-1.619c1.77.962 3.766 1.468 5.78 1.468 6.626 0 12.004-5.378 12.004-12.004C24.004 5.378 18.626 0 12.004 0zm0 22.015c-1.804 0-3.578-.485-5.127-1.402l-.367-.218-3.805 1.002.998-3.662-.24-.383a9.96 9.96 0 01-1.528-5.348c0-5.518 4.49-10.008 10.008-10.008 5.518 0 10.008 4.49 10.008 10.008-.002 5.522-4.492 10.012-10.008 10.012zm5.496-7.502c-.302-.152-1.785-.881-2.062-.981-.277-.101-.48-.152-.68.152-.201.303-.781.982-.957 1.183-.176.201-.353.227-.655.076-1.205-.603-2.072-1.054-2.898-2.47-.197-.339.197-.315.565-1.05.06-.121.03-.227-.015-.328-.045-.101-.48-1.153-.658-1.58-.173-.418-.348-.362-.48-.369-.124-.007-.267-.008-.41-.008s-.376.054-.572.27c-.197.216-.75.733-.75 1.79s.767 2.08.874 2.222c.106.142 1.51 2.305 3.657 3.232.51.22.909.352 1.22.45.514.163.982.14 1.352.085.412-.061 1.785-.73 2.037-1.436.252-.705.252-1.312.176-1.437-.076-.126-.277-.202-.579-.354z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button (Fixed Bottom-Right) */}
      <a
        href="https://wa.me/919061782023"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#DE1D3A] to-[#FF6B81] shadow-2xl shadow-[#DE1D3A]/25 hover:from-[#DE1D3A] hover:to-[#F04A63] text-white rounded-full transition-all duration-300 flex items-center justify-center animate-pulse-glow hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-7 h-7 text-white fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.004 0C5.378 0 0 5.378 0 12.004c0 2.115.549 4.18 1.597 6.009L.057 24l6.163-1.619c1.77.962 3.766 1.468 5.78 1.468 6.626 0 12.004-5.378 12.004-12.004C24.004 5.378 18.626 0 12.004 0zm0 22.015c-1.804 0-3.578-.485-5.127-1.402l-.367-.218-3.805 1.002.998-3.662-.24-.383a9.96 9.96 0 01-1.528-5.348c0-5.518 4.49-10.008 10.008-10.008 5.518 0 10.008 4.49 10.008 10.008-.002 5.522-4.492 10.012-10.008 10.012zm5.496-7.502c-.302-.152-1.785-.881-2.062-.981-.277-.101-.48-.152-.68.152-.201.303-.781.982-.957 1.183-.176.201-.353.227-.655.076-1.205-.603-2.072-1.054-2.898-2.47-.197-.339.197-.315.565-1.05.06-.121.03-.227-.015-.328-.045-.101-.48-1.153-.658-1.58-.173-.418-.348-.362-.48-.369-.124-.007-.267-.008-.41-.008s-.376.054-.572.27c-.197.216-.75.733-.75 1.79s.767 2.08.874 2.222c.106.142 1.51 2.305 3.657 3.232.51.22.909.352 1.22.45.514.163.982.14 1.352.085.412-.061 1.785-.73 2.037-1.436.252-.705.252-1.312.176-1.437-.076-.126-.277-.202-.579-.354z" />
        </svg>
      </a>
    </PageWrapper>
  );
}
