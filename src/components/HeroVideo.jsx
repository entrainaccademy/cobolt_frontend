'use client';

import React, { useState, useEffect } from 'react';

export default function HeroVideo({
  mobileSrc = '/heroinmobile.MP4',
  desktopSrc = '/mainvd5mb.mp4',
  poster = '/heroinmobile_poster.webp',
  children,
}) {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Only load video stream on tablet/desktop devices (>= 768px) where bandwidth is ample
    // On mobile, the crisp 17KB WebP poster delivers immediate LCP with zero data waste
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setLoadVideo(true);
    }
  }, []);

  return (
    <>
      {loadVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center animate-slow-zoom relative z-10 transition-opacity duration-700"
        >
          <source src={desktopSrc} type="video/mp4" />
        </video>
      )}
      {children}
    </>
  );
}

