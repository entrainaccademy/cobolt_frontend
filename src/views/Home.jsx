'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Truck,
  Info,
  Search,
  CheckCircle2,
  Building2,
  Factory,
  MessageSquare,
  Sparkles,
  ShoppingCart,
  Headphones,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Hero Videos Configuration:
// Mobile video: /heroinmobile.MP4 (portrait 9:16 optimized for mobile devices)
// Desktop video: /mainvd5mb.mp4 (widescreen 16:9 for tablets and desktops)
const heroMobileVideo = '/heroinmobile.MP4';
const heroDesktopVideo = '/mainvd5mb.mp4';
const heroMobilePoster = '/heroinmobile_poster.webp';
const heroDesktopPoster = '/mainvd5mb_poster.webp';

// Company Image for Section 4 (About the Company):
// Replace this import with your factory / team / engineering facility photo.
import companyAboutImg from '../assets/hm_about1.webp';

// Category Showcase Images (Section 3):
// Replace individual category images below as needed.
import foodPrepCategoryImg from '../../public/category/food.png';
import bakingCategoryImg from '../../public/category/baking.png';
import cookingCategoryImg from '../../public/category/cooking.png';
import ssFabCategoryImg from '../../public/category/stain.png';
import industrialCategoryImg from '../../public/category/service.png';

// Client Brands Logos
import brandimg1 from '../assets/brand_img01.png';
import brandimg2 from '../assets/brand_img02.png';
import brandimg3 from '../assets/brand_img03.png';
import brandimg4 from '../assets/brand_img04.png';
import brandimg5 from '../assets/brand_img05.png';
import brandimg6 from '../assets/brand_img06.png';

import brandimg8 from '../assets/brand_img08.png';
import brandimg9 from '../assets/brand_img09.png';
// import brandimg10 from '../assets/brand_img10.png';
import brandimg11 from '../assets/brand_img11.png';
import brandimg12 from '../assets/brand_img12.png';
import brandimg13 from '../assets/brand_img13.png';
// import brandimg14 from '../assets/icon_sml2.webp';
// import brandimg15 from '../assets/neva2.webp';
import brandimg16 from '../assets/sattara2n.png';
import brandimg17 from '../assets/supreme2.webp';
import brandimg18 from '../assets/mfc.webp';
import brandimg19 from '../assets/eatveg.webp';
// import chickyBells from '../assets/chicky_bells.webp';

const brandLogos = [
  brandimg8,
  brandimg6,
  // brandimg10,
  brandimg11,
  brandimg12,
  // brandimg13,
  // brandimg14,
  // brandimg15,
  brandimg16,
  brandimg9,
  brandimg17,
  brandimg18,
  brandimg19,
  // chickyBells,

];

const brandLogos2 = [
  brandimg9,
  brandimg1,
  brandimg2,
  brandimg3,
  // chickyBells,
  brandimg4,
  brandimg5,
 
];

const brandLogosinmobile = [
  brandimg8,
  brandimg6,
  // brandimg10,
  brandimg11,
  brandimg12,
  brandimg13,
  // brandimg14,
  // brandimg15,
  brandimg16,
  brandimg9,
  brandimg1,
  brandimg2,
  brandimg3,
  brandimg4,
  brandimg5,

  brandimg18,
  brandimg19,
  // chickyBells,
];

// =========================================================================
// 2. COMPANY STATISTICS (EDITABLE FIGURES FROM EXISTING PROJECT DATA)
// =========================================================================
const companyStatistics = [
  {
    id: 'experience',
    number: '6+',
    label: 'Years Experience',
    title: '6+ Years Experience',
    description: 'Serving food businesses since 2020',
    icon: Settings,
    iconColor: 'text-slate-700',
  },
  {
    id: 'customers',
    number: '3000+',
    label: 'Customers Served',
    title: '3000+ Customers Served',
    description: 'Trusted by food businesses across India',
    icon: Users,
    iconColor: 'text-slate-700',
  },
  {
    id: 'installed',
    number: '4000+',
    label: 'Items Installed',
    title: '40,000+ Items Installed',
    description: 'Commercial equipment deployed across India',
    icon: Truck,
    iconColor: 'text-slate-800',
  },
  {
    id: 'support',
    label: 'After-Sales Support',
    
    title: 'After-Sales Support',
    description: 'Technical assistance available',
    icon: Headphones,
    iconColor: 'text-slate-800',
  },
];

// =========================================================================
// COMPANY STATISTICS ANIMATION HELPERS
// =========================================================================

// Parses raw number strings like '7+', '3000+', '40,000+', preserving prefix, commas, and suffixes
function parseStatNumber(numStr) {
  if (numStr === undefined || numStr === null) return null;
  const str = String(numStr).trim();
  if (!str) return null;

  const match = str.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const prefix = match[1] || '';
  const numRaw = match[2];
  const suffix = match[3] || '';
  const hasComma = numRaw.includes(',');
  const decimalParts = numRaw.split('.');
  const decimalPlaces = decimalParts.length > 1 ? decimalParts[1].length : 0;
  const numericValue = parseFloat(numRaw.replace(/,/g, ''));

  if (Number.isNaN(numericValue)) return null;

  return {
    raw: str,
    prefix,
    numericValue,
    hasComma,
    decimalPlaces,
    suffix,
  };
}

// Formats counter value during animation (starts at 0, counts smoothly up to target, attaches suffix on finish)
function formatCounterValue(parsed, progress) {
  if (!parsed) return '';
  if (progress >= 1) {
    return parsed.raw;
  }

  const current = progress * parsed.numericValue;

  if (parsed.decimalPlaces > 0) {
    const formatted = parsed.hasComma
      ? current.toLocaleString('en-US', {
          minimumFractionDigits: parsed.decimalPlaces,
          maximumFractionDigits: parsed.decimalPlaces,
        })
      : current.toFixed(parsed.decimalPlaces);
    return `${parsed.prefix}${formatted}`;
  }

  const intVal = Math.min(Math.round(current), parsed.numericValue);
  const formatted = parsed.hasComma
    ? intVal.toLocaleString('en-US')
    : String(intVal);

  return `${parsed.prefix}${formatted}`;
}

// Generates initial state starting at 0 for numeric statistics
function getInitialAnimatedNumbers(stats) {
  const initial = {};
  stats.forEach((stat) => {
    const parsed = parseStatNumber(stat.number);
    if (!parsed) {
      
      initial[stat.id] = null;
    } else {
      initial[stat.id] = formatCounterValue(parsed, 0);
    }
  });
  return initial;
}

// Renders the statistic title with the animated number while preserving all surrounding text/label
function renderStatisticTitle(stat, currentDisplayNumber, isFinished) {
  if (!stat.number) {
    return stat.title || stat.label || '';
  }

  const numToDisplay = isFinished ? stat.number : (currentDisplayNumber ?? stat.number);

  if (stat.title && stat.title.includes(stat.number)) {
    const parts = stat.title.split(stat.number);
    return (
      <>
        {parts[0]}
        <span className="tabular-nums">{numToDisplay}</span>
        {parts.slice(1).join(stat.number)}
      </>
    );
  }

  return (
    <>
      <span className="tabular-nums">{numToDisplay}</span>
      {stat.label ? ` ${stat.label}` : ''}
    </>
  );
}


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

// =========================================================================
// FREQUENTLY ASKED QUESTIONS (FAQ) DATA
// =========================================================================
const FAQS = [
  {
    question: "What is commercial kitchen equipment?",
    answer: "Commercial kitchen equipment is the heavy-duty machinery and fittings used to prepare, cook, bake, store and serve food in restaurants, hotels, cafés, bakeries and catering businesses. It is built to run for long hours every day. It uses durable materials such as stainless steel and is designed to be easy to clean and meet food-hygiene standards."
  },
  {
    question: "Is commercial-grade equipment really worth the higher price compared with cheaper machines?",
    answer: "Commercial kitchens run equipment for many hours every day, so a cheap machine that fails early costs more in repairs, downtime and spoiled stock. Cobolt builds with SS304 and SS202 stainless steel and practical, heavy-use designs. You can choose the grade that fits your budget and workload, and we’ll tell you honestly when a smaller or simpler model is enough."
  },
  {
    question: "What if the machine breaks down and I can’t find spare parts or a technician?",
    answer: "Cobolt provides after-sales support, technical assistance and Annual Maintenance Contracts (AMC). We also manufacture in-house, so parts for our machines are not tied to a distant importer."
  },
  {
    question: "What warranty do I get, and what does it cover?",
    answer: "Cobolt Machineries offers product-specific warranties covering eligible manufacturing defects, including parts and labour as per warranty terms. Misuse, normal wear and tear, and improper maintenance are excluded. Annual Maintenance Contracts (AMC) are also available for ongoing service support."
  },
  {
    question: "Will the equipment fit my kitchen, power supply and layout?",
    answer: "Before you order, our team plans the kitchen with you. We check your available space, gas or electrical connections and workflow, and we can customise sizes and stainless-steel workstations to fit. We deliver across India and handle installation, so the equipment is ready to use when it arrives."
  },
  {
    question: "How do I choose between stainless steel grades (SS304 vs SS202) and between models?",
    answer: "SS304 is the premium choice for wet, acidic or high-hygiene areas and the longest life. SS202 is a more economical option for lower-exposure uses. Tell us what you cook, how many covers you serve a day and your budget, and we’ll recommend the right model, such as a dough mixer, cooking range, fryer or shawarma machine."
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Company Statistics Counting Animation State
  const statsSectionRef = useRef(null);
  const [hasStatsAnimated, setHasStatsAnimated] = useState(false);
  const [isStatsFinished, setIsStatsFinished] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(() =>
    getInitialAnimatedNumbers(companyStatistics)
  );

  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  // Detect mobile viewport (< 768px) for responsive video playback
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setHasStatsAnimated(true);
      setIsStatsFinished(true);
    }
    const handleMotionChange = (e) => {
      if (e.matches) {
        setHasStatsAnimated(true);
        setIsStatsFinished(true);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange);
      return () => mediaQuery.removeListener(handleMotionChange);
    }
  }, []);

  // IntersectionObserver: trigger counting animation once when statistics section enters viewport
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setHasStatsAnimated(true);
      setIsStatsFinished(true);
      return;
    }

    const element = statsSectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasStatsAnimated(true);
      setIsStatsFinished(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStatsAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Smooth counting animation (1.5 seconds with ease-out cubic curve)
  useEffect(() => {
    if (!hasStatsAnimated || isStatsFinished) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsStatsFinished(true);
      return;
    }

    let startTime = null;
    let rafId = null;
    const duration = 1500; // 1.5 seconds

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: smooth deceleration into final figure
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      const updated = {};
      companyStatistics.forEach((stat) => {
        const parsed = parseStatNumber(stat.number);
        if (!parsed) {
          updated[stat.id] = null;
        } else if (rawProgress >= 1) {
          updated[stat.id] = parsed.raw;
        } else {
          updated[stat.id] = formatCounterValue(parsed, easedProgress);
        }
      });

      setAnimatedNumbers(updated);

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setIsStatsFinished(true);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hasStatsAnimated, isStatsFinished]);

  // Ensure autoplay starts smoothly and handles mobile browser policies (power saver, HEVC, etc.)
  useEffect(() => {
    const startPlayback = (video) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay policy or power saver mode paused it; will resume on first touch/scroll
        });
      }
    };

    startPlayback(mobileVideoRef.current);
    startPlayback(desktopVideoRef.current);

    // Mobile browsers (iOS Safari / Android Chrome) allow video to play on first user interaction
    const kickstartAutoplay = () => {
      startPlayback(mobileVideoRef.current);
      startPlayback(desktopVideoRef.current);
    };

    window.addEventListener('touchstart', kickstartAutoplay, { once: true, passive: true });
    window.addEventListener('touchend', kickstartAutoplay, { once: true, passive: true });
    window.addEventListener('click', kickstartAutoplay, { once: true, passive: true });
    window.addEventListener('scroll', kickstartAutoplay, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', kickstartAutoplay);
      window.removeEventListener('touchend', kickstartAutoplay);
      window.removeEventListener('click', kickstartAutoplay);
      window.removeEventListener('scroll', kickstartAutoplay);
    };
  }, [isMobile]);

  // Fetch live products from backend with fallback
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          const dbIds = new Set(data.map((p) => p.id?.toLowerCase().trim()));
          const dbNames = new Set(data.map((p) => p.name?.toLowerCase().trim()));
          const merged = [...data];
          for (const sp of fallbackProducts) {
            const sId = sp.id?.toLowerCase().trim();
            const sName = sp.name?.toLowerCase().trim();
            if (!dbIds.has(sId) && !dbNames.has(sName)) {
              merged.push(sp);
            }
          }
          setProducts(merged);
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
          SECTION 1: HERO BANNER VIDEO
          ========================================================================= */}
      <section className="relative min-h-[520px] sm:min-h-[640px] lg:h-[90vh] lg:min-h-[760px] w-full overflow-hidden bg-[#0F172A] flex items-center">
        {/* Large, premium-looking hero banner video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Mobile Video (< 768px) with HEVC + H.264 fallback */}
          <video
            ref={mobileVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroMobilePoster}
            onError={(e) => {
              const video = e.currentTarget;
              if (video && !video.src.includes('mainvd5mb.mp4')) {
                video.src = heroDesktopVideo;
                video.load();
                video.play().catch(() => {});
              }
            }}
            className="w-full h-full object-cover object-center block md:hidden"
          >
            <source src={heroMobileVideo} type='video/mp4; codecs="hvc1,hevc"' />
            <source src={heroDesktopVideo} type='video/mp4; codecs="avc1.4D401F,mp4a.40.2"' />
            <source src={heroDesktopVideo} type="video/mp4" />
          </video>

          {/* Desktop / Tablet Video (>= 768px) */}
          <video
            ref={desktopVideoRef}
            src={heroDesktopVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroDesktopPoster}
            className="w-full h-full object-cover object-center hidden md:block"
          >
            <source src={heroDesktopVideo} type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:py-0">
          <div className="max-w-3xl text-left space-y-6">
         

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight font-display tracking-tight">
              <span className="text-white/60   [text-shadow:_0_2px_12px_rgba(0,0,0,0.22)]">
                Commercial Kitchen 
              </span>{' '}
              <span className="text-[#ec3d57] [text-shadow:_0_2px_12px_rgba(222,29,58,0.2)]">
              Equipment manufacturer &amp; Supplier
              </span>
            </h2>
 
            {/* Short Supporting Line */}
            <p className="text-sm sm:text-base md:text-lg text-slate-900 leading-relaxed font-sans max-w-2xl drop-shadow-sm font-normal">
              Equip your kitchen, restaurant, hotel, café, or bakery with professional cooking, refrigeration, food preparation, and stainless steel equipment from Cobolt Machineries.
            </p>

            {/* Clear Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#categories"
                className="px-5 py-2.5 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-sm font-semibold rounded-md shadow-lg shadow-[#DE1D3A]/30 hover:shadow-xl transition-all duration-300 flex items-center group font-sans cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white/30 md:bg-white/40 backdrop-blur-lg hover:bg-white/60 text-slate-800 hover:text-[#DE1D3A] text-sm font-semibold rounded-md  border-white/50 hover:border-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 font-sans hover:-translate-y-0.5 active:translate-y-0"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPANY STATISTICS / TRUST BAR
          ========================================================================= */}
      <section
        ref={statsSectionRef}
        className="py-3 sm:py-7 lg:py-8 bg-[#F8FAFC] border-gray-200 text-gray-900 overflow-hidden"
      >
        {/* Mobile View: Clean single flex-row with count and title (no bg, no borders, no icons) */}
        <div className="sm:hidden px-3 py-2 flex flex-row items-center justify-between text-center max-w-md mx-auto">
          {companyStatistics
            .filter((stat) => stat.id !== 'support')
            .map((stat) => (
              <div
                key={`mobile-stat-${stat.id}`}
                className="flex-1 flex flex-col items-center justify-center text-center px-1"
              >
                <span className="font-medium text-lg xs:text-xl text-slate-900 tracking-tight leading-none tabular-nums">
                  {animatedNumbers[stat.id] ?? stat.number}
                </span>
                <h3
                  className=" font-semibold text-[11px] xs:text-xs text-slate-600 tracking-tight leading-tight mt-1 text-center"
                  aria-label={stat.title || [stat.number, stat.label].filter(Boolean).join(' ')}
                >
                  {stat.label || stat.title}
                </h3>
              </div>
            ))}
        </div>

        {/* Tablet & Desktop View: 4-Column Divider Bar */}
        <div className="hidden sm:block max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200">
            {companyStatistics.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`py-3.5 sm:py-3 lg:py-1 ${
                    idx === 0
                      ? 'lg:pr-6 xl:pr-8'
                      : idx === companyStatistics.length - 1
                      ? 'lg:pl-6 xl:pl-8 sm:pl-6'
                      : 'lg:px-6 xl:px-8 sm:px-4'
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {IconComponent && (
                      <div className="shrink-0 flex items-center justify-center">
                        <IconComponent
                          className={`sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${stat.iconColor || 'text-slate-700'}`}
                          strokeWidth={1.75}
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex flex-col justify-center text-left">
                      <h3
                        className="font-medium  sm:text-sm lg:text-[15px] xl:text-base text-gray-900 tracking-tight leading-snug"
                        aria-label={stat.title || [stat.number, stat.label].filter(Boolean).join(' ')}
                      >
                        {renderStatisticTitle(stat, animatedNumbers[stat.id], isStatsFinished)}
                      </h3>
                      {stat.description && (
                        <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-normal mt-0.5 sm:mt-1 line-clamp-2">
                          {stat.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

       {/* Client Marquee Strip */}
      <ClientMarquee
        brandLogos={brandLogos}
        // brandLogos2={brandLogos2}
        brandLogosinmobile={brandLogosinmobile}
      />

      {/* =========================================================================
          SECTION 3: PRODUCT CATEGORIES
          ========================================================================= */}
      <section id="categories" className="py-14 sm:py-20 bg-[#F8FAFC] relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111827] font-display capitalize tracking-tight">
              commercial kitchen equipments
            </h1>
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
                className="group bg-[#F8FAFC] rounded-3xl   border-gray-900   hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 p-5 sm:p-6 flex flex-col items-center justify-between text-center hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Category Image */}
                <div className="relative w-full rounded-2xl bg-[#F8FAFC] group-hover:from-red-50/40 group-hover:via-white group-hover:to-red-50/30 border border-gray-400/5 group-hover:border-red-100/80 h-36 sm:h-44 md:h-48 flex items-center justify-center p-3 sm:p-4 mb-3 transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_20px_rgba(222,29,58,0.06)] overflow-hidden">
                  <Image
                    src={cat.image} 
                    alt={cat.name}
                    width={260}
                    height={260}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Category Title & Explore Link */}
                <div className="w-full flex flex-col items-center pt-1">
                  <h3 className="font-bold text-xs sm:text-sm lg:text-[15px] text-gray-900 group-hover:text-[#DE1D3A] transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                    {cat.name}
                  </h3>

                  <div className="mt-2 text-xs sm:text-sm font-semibold text-red-500 group-hover:text-[#DE1D3A] transition-colors inline-flex items-center gap-1 font-sans">
                    <span>Explore</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* All Product Button */}
          <div className="mt-10 sm:mt-12 text-center flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#DE1D3A] to-[#B7152D] hover:from-[#B7152D] hover:to-[#DE1D3A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#DE1D3A]/20 hover:shadow-xl hover:shadow-[#DE1D3A]/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span>all product</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
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
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium text-[#111827] font-clash leading-tight">
                Manufacturing Excellence Since 2020
              </h2>

              {/* Company Description */}
              <div className="space-y-4">
                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                  Since 2020, Cobolt Machineries has been a commercial kitchen equipment manufacturer and supplier based in Malappuram, Kerala. We combine modern manufacturing techniques with quality materials to deliver durable and reliable equipment for professional kitchens.
                </p>

                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                  Our product range includes bakery equipment, commercial cooking ranges, shawarma machines, stainless steel workstations, and customized kitchen solutions. We use SS304 and SS202 stainless steel based on specific equipment requirements.
                </p>

                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                  From kitchen planning and equipment customization to delivery, installation, and after-sales support, we help businesses build efficient commercial kitchens.
                </p>

                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                  Serving restaurants, hotels, cafés, bakeries, and food businesses, we offer all-India delivery with a focus on practical designs, competitive pricing, and long-term customer satisfaction.
                </p>
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
          COMMERCIAL KITCHEN EQUIPMENT FAQ SECTION
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200/80 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DE1D3A]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
           
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#111827] font-display tracking-tight">
              Commercial Kitchen Equipment FAQ
            </h2>
          
          </div>

          <div className="space-y-3.5 text-left">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${ 
                    isOpen
                      ? 'border-[#DE1D3A]/30 shadow-md shadow-[#DE1D3A]/5 ring-1 ring-[#DE1D3A]/10'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-display font-bold text-sm sm:text-base text-slate-800 hover:text-[#DE1D3A] transition-colors cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start gap-3">
                      <span className="text-xs font-poppins  font-thin text-[#8d8a8a] px-2 py-0.5  rounded mt-0.5 shrink-0">
                        0{index + 1}
                      </span>
                      <span className="group-hover:text-[#DE1D3A] transition-colors">{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#DE1D3A]' : 'group-hover:text-slate-600'
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pl-14">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Direct Support Note */}
          <div className="mt-12 text-center p-6 bg-white border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="text-center sm:text-left">
              <h4 className="font-display font-bold text-sm text-slate-900">Have a custom kitchen layout or specific machinery query?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Our technical consultants in Kerala provide end-to-end guidance from sizing to setup.</p>
            </div>
            <Link
              href="/contact"
              className="whitespace-nowrap px-5 py-2.5 bg-slate-900 hover:bg-[#DE1D3A] text-white text-xs font-bold rounded-xl transition-colors duration-300 inline-flex items-center gap-1.5 shadow-sm"
            >
              <span>Consult Our Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
