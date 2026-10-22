'use client';

import React from 'react';

export default function ClientMarquee({ brandLogos, brandLogos2, brandLogosinmobile }) {
  const getSrc = (item) => (typeof item === 'object' && item?.src ? item.src : item);
  const getWidth = (item) => (typeof item === 'object' && item?.width ? item.width : 144);
  const getHeight = (item) => (typeof item === 'object' && item?.height ? item.height : 64);

  return (
    <section className="bg-[#F8FAFC] py-6 sm:py-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <p className="text-center text-[13px] font-thin text-[#6B7280] uppercase tracking-widest mb-4 sm:mb-8 sm:text-[20px] font-sans">
          Our Esteemed Clients
        </p>

        {/* Logo Marquee Wrapper 1 (Desktop/Tablet) */}
        <div className="relative w-full hidden md:block">


          <div className="flex w-max items-center gap-0 sm:gap-16 animate-marquee py-2 select-none">
            {brandLogos.map((logo, idx) => (
              <div
                key={`client-logo-1-${idx}`}
                className="flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={getSrc(logo)}
                  alt={`Client Logo ${idx + 1}`}
                  width={getWidth(logo)}
                  height={getHeight(logo)}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
            {brandLogos.map((logo, idx) => (
              <div
                key={`client-logo-1-dup-${idx}`}
                className="flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={getSrc(logo)}
                  alt={`Client Logo ${idx + 1} Dup`}
                  width={getWidth(logo)}
                  height={getHeight(logo)}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logo Marquee Wrapper Mobile (Mobile only) */}
        <div className="relative w-full md:hidden">
          {/* <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" /> */}
          {/* <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" /> */}

          <div className="flex w-max items-center gap-0 animate-marquee py-2 select-none">
            {brandLogosinmobile.map((logo, idx) => (
              <div
                key={`client-logo-mobile-${idx}`}
                className="flex items-center justify-center w-24 h-12 flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={getSrc(logo)}
                  alt={`Client Logo Mobile ${idx + 1}`}
                  width={getWidth(logo)}
                  height={getHeight(logo)}
                  loading="lazy"
                  decoding="async"
                  className="max-w-12  max-h-12 object-contain transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
            {brandLogosinmobile.map((logo, idx) => (
              <div
                key={`client-logo-mobile-dup-${idx}`}
                className="flex items-center justify-center w-24 h-12 flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={getSrc(logo)}
                  alt={`Client Logo Mobile ${idx + 1} Dup`}
                  width={getWidth(logo)}
                  height={getHeight(logo)}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logo Marquee Wrapper 2 */}
        <div className="relative w-full hidden lg:block overflow-hidden mt-8">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max items-center gap-1 sm:gap-16 animate-marquee-reverse py-2 select-none">
            {brandLogos2.map((logo, idx) => (
              <div
                key={`client-logo-2-${idx}`}
                className="flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={getSrc(logo)}
                  alt={`Client Logo ${idx + 1}`}
                  width={getWidth(logo)}
                  height={getHeight(logo)}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
            {brandLogos2.map((logo, idx) => (
              <div
                key={`client-logo-2-dup-${idx}`}
                className="flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={getSrc(logo)}
                  alt={`Client Logo ${idx + 1} Dup`}
                  width={getWidth(logo)}
                  height={getHeight(logo)}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
