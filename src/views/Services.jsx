'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldAlert,
  FileSliders,
  Settings2,
  Hammer,
  Landmark,
  ArrowRight,
  CheckCircle,
  Wrench,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { servicesList } from '../data/services';

const iconMap = {
  'steel-fabrication': Hammer,
  'installation': Hammer,
  'import-export': Settings2,
  'machinery-manufacturing': ShieldAlert,
  'manufacturing': ShieldAlert,
  'consulting': FileSliders,
  'consultation': FileSliders,
  'amc': Landmark,
  'annual-maintenance-contracts': Landmark,
  'custom-machinery-design-fabrication': CheckCircle,
  'custom-solutions': CheckCircle,
};

export default function Services() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-[#F8FAFC] border-b border-[#E5E7EB]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest">
              Engineering Support
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] font-display leading-tight">
              Machinery Support &amp; Services
            </h1>
            <p className="text-[#6B7280] text-base md:text-lg max-w-2xl leading-relaxed">
              We back our hardware with certified technicians and proactive service packages. Keep your production floor operating at maximum capacity.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => {
              const IconComp = iconMap[service.id] || Wrench;
              return (
                <div
                  key={service.id}
                  className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#DE1D3A]/20 hover:bg-[#FFFFFF] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left group"
                >
                  <div>
                    {/* Service Image Banner - Clickable Link to Details */}
                    <Link
                      href={`/services/${service.id}`}
                      className="block relative overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden bg-[#F8FAFC] rounded-t-2xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={400}
                          height={192}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-colors" />
                      </div>

                      {/* Overlapping Floating Icon */}
                      <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#FFFFFF] border border-[#E5E7EB] text-[#DE1D3A] group-hover:bg-[#DE1D3A] group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md z-10">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </Link>

                    <div className="p-6 pt-10">
                      <h3 className="font-display font-bold text-lg text-[#111827] mb-2 mt-2">
                        <Link
                          href={`/services/${service.id}`}
                          className="hover:text-[#DE1D3A] transition-colors"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-[#DE1D3A] text-[10px] font-semibold tracking-wide uppercase mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Points */}
                      {service.points && (
                        <div className="space-y-3 mb-4">
                          <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#DE1D3A]">
                            What&apos;s Included:
                          </h5>
                          <ul className="space-y-2">
                            {service.points.slice(0, 4).map((pt, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-[#6B7280]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#DE1D3A] mt-1.5 flex-shrink-0" />
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="mx-6 pb-6 pt-4 border-t border-[#E5E7EB]/60 flex items-center justify-between gap-2">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center text-[#DE1D3A] font-bold text-xs group-hover:text-[#B7152D] transition-colors duration-200"
                    >
                      View Service Details
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="text-[11px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Inquire →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="py-16 bg-[#DE1D3A] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <h3 className="font-display font-bold text-2xl">Need Emergency Service Callout?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Our priority AMC hotline operates 24/7. Average technician response time is under 4 hours for local manufacturing zones.
          </p>
          <div className="pt-4">
            <a
              href="tel:+919061782023"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#FFFFFF] text-[#DE1D3A] hover:bg-[#FCE8EC] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200 shadow-md"
            >
              Call 24/7 Hotline: +91 9061782023
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
