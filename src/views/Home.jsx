import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Settings, ShieldCheck, Cpu, Clock, Award, Users, ChevronRight, Truck, Info } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import ScrollReveal from '../components/ScrollReveal';
import HeroVideo from '../components/HeroVideo';
import ClientMarquee from '../components/ClientMarquee';

// Asset imports
import hmAbout1 from '../assets/hm_about1.webp';

// Video paths from public directory
const hero5mb = '/mainvd5mb.mp4';
const heroinmobile = '/heroinmobile.MP4';

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

import docota from '../assets/docota 4.webp';
import p6 from '../assets/Products/p6.webp';
import tabletop2 from '../assets/TableTopFoodMixer2.webp';
import p5 from '../assets/Products/p5.webp';
import p3 from '../assets/Products/p3.webp';
import p17 from '../assets/Products/p17.webp';

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

const features = [
  {
    icon: Cpu,
    title: "High-Precision Systems",
    description: "Calibrated down to micron levels to deliver flawless part tolerances and repeatability."
  },
  {
    icon: ShieldCheck,
    title: "Certified Safety & Quality",
    description: "Full ISO-9001 and CE compliance across all fabricated rigs and machinery components."
  },
  {
    icon: Settings,
    title: "Custom Machining Rigs",
    description: "Bespoke engineering from blueprinting to stress-testing tailored to your manufacturing floor."
  },
  {
    icon: Clock,
    title: "24/7 Deployment Support",
    description: "Dedicated rapid-response service crew for zero-disruption installation and emergency repairs."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Optimized logistics and rapid-dispatch pipelines ensuring prompt site delivery and assembly timelines."
  },
  {
    icon: Award,
    title: "100% Material Quality",
    description: "Premium food-grade SUS304/316 steels and heavy-duty alloys sourced from certified global foundries."
  }
];

const latestProducts = [
  {
    id: "table-top-food-mixer-id",
    name: "TABLE TOP FOOD MIXER",
    category: "Confectionery Rig",
    image: p3,
    specs: "500 L/Hr | Touchscreen PLC | Auto Overrun",
    description: "Industrial continuous ice cream freezer designed for consistent overrun calibration and rapid heat extraction."
  },
  {
    id: "2-split-open-fryer-ofg321-322-323",
    name: "2 SPLIT OPEN FRYER-OFG321-322-323",
    category: "Fluid Machinery",
    image: p5,
    specs: "2000 L/Hr | 400 Bar Max Pressure | Dual Stage",
    description: "Premium micron-level liquid particle disperser, optimized for emulsifying sauces, dairy mixtures, and cosmetic gels."
  },
  {
    id: "Dacota4BurnerCookingRangeStandardOven",
    name: "DACOTA 4 BURNER 24 ",
    category: "Packaging Machinery",
    image: docota,
    specs: "4 Head Filling | 3600 Cups/Hr | Foil Heat Sealing",
    description: "Automatic rotary cup filling and heat sealing line with integrated batch printing and container discharge."
  },
  {
    id: "BT-MIXER",
    name: "BT MIXER",
    category: "Food Processing",
    image: p6,
    specs: "10L Bowl | 3-Speed Planetary Gear | Safety Guard",
    description: "Industrial-grade commercial stand mixer with stainless steel components for bakeries and test kitchens."
  },
  {
    id: "TABLE-TOP-FOOD-MIXERid",
    name: "TABLE TOP FOOD MIXER",
    category: "Food Processing",
    image: tabletop2,
    specs: "20L Bowl | Digital Timer | Reinforced Motor",
    description: "High-capacity planetary mixer with speed control and automatic bowl lifting mechanism for thick batters."
  },
  {
    id: "PRESSURE-FRYER-ELECTRIC-800",
    name: "PRESSURE FRYER ELECTRIC-(BOAST MACHINE) PFE-800",
    category: "Food Processing",
    image: p17,
    specs: "20L Bowl | Digital Timer | Reinforced Motor",
    description: "High-capacity planetary mixer with speed control and automatic bowl lifting mechanism for thick batters."
  }
];

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[520px] sm:h-[70vh] sm:min-h-[560px] md:h-screen md:min-h-[620px] w-full overflow-hidden bg-[#1F2937]">
        {/* Background Video & Priority Poster Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/heroinmobile_poster.webp"
            alt="Cobolt Machineries - Commercial Kitchen Equipment Manufacturer & Supplier, Kerala"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <HeroVideo mobileSrc={heroinmobile} desktopSrc={hero5mb} poster="/heroinmobile_poster.webp" />
          {/* Dark gradient overlay for text readability over video */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35 z-10" /> */}
        </div>

        {/* Hero Content - Rendered immediately with zero opacity delay */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-0 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-sora tracking-tight mb-3 md:mb-5 drop-shadow-sm">
                {/* Built for Busy Kitchens */}
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2 sm:mt-3 md:mt-4 font-display tracking-normal">
                  Commercial Kitchen Equipment Manufacturer &amp; Supplier
                </span>
              </h1>
              <p className="text-[12px] sm:text-sm md:text-base text-slate-200 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-sans max-w-2xl drop-shadow-xs">
                Equip your restaurant, bakery, or cloud kitchen with quality fryers, deck ovens, mixers, and custom stainless-steel kitchen solutions, backed by professional installation and annual maintenance

              </p>
              <div className="flex flex-wrap gap-4">
                {/* Laptop/Desktop Buttons (Hidden on mobile/tablet) */}
                <Link
                  href="/products"
                  className="hidden lg:flex px-8 py-3.5 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 items-center group font-sans"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="hidden lg:flex px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 font-sans"
                >
                  Contact Us
                </Link>

                {/* Floating WhatsApp Action Button (Fixed Floating on Bottom Right, Visible on All Screens) */}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section (Logo Strip) */}
      <ClientMarquee brandLogos={brandLogos} brandLogos2={brandLogos2} brandLogosinmobile={brandLogosinmobile} />

      {/* Company Overview Section */}
      <section className="py-4 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Images Column */}
            <ScrollReveal className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5E7EB] max-h-[500px]">
                <Image
                  src={hmAbout1}
                  alt="Industrial Engineering Team"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Overlay Stat Block */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block">
                <div className="bg-[#FFFFFF] border border-[#E5E7EB] shadow-xl rounded-xl p-6 max-w-xs animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FCE8EC] rounded-lg flex items-center justify-center text-[#DE1D3A]">
                      <Award className="w-6 h-6 text-[#DE1D3A]" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-2xl text-[#DE1D3A]">10+</h4>
                      <p className="text-[#6B7280] text-xs font-medium uppercase tracking-wider">Years Engineering Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest">
                Company Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-display leading-tight">
                Pioneering Precision &amp; Manufacturing Excellence Since 2001
              </h2>
              <p className="text-[#6B7280] text-[14px] md:text-base leading-relaxed">
                Cobolt Machineries is a premium global manufacturer of high-end industrial machinery. We bridge the gap between complex engineering concepts and reliable physical manufacturing equipment, delivering solutions that scale operations while preserving razor-sharp accuracy.
              </p>
              <p className="text-[#6B7280] text-[14px] md:text-base leading-relaxed">
                With a dedicated state-of-the-art foundry and high-precision CNC toolsets, our in-house engineers design, construct, and calibrate CNC setups, hydraulics, stamping stations, and automated conveyor lines.
              </p>
              <div className="pt-4 flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FCE8EC] flex items-center justify-center text-[#DE1D3A]">
                    <Award className="w-5 h-5 text-[#DE1D3A]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827] text-sm font-display">ISO 9001:2015</h5>
                    <p className="text-[#6B7280] text-xs">Quality Management Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FCE8EC] flex items-center justify-center text-[#DE1D3A]">
                    <Users className="w-5 h-5 text-[#DE1D3A]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827] text-sm font-display">120+ Active Clients</h5>
                    <p className="text-[#6B7280] text-xs">Heavy Manufacturing Sectors</p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center text-[#DE1D3A] hover:text-[#B7152D] font-semibold text-sm transition-colors duration-200 group"
                >
                  Discover Our Story
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#F8FAFC]/50 border-y border-[#E5E7EB]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#DE1D3A]/5 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="font-sans font-semibold tracking-wider text-xs text-[#DE1D3A] uppercase px-3.5 py-1.5 bg-[#FCE8EC]/50 rounded-full border border-[#DE1D3A]/20 inline-block">
              Our Core Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-display tracking-tight">
              Why Heavy Manufacturers Partner with Cobolt
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
      </section>

      {/* Latest Products Section (Premium Showcase) */}
      <section className="py-1 sm:py-32 bg-[#FFFFFF] text-[#6B7280] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a02_1px,transparent_1px),linear-gradient(to_bottom,#0f172a02_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#DE1D3A]/5 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#E5E7EB]/60 via-transparent to-transparent opacity-80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <h2 className="text-2xl md:text-4xl sm:text-5xl font-bold md:font-extrabold text-[#111827] font-display tracking-tight leading-[1.12]">
              Latest Food Processing &amp; Packaging Machinery
            </h2>
            <p className="text-[#6B7280] font-light px-4 md:px-0 text-sm md:text-sm md:font-light leading-relaxed font-sans max-w-xl mx-auto">
              Engineered with food-grade SUS304/SUS316 stainless steel, smart PLC automation, and high-throughput reliability.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#DE1D3A]/20 hover:shadow-xl hover:shadow-[#DE1D3A]/30 hover:-translate-y-1"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {latestProducts.slice(0, 6).map((product, idx) => (
              <ScrollReveal
                key={`${product.id}-${idx}`}
                delay={idx * 0.08}
                className="group border border-[#E5E7EB] bg-[#FFFFFF] rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#DE1D3A]/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
              >
                <Link href={`/products/${product.id}`} className="flex flex-col h-full cursor-pointer">
                  {/* Image Section */}
                  <div className="relative h-60 bg-[#FFFFFF] flex items-center justify-center p-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      loading="lazy"
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="p-6 pt-2 flex-grow flex flex-col items-start text-left justify-between">
                    <div>
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
                        <Info className="w-3.5 h-3.5 mr-1" /> View Full Details &amp; Specs
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#DE1D3A] group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Premium Bottom Conversion CTA Section */}
          <ScrollReveal className="mt-20 sm:mt-24 border border-[#E5E7EB] bg-[#F8FAFC]/50 rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-left space-y-2">
              <h4 className="font-display font-bold text-xl text-[#111827] tracking-tight">Need a custom engineering solution?</h4>
              <p className="text-[#6B7280] text-sm max-w-lg font-sans">Our master fabricators can tailor dimensions, capacities, and PLC programs to your factory floor.</p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#DE1D3A] hover:bg-[#B7152D] hover:-translate-y-0.5 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 flex-shrink-0"
            >
              Talk to an Engineer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

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

      {/* Contact CTA Banner */}
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
    </PageWrapper>
  );
}
