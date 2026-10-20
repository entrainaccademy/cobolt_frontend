import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

import logo from '../assets/blacklogotr.webp';
import { SITE_CONFIG } from '../lib/siteConfig';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Blog Articles', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const servicesLinks = [
    { name: 'Steel Fabrication', path: '/services/steel-fabrication' },
    // { name: 'Import & Export', path: '/services/import-export' },
    { name: 'Machinery Manufacturing', path: '/services/machinery-manufacturing' },
    { name: 'Engineering Consulting', path: '/services/consulting' },
    { name: 'Annual Maintenance (AMC)', path: '/services/amc' },
    { name: 'Custom Machinery Design', path: '/services/custom-machinery-design-fabrication' },
  ];

  const policyLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Warranty Policy', path: '/warranty-policy' },
    // { name: 'Return and Refund', path: '/return-refund-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    // { name: 'Partial COD Policy', path: '/partial-cod-policy' },
  ];

  return (
    <footer className="bg-bg-section border-t border-slate-200/80 print:hidden">
      {/* Top Banner / Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-200/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-primary">
              Subscribe to our Industrial Insights
            </h3>
            <p className="text-text-light text-sm mt-1">
              Stay updated with the latest engineering advancements, machinery launches, and expert industry advice.
            </p>
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6">
          {/* Brand Info */}
          <div className="space-y-6 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                className="h-12 w-auto object-contain"
                src={logo}
                alt="Cobolt Machineries Logo"
                width={600}
                height={178}
                sizes="(max-width: 768px) 162px, 162px"
                loading="lazy"
              />
            </Link>
            <p className="text-text-light text-sm leading-relaxed">
              Delivering precision engineering and high-performance industrial machinery designed to optimize efficiency and build future-proof infrastructure.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-light hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-light hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-light hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-text-light hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest text-primary uppercase mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    prefetch={false}
                    className="text-text-light hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest text-primary uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    prefetch={false}
                    className="text-text-light hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Policies Column */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest text-primary uppercase mb-6">
              Our Policies
            </h4>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    prefetch={false}
                    className="text-text-light hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest text-primary uppercase mb-6">
              Contact Info
            </h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-[#DE1D3A] mt-0.5 flex-shrink-0" />
              <span className="text-text-light text-sm leading-relaxed">
                Veemboor, Manjeri, Kerala - 676122
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4.5 h-4.5 text-[#DE1D3A] flex-shrink-0" />
              <a href="tel:+919061782023" className="text-text-light hover:text-accent text-sm transition-colors duration-200">
                +91 9061782023
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4.5 h-4.5 text-[#DE1D3A] flex-shrink-0" />
              <a href="mailto:infocobolt123@gmail.com" className="text-text-light hover:text-accent text-sm transition-colors duration-200">
                infocobolt123@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                Mon – Sat: 9 am – 7 pm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-100/50 py-6 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-light text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Cobolt Machineries Private Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-text-light justify-center md:justify-end">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-accent transition-colors duration-200">Terms of Service</Link>
            <Link href="/warranty-policy" className="hover:text-accent transition-colors duration-200">Warranty</Link>
            {/* <Link href="/sitemap.xml" className="hover:text-accent transition-colors duration-200">Sitemap</Link> */}
            {/* <Link href="/admin" className="hover:text-[#DE1D3A] transition-colors duration-200">Admin Portal</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
