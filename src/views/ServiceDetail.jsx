'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  ShieldCheck,
  Wrench,
  Clock,
  Phone,
  MessageSquare,
  Award,
  Layers,
  Sparkles,
  Building2,
  FileCheck,
  Check,
  Hammer,
  Settings2,
  ShieldAlert,
  FileSliders,
  Landmark,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

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

export default function ServiceDetail({ service, relatedServices = [] }) {
  if (!service) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-32 bg-white">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">
            The requested engineering or machinery service could not be found.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DE1D3A] text-white font-medium text-sm rounded-lg hover:bg-[#B7152D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const IconComponent = iconMap[service.id] || Wrench;

  return (
    <PageWrapper>
      <div className="pt-28 pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-8 text-xs text-gray-500">
            <nav className="flex items-center space-x-2">
              <Link href="/" className="hover:text-[#DE1D3A] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link href="/services" className="hover:text-[#DE1D3A] transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                {service.title}
              </span>
            </nav>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#DE1D3A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Services
            </Link>
          </div>

          {/* Header Banner */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200/60 text-[#DE1D3A] text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
              <IconComponent className="w-3.5 h-3.5" />
              <span>{service.badge || 'Engineering & Machinery Service'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 font-display leading-tight mb-3">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
              {service.tagline}
            </p>
          </div>

          {/* Main 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Comprehensive Service Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Feature Image with Floating Badge */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 group">
                <div className="h-[280px] sm:h-[380px] md:h-[440px] w-full relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 font-medium">
                    Certified Commercial Standards
                  </span>
                  <span className="bg-[#DE1D3A] px-3 py-1.5 rounded-lg font-bold shadow-md">
                    Kerala &amp; Pan-India Support
                  </span>
                </div>
              </div>

              {/* In-depth Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-display mb-4">
                  Service Overview &amp; Capabilities
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {Array.isArray(service.detailedDescription) ? (
                    service.detailedDescription.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <p>{service.description}</p>
                  )}
                </div>
              </div>

              {/* What's Included / Deliverables */}
              {Array.isArray(service.points) && service.points.length > 0 && (
                <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-[#DE1D3A]" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display">
                      What&apos;s Included in This Service
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-red-50 text-[#DE1D3A] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Standards & Specifications Table */}
              {Array.isArray(service.specifications) && service.specifications.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-[#DE1D3A]" />
                    Technical Specifications &amp; Standards
                  </h3>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                    <table className="min-w-full divide-y divide-gray-200 text-left">
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {service.specifications.map((spec, idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? 'bg-gray-50/60' : 'bg-white hover:bg-gray-50/30'}
                          >
                            <td className="px-4 py-3 text-xs sm:text-sm font-bold text-gray-800 w-2/5">
                              {spec.label}
                            </td>
                            <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-600">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Engineering Process Steps */}
              {Array.isArray(service.processSteps) && service.processSteps.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display mb-6 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#DE1D3A]" />
                    Our Engineering &amp; Execution Process
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-white border border-gray-200 rounded-2xl relative overflow-hidden group hover:border-[#DE1D3A]/40 transition-colors shadow-xs"
                      >
                        <span className="text-3xl font-extrabold text-gray-100 absolute top-3 right-4 select-none group-hover:text-red-50 transition-colors">
                          {step.step}
                        </span>
                        <div className="relative z-10">
                          <span className="text-[11px] font-bold text-[#DE1D3A] uppercase tracking-wider block mb-1">
                            Step {step.step}
                          </span>
                          <h4 className="text-sm font-bold text-gray-900 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitable Industries & Applications */}
              {Array.isArray(service.suitableFor) && service.suitableFor.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 font-display mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#DE1D3A]" />
                    Industry Sectors &amp; Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.suitableFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors border border-gray-200/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Sidebar with CTA & Other Services (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Inquiry / Consultation Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-7 shadow-xl sticky top-28">
                <span className="inline-block px-2.5 py-1 bg-[#DE1D3A]/30 border border-[#DE1D3A]/50 text-[#FF6B81] text-[10px] font-bold uppercase tracking-wider rounded-md mb-4">
                  Direct Engineering Support
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2">
                  Need {service.title}?
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  Speak directly with our senior mechanical engineers for technical proposals, on-site surveys, or customized machinery quotations.
                </p>

                <div className="space-y-3">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full py-3 px-4 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Request Service Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:+919061782023"
                    className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-white/10"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B81]" /> Call: +91 9061782023
                  </a>

                  <a
                    href={`https://wa.me/919061782023?text=${encodeURIComponent(
                      `Hello Cobolt Machineries, I am interested in your ${service.title} service. Please share more details.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
                  </a>
                </div>

                {/* Service Guarantees */}
                <div className="mt-6 pt-6 border-t border-gray-700/60 space-y-2.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Certified Technicians &amp; Welders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Rapid Response Time across Kerala</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Original OEM Spare Parts Guarantee</span>
                  </div>
                </div>

                {/* Other Services Navigation List inside sidebar */}
                {relatedServices.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-700/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                      Other Available Services
                    </h4>
                    <div className="space-y-1.5">
                      {relatedServices.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/services/${rel.id}`}
                          className="flex items-center justify-between p-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors group"
                        >
                          <span className="truncate">{rel.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Related Services Grid */}
          {relatedServices.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                    Explore Other Machinery Services
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    End-to-end commercial solutions supporting industrial kitchens and food processors.
                  </p>
                </div>
                <Link
                  href="/services"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#DE1D3A] hover:underline"
                >
                  View All Services <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((rel) => {
                  const RelIcon = iconMap[rel.id] || Wrench;
                  return (
                    <Link
                      key={rel.id}
                      href={`/services/${rel.id}`}
                      className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#DE1D3A]/30 rounded-2xl p-5 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-[#DE1D3A] text-[#DE1D3A] group-hover:text-white border border-gray-200 flex items-center justify-center mb-3 transition-colors shadow-2xs">
                          <RelIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-[#DE1D3A] transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {rel.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center text-xs font-bold text-[#DE1D3A]">
                        Explore Service Details
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
