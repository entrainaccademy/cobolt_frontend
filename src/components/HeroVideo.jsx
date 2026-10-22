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
        onError={(e) => {
          const video = e.currentTarget;
          if (video && !video.src.includes('mainvd5mb.mp4')) {
            video.src = desktopSrc;
            video.load();
            video.play().catch(() => {});
          }
        }}
        className="w-full h-full object-cover object-center block md:hidden"
      >
        <source src={mobileSrc} type='video/mp4; codecs="hvc1,hevc"' />
        <source src={desktopSrc} type='video/mp4; codecs="avc1.4D401F,mp4a.40.2"' />
        <source src={desktopSrc} type="video/mp4" />
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

