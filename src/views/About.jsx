import React from 'react';
import Image from 'next/image';
import { Award, Compass, Eye, ShieldCheck, Zap, Factory, Globe } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import hmAbout1 from '../assets/hm_about1.webp';

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Engineering Excellence",
      desc: "We make zero compromises on build tolerances, steel grades, and micro-component calibration. Precision is our fundamental standard."
    },
    {
      icon: ShieldCheck,
      title: "Reliability First",
      desc: "Our machinery is designed to perform in intense continuous production cycles. We prioritize structural strength and uptime assurance."
    },
    {
      icon: Zap,
      title: "Client-Centric Customization",
      desc: "Every assembly floor is unique. We adapt layouts, controls, and technical parameters to match our client's exact operational requirements."
    }
  ];

  return (
    <PageWrapper>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 bg-[#F8FAFC] border-b border-[#E5E7EB]/60 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] font-display leading-tight">
              About Cobolt Machineries
            </h1>
            <p className="text-[#6B7280] text-base md:text-lg max-w-2xl leading-relaxed">
              We engineer state-of-the-art machinery that powers modern manufacturing, supporting precision parts creation and infrastructure reliability globally.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-display">
                Building the Future of Heavy Machinery
              </h2>
              <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                Cobolt Machineries was established with a singular vision: to build reliable, high-end, heavy-duty industrial systems that push manufacturing efficiency forward. What began as a local foundry has expanded into a global industrial engineering vendor.
              </p>
              <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                Our operations today span across multiple departments: mechanical design, metallurgical research, automation software integration, and heavy structure assembly. We construct our components out of stress-relieved steel and run rigorous static and dynamic load simulations before any shipment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <h4 className="font-display font-bold text-3xl text-[#DE1D3A]">2020</h4>
                  <p className="text-[#6B7280] text-xs mt-1 font-semibold uppercase tracking-wider">Inception Year</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-3xl text-[#DE1D3A]">4000+</h4>
                  <p className="text-[#6B7280] text-xs mt-1 font-semibold uppercase tracking-wider">Machines Installed</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-3xl text-[#DE1D3A]">45+</h4>
                  <p className="text-[#6B7280] text-xs mt-1 font-semibold uppercase tracking-wider">Global Exporters</p>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E5E7EB] max-h-[420px]">
                <Image
                  src={hmAbout1}
                  alt="Industrial factory floor"
                  width={1000}
                  height={667}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
           
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission dual grids */}
      <section className="py-24 bg-[#F8FAFC] border-y border-[#E5E7EB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-[#FFFFFF] rounded-2xl p-8 md:p-12 border border-[#E5E7EB]/50 shadow-sm text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FCE8EC] rounded-lg flex items-center justify-center text-[#DE1D3A] mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111827] mb-4">Our Vision</h3>
                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                  To be the global benchmark for high-precision manufacturing solutions, transforming how heavy industries design and produce products by bridging structural engineering with cloud diagnostics.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 text-xs font-bold text-[#DE1D3A] uppercase tracking-wider">
                <Globe className="w-4 h-4" /> Global Leadership Standards
              </div>
            </div>

            {/* Mission */}
            <div className="bg-[#FFFFFF] rounded-2xl p-8 md:p-12 border border-[#E5E7EB]/50 shadow-sm text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FCE8EC] rounded-lg flex items-center justify-center text-[#DE1D3A] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#111827] mb-4">Our Mission</h3>
                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                  To supply durable, zero-defect machines and rapid engineering maintenance programs that enhance operator safety, reduce power consumption, and maintain production continuity for our clients.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 text-xs font-bold text-[#DE1D3A] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Uncompromising Safety Rules
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest">Principles We Live By</span>
            <h2 className="text-3xl font-extrabold text-[#111827] font-display">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="border border-[#E5E7EB] hover:border-[#DE1D3A]/20 bg-[#FFFFFF] rounded-xl p-8 text-left hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#FCE8EC] text-[#DE1D3A] flex items-center justify-center mb-6">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#111827] mb-3">{val.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
