'use client';

import React, { useState, useEffect } from 'react';

export default function HeroVideo({
  mobileSrc = '/heroinmobile.MP4',
  desktopSrc = '/mainvd5mb.mp4',
  mobilePoster = '/heroinmobile_poster.webp',
  desktopPoster = '/mainvd5mb_poster.webp',
  children,
}) {
  return (
    <>
      {/* Mobile Video (< 768px) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={mobilePoster}
        className="w-full h-full object-cover object-center block md:hidden"
      >
        <source src={mobileSrc} type="video/mp4" />
      </video>

      {/* Desktop / Tablet Video (>= 768px) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={desktopPoster}
        className="w-full h-full object-cover object-center hidden md:block"
      >
        <source src={desktopSrc} type="video/mp4" />
      </video>
      {children}
    </>
  );
}

