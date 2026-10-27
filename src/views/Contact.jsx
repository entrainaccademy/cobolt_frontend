'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, CheckCircle2, User, Building, Landmark, AlertCircle, Navigation, ExternalLink, ArrowUpRight, Compass, Car } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { submitContactInquiry } from '../lib/api';

function SearchParamsHandler({ onParams }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams) return;
    const productParam = searchParams.get('product');
    const serviceParam = searchParams.get('service');
    const locParam = searchParams.get('loc');
    onParams({ productParam, serviceParam, locParam });
  }, [searchParams, onParams]);
  return null;
}

export default function Contact() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'Machinery Purchase',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightedLoc, setHighlightedLoc] = useState(null);

  const handleParamsChange = React.useCallback(({ productParam, serviceParam, locParam }) => {
    if (productParam) {
      setFormData(prev => ({
        ...prev,
        serviceType: 'Machinery Purchase',
        subject: `Inquiry: ${productParam}`,
        message: `I would like to request technical documentation, catalog specs, and pricing details for the ${productParam}.`
      }));
    } else if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        serviceType: 'Engineering Service',
        subject: `Inquiry: ${serviceParam}`,
        message: `I would like to discuss our requirements regarding your ${serviceParam} program.`
      }));
    }

    if (locParam) {
      setHighlightedLoc(locParam);
      setTimeout(() => {
        const element = document.getElementById(`loc-${locParam}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
      
      const timer = setTimeout(() => setHighlightedLoc(null), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Contact name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid corporate email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Mobile or telephone number is required';
    } else if (!/^[0-9+\s-]{8,20}$/.test(formData.phone)) {
      errors.phone = 'Please provide a valid contact number';
    }
    if (!formData.message.trim()) errors.message = 'Inquiry message details are required';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactInquiry(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: 'Machinery Purchase',
        subject: '',
        message: ''
      });
      // Reset success banner after 10 seconds
      setTimeout(() => setIsSubmitted(false), 10000);
    } catch (err) {
      console.error('Contact inquiry submission failed:', err);
      setSubmitError(err.message || 'Unable to submit your inquiry at this moment. Please reach us directly via WhatsApp or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    { 
      icon: Phone,
      title: "Call Our Hotline",
      details: "+91 90617 82023",
      sub: "Mon - Sat: 9:00 AM - 8:00 PM IST",
      action: "tel:+919061782023",
      actionText: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Our Engineers",
      details: "infocobolt123@gmail.com",
      sub: "Send specifications for bidding",
      action: "mailto:infocobolt123@gmail.com",
      actionText: "Email Us"
    },
    {
      icon: MessageSquare,
      title: "Chat on WhatsApp",
      details: "+91 90617 82023",
      sub: "Instant technical support routing",
      action: "https://wa.me/919061782023",
      actionText: "Start Chat"
    }
  ];

  return (
    <PageWrapper>
      <React.Suspense fallback={null}>
        <SearchParamsHandler onParams={handleParamsChange} />
      </React.Suspense>
      {/* Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#FCE8EC]/50 border-b border-[#E5E7EB]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#DE1D3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] font-display leading-tight tracking-tight">
              Connect with Cobolt
            </h1>
            <p className="text-[#6B7280] text-base md:text-lg max-w-2xl leading-relaxed">
              Have questions about machinery specs, structural ratings, or customized setups? Our operations crew and engineering desks are ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form and Info */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Contact Info and Support metrics */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-[#111827]">
                  Industrial Support Desk
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  We maintain full support networks across main industrial parks. For bidding details, tender documents, or structural reviews, send details directly to our engineering cells.
                </p>
              </div>

              {/* Quick Contact Cards */}
              <div className="space-y-4">
                {contactCards.map((card, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 border border-[#E5E7EB] rounded-2xl bg-[#F8FAFC] hover:bg-[#FFFFFF] hover:border-[#DE1D3A]/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#DE1D3A] group-hover:scale-105 group-hover:border-[#DE1D3A]/30 transition-all duration-300 flex items-center justify-center shadow-sm">
                        <card.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#111827]">{card.title}</h4>
                        <p className="text-[#111827] font-semibold text-xs mt-0.5">{card.details}</p>
                        <p className="text-[#6B7280] text-[10px]">{card.sub}</p>
                      </div>
                    </div>
                    <a
                      href={card.action}
                      target={card.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="px-4 py-2 border border-[#E5E7EB] hover:bg-[#DE1D3A] hover:text-white hover:border-[#DE1D3A] hover:shadow-md hover:shadow-[#DE1D3A]/10 text-xs font-semibold rounded-xl transition-all duration-200"
                    >
                      {card.actionText}
                    </a>
                  </div>
                ))}
              </div>

              {/* Branch Locations Cards */}
              <div className="space-y-4 pt-6 border-t border-[#E5E7EB]/60">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-base text-[#111827]">Our Facilities & Branches</h4>
                  <span className="text-[11px] font-medium text-[#6B7280]">1 Active Facility</span>
                </div>

                {/* Veepoor Kerala Facility Card - Interactive Design Navigates to Map */}
                <div
                  id="loc-veepoor"
                  className={`group relative p-6 border rounded-2xl bg-[#FFFFFF] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                    highlightedLoc === 'veepoor'
                      ? 'border-l-4 border-l-[#DE1D3A] border-y-[#E5E7EB] border-r-[#E5E7EB] bg-gradient-to-r from-[#FCE8EC]/40 to-[#FFFFFF] ring-2 ring-[#DE1D3A]/20'
                      : 'border-[#E5E7EB] hover:border-[#DE1D3A]/40'
                  }`}
                >
                  {/* Status header with live indicator */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open for Technical Visits
                    </span>
                    <a
                      href="https://maps.app.goo.gl/MAA1nccyeE7M7RBh8"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-[#DE1D3A] flex items-center gap-1 group-hover:underline"
                    >
                      <span>Navigate Map</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/MAA1nccyeE7M7RBh8"
                    target="_blank"
                    rel="noreferrer"
                    className="block cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#FCE8EC]/40 text-[#DE1D3A] border border-[#DE1D3A]/20 flex-shrink-0 group-hover:scale-105 group-hover:bg-[#DE1D3A] group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-display font-bold text-base text-[#111827] group-hover:text-[#DE1D3A] transition-colors flex items-center gap-1.5">
                          Cobolt Machineries Headquarters
                        </h5>
                        <p className="text-[#4B5563] text-xs font-medium mt-0.5">
                          Commercial Kitchen Equipment & Heavy Fabrication
                        </p>
                        <p className="text-[#6B7280] text-xs leading-relaxed mt-1.5">
                          Veemboor Industrial Zone, Manjeri, Malappuram, Kerala 676122, India
                        </p>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-2 pl-14 text-[11px] text-[#6B7280] mt-3">
                    <Clock className="w-3.5 h-3.5 text-[#6B7280]/80 flex-shrink-0" />
                    <span>Mon - Sat: 9:00 AM – 7:00 PM IST (Visits by Technical Appointment)</span>
                  </div>

                  {/* Navigation CTA Buttons */}
                  <div className="pt-4 mt-4 border-t border-[#E5E7EB]/70 flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://maps.app.goo.gl/MAA1nccyeE7M7RBh8"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DE1D3A] to-[#B7152D] hover:from-[#B7152D] hover:to-[#DE1D3A] text-white text-xs font-bold shadow-md shadow-[#DE1D3A]/20 hover:shadow-lg hover:shadow-[#DE1D3A]/30 transition-all duration-200"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Navigate on Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const mapSection = document.getElementById('facility-map');
                        if (mapSection) {
                          mapSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] hover:border-[#DE1D3A]/30 hover:bg-[#F8FAFC] text-[#374151] hover:text-[#DE1D3A] text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#DE1D3A]" />
                      <span>View Map Below</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50 text-left">
              <h3 className="font-display font-bold text-2xl text-[#111827] mb-8 flex items-center gap-2">
                Request Specifications Callback
                <span className="w-2 h-2 rounded-full bg-[#DE1D3A] animate-pulse" />
              </h3>

              {isSubmitted ? (
                <div className="p-6 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl text-[#1F2937] space-y-3 animate-fade-in mb-6">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                    <span>Inquiry Submitted Successfully</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you for connecting with Cobolt Machineries. Our system engineers will review your specifications and contact you at the provided email within 12-24 business hours.
                  </p>
                </div>
              ) : null}

              {submitError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs mb-6 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#DE1D3A] flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="group relative">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border ${
                          formErrors.name ? 'border-[#DE1D3A] focus:ring-[#DE1D3A]/20' : 'border-[#E5E7EB] focus:ring-[#DE1D3A]/10'
                        } focus:outline-none focus:ring-4 focus:border-[#DE1D3A] transition-all duration-300`}
                        placeholder="e.g. Vikram Singhania"
                      />
                      <User className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                    </div>
                    {formErrors.name && (
                      <p className="text-[#DE1D3A] text-[10px] font-semibold mt-1.5">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="group relative">
                    <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Corporate/Entity Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-4 focus:ring-[#DE1D3A]/10 focus:border-[#DE1D3A] transition-all duration-300"
                        placeholder="e.g. AeroSteel Inc"
                      />
                      <Building className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="group relative">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Corporate Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border ${
                          formErrors.email ? 'border-[#DE1D3A] focus:ring-[#DE1D3A]/20' : 'border-[#E5E7EB] focus:ring-[#DE1D3A]/10'
                        } focus:outline-none focus:ring-4 focus:border-[#DE1D3A] transition-all duration-300`}
                        placeholder="e.g. vsinghania@aerosteel.com"
                      />
                      <Mail className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                    </div>
                    {formErrors.email && (
                      <p className="text-[#DE1D3A] text-[10px] font-semibold mt-1.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="group relative">
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border ${
                          formErrors.phone ? 'border-[#DE1D3A] focus:ring-[#DE1D3A]/20' : 'border-[#E5E7EB] focus:ring-[#DE1D3A]/10'
                        } focus:outline-none focus:ring-4 focus:border-[#DE1D3A] transition-all duration-300`}
                        placeholder="e.g. +91 90617 82023"
                      />
                      <Phone className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[#DE1D3A] text-[10px] font-semibold mt-1.5">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Type Dropdown */}
                  <div className="group relative">
                    <label htmlFor="serviceType" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Inquiry Category
                    </label>
                    <div className="relative">
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-4 focus:ring-[#DE1D3A]/10 focus:border-[#DE1D3A] transition-all duration-300 appearance-none"
                      >
                        <option value="Machinery Purchase">Machinery Purchase</option>
                        <option value="Engineering Service">Engineering Service</option>
                        <option value="AMC Pricing Request">AMC Pricing Request</option>
                        <option value="Custom Fabrication Consulting">Custom Fabrication Consulting</option>
                      </select>
                      <Landmark className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="group relative">
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Subject Title
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-4 focus:ring-[#DE1D3A]/10 focus:border-[#DE1D3A] transition-all duration-300"
                        placeholder="e.g. COBOLT-X5 CNC specifications query"
                      />
                      <MessageSquare className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group relative">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                    Inquiry Message Details *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-sm text-[#111827] rounded-xl border ${
                        formErrors.message ? 'border-[#DE1D3A] focus:ring-[#DE1D3A]/20' : 'border-[#E5E7EB] focus:ring-[#DE1D3A]/10'
                      } focus:outline-none focus:ring-4 focus:border-[#DE1D3A] transition-all duration-300`}
                      placeholder="Provide details about structural thickness parameters, axis speeds requirements, or materials characteristics."
                    />
                    <MessageSquare className="w-4 h-4 text-[#6B7280]/65 absolute left-3.5 top-5 pointer-events-none group-focus-within:text-[#DE1D3A] transition-colors duration-300" />
                  </div>
                  {formErrors.message && (
                    <p className="text-[#DE1D3A] text-[10px] font-semibold mt-1.5">{formErrors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#DE1D3A] to-[#B7152D] hover:from-[#B7152D] hover:to-[#DE1D3A] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#DE1D3A]/25 hover:shadow-xl hover:shadow-[#DE1D3A]/30 hover:scale-[1.01] active:scale-95 disabled:opacity-85"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        TRANSMITTING DETAILS...
                      </span>
                    ) : (
                      <>
                        <span>TRANSMIT SPECIFICATIONS INQUIRY</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Google Maps Location Area & Navigation UI */}
      <section id="facility-map" className="relative bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F8FAFC] py-20 border-t border-[#E5E7EB]/70 overflow-hidden">
        {/* Decorative background grid and accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DE1D3A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="space-y-3 mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#DE1D3A]/10 text-[#DE1D3A] border border-[#DE1D3A]/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>Plant Location & GPS Navigation</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
              Visit Cobolt Machineries Headquarters
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
              Experience live demonstrations of commercial kitchen machinery, heavy food processing units, and custom stainless steel fabrication at our Veemboor facility.
            </p>
          </div>

          {/* Main Map + UI Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Interactive Facility Card (Click design navigates to map) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#FFFFFF] rounded-3xl border border-[#E5E7EB] shadow-xl shadow-slate-100/70 hover:border-[#DE1D3A]/30 transition-all duration-300">
              <div className="space-y-6">
                {/* Facility Title & Verification */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                  
                    
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#111827]">
                    Cobolt Machineries
                  </h3>
                  
                </div>

                {/* Key Facility Details */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] text-[#DE1D3A] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Physical Address</p>
                      <p className="text-xs text-[#6B7280] leading-relaxed mt-0.5">
                        Veemboor Industrial Zone, Manjeri, Malappuram, Kerala 676122, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] text-[#DE1D3A] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Facility Hours</p>
                      <p className="text-xs text-[#6B7280] leading-relaxed mt-0.5">
                        Monday – Saturday: 9:00 AM – 7:00 PM IST
                      </p>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">Custom machinery demonstrations by appointment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] text-[#DE1D3A] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                      <Car className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Transit & Proximity</p>
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]/60">
                          <span className="block text-[10px] text-[#6B7280]">Manjeri Town</span>
                          <span className="font-semibold text-xs text-[#111827]">4.5 km (~10 mins)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]/60">
                          <span className="block text-[10px] text-[#6B7280]">Calicut Airport (CCJ)</span>
                          <span className="font-semibold text-xs text-[#111827]">24 km (~40 mins)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plant Capability Highlights */}
              
              </div>

              {/* Click Design / Action to Navigate to Map */}
              <div className="pt-6 mt-6 border-t border-[#E5E7EB] space-y-3">
                <a
                  href="https://maps.app.goo.gl/MAA1nccyeE7M7RBh8"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#DE1D3A] to-[#B7152D] hover:from-[#B7152D] hover:to-[#DE1D3A] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#DE1D3A]/25 hover:shadow-xl hover:shadow-[#DE1D3A]/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 group"
                >
                  <Navigation className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  <span>Navigate with Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+919061782023"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-semibold text-[#111827] transition-all duration-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#DE1D3A]" />
                    <span>Call Plant Desk</span>
                  </a>
                  <a
                    href="https://wa.me/919061782023?text=Hi%20Cobolt%20Machineries%2C%20I%20am%20planning%20a%20visit%20to%20your%20Veemboor%20factory."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-semibold text-[#111827] transition-all duration-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Interactive Map Container with Header & Navigation Overlay */}
            <div className="lg:col-span-7 flex flex-col rounded-3xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-xl shadow-slate-100/70 overflow-hidden relative group">
              {/* Top interactive browser/app bar */}
            
              {/* Map iframe with reliable standard Google Maps embed */}
              <div className="relative w-full h-[480px] lg:h-full min-h-[480px] bg-[#E5E7EB]/40">
                <iframe
                  title="Cobolt Kerala Facility Location"
                  src="https://maps.google.com/maps?q=11.1193023,76.0720596+(Cobolt+Machineries)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>

                {/* Floating bottom badge: Click to navigate */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-10 pointer-events-auto">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
