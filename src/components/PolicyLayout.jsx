'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import PageWrapper from './PageWrapper';
import { POLICY_CONFIG } from '../data/policyConfig';

export default function PolicyLayout({
  title,
  subtitle,
  category = 'Legal & Commercial Policies',
  lastUpdated = POLICY_CONFIG.lastUpdated,
  toc = [],
  children,
}) {
  return (
    <PageWrapper>
      <div className="bg-white min-h-screen pt-28 sm:pt-32 pb-20 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs text-gray-500 py-3 border-b border-gray-100 mb-8"
          >
            <Link href="/" className="hover:text-[#DE1D3A] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">Policies</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold truncate">{title}</span>
          </nav>

          {/* Policy Document Container (Max 850px content area) */}
          <div className="max-w-[850px] mx-auto">
            {/* Document Header */}
            <header className="pb-8 mb-8 border-b border-gray-200">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DE1D3A] block mb-2">
                {category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display leading-tight tracking-tight mb-3">
                {title}
              </h1>
              {subtitle && (
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                  {subtitle}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2">
                <span>
                  <strong>Last Updated:</strong> {lastUpdated}
                </span>
                <span className="text-gray-300">•</span>
                <span>
                  <strong>Entity:</strong> {POLICY_CONFIG.company.legalName}
                </span>
              </div>
            </header>

            {/* Table of Contents (for longer policies) */}
            {Array.isArray(toc) && toc.length > 0 && (
              <nav
                aria-label="Table of Contents"
                className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 mb-10"
              >
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Table of Contents
                </h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                  {toc.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 font-mono text-xs mt-0.5">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <a
                        href={`#${item.id}`}
                        className="text-gray-700 hover:text-[#DE1D3A] hover:underline transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Main Policy Content */}
            <article className="prose-policy space-y-8 text-sm sm:text-[15px] leading-relaxed text-gray-700">
              {children}
            </article>

            {/* Document Contact & Support Box */}
            <footer className="mt-14 pt-8 border-t border-gray-200 text-xs sm:text-sm text-gray-600 space-y-3">
              <h3 className="text-base font-bold text-gray-900">
                Questions or Clarifications?
              </h3>
              <p>
                If you have questions regarding this policy or require assistance before placing an order, please contact our support desk:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-1.5 text-xs">
                <p>
                  <strong>Company:</strong> {POLICY_CONFIG.company.legalName}
                </p>
                <p>
                  <strong>Address:</strong> {POLICY_CONFIG.company.address}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${POLICY_CONFIG.company.email}`}
                    className="text-[#DE1D3A] hover:underline"
                  >
                    {POLICY_CONFIG.company.email}
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a
                    href={`tel:${POLICY_CONFIG.company.phone}`}
                    className="text-[#DE1D3A] hover:underline"
                  >
                    {POLICY_CONFIG.company.phoneDisplay}
                  </a>{' '}
                  ({POLICY_CONFIG.company.workingHours})
                </p>
              </div>

              {/* Policy Quick Links */}
              <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Other Policies:</span>
                {POLICY_CONFIG.policyLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="hover:text-[#DE1D3A] hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
