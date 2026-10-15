'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  UploadCloud,
  FileText,
  ChevronDown,
  X,
  Send,
  ArrowRight
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

// Mock Job Openings Data
const JOB_OPENINGS = [
  {
    id: 'sales-executive',
    title: 'Sales Executive'
  },
  {
    id: 'mech-design-eng',
    title: 'Senior Mechanical Design Engineer'
  },
  {
    id: 'cnc-machinist-spec',
    title: '5-Axis CNC Specialist & Machinist'
  },
  {
    id: 'plc-automation-eng',
    title: 'Industrial Automation & PLC Engineer'
  },
  {
    id: 'qa-qc-engineer',
    title: 'Quality Assurance & Inspection Engineer'
  },
  {
    id: 'field-service-tech',
    title: 'Field Service & Commissioning Specialist'
  }
];


const TESTIMONIALS = [
  {
    quote: 'Joining Cobolt allowed me to transition from routine design drafts to taking full ownership of custom machinery lines. The management genuinely invests in modern software and tooling.',
    author: 'Nidhin Krishnan',
    role: 'Lead Automation Engineer',
    tenure: '4 Years at Cobolt'
  },
  {
    quote: 'The safety standards and precision culture here are exceptional. Every micrometer matters, and you are surrounded by people who take genuine pride in building robust machinery.',
    author: 'Shameer Babu',
    role: 'Senior CNC Machinist',
    tenure: '3.5 Years at Cobolt'
  },
  {
    quote: 'From day one, the team welcomed me into client commissioning projects. You see the actual machines you worked on running on factory floors across the country.',
    author: 'Anjali Menon',
    role: 'Quality & Inspection Specialist',
    tenure: '2 Years at Cobolt'
  }
];

const FAQS = [
  {
    question: 'Can fresh graduates apply for engineering positions?',
    answer: 'Yes! We run regular Graduate Engineering Trainee (GET) and Diploma Trainee programs for mechanical, electrical, and manufacturing streams. Select "Entry Level" in the application form.'
  },
  {
    question: 'What is the standard work schedule at the Manjeri facility?',
    answer: 'Our plant and engineering studios operate Monday through Saturday, from 9:00 AM to 6:00 PM, with standard breaks. Shift rotations apply to specific CNC manufacturing teams with applicable allowances.'
  },
  {
    question: 'Do you offer relocation support for candidates outside Malappuram?',
    answer: 'Yes, for specialized technical and senior engineering roles, we provide initial lodging assistance and relocation support to help candidates settle comfortably in Manjeri/Malappuram.'
  },
  {
    question: 'What happens if there is no current opening matching my profile?',
    answer: 'You can still submit a general application using the form below by selecting "General Engineering Application". Our HR team retains qualified resumes in our active talent pool for upcoming projects.'
  }
];

export default function Careers() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Form State
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetPosition: '',
    experienceLevel: 'Mid Level (3-5 Years)',
    linkedIn: '',
    coverNote: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefCode, setSubmittedRefCode] = useState(null);

  const handleApplyForRole = (roleTitle) => {
    setFormData((prev) => ({
      ...prev,
      targetPosition: roleTitle
    }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size under 10MB
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          file: 'File size must be under 10 MB'
        }));
        return;
      }
      setSelectedFile(file);
      setFormErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your mobile number';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = 'Please provide a valid contact number';
    }
    if (!formData.targetPosition) {
      errors.targetPosition = 'Please select the position you are applying for';
    }
    if (!selectedFile) {
      errors.file = 'Please upload your resume (PDF or DOCX)';
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = `CBL-JOB-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRefCode(randomRef);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      targetPosition: '',
      experienceLevel: 'Mid Level (3-5 Years)',
      linkedIn: '',
      coverNote: ''
    });
    setSelectedFile(null);
    setSubmittedRefCode(null);
    setFormErrors({});
  };

  return (
    <PageWrapper>
      {/* ===================== FEATURED JOB ROLE: SALES EXECUTIVE (SIMPLE & CLEAN DESIGN) ===================== */}
      <section id="sales-executive-role" className="pt-32 pb-20 bg-[#F8FAFC] scroll-mt-24 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Clean Main Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
            
            {/* Header Area */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest font-sans block">
                    We’re Hiring
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
                    Sales Executive
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-1">
                    We’re seeking a target-driven Sales Executive to manage enquiries, follow up with leads, recommend suitable equipment, and close sales through digital channels.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApplyForRole('Sales Executive')}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#DE1D3A] hover:bg-[#c51831] text-white font-poppins font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text-Only Meta Badges with Full Border */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white">
                  Sales & Business Development
                </span>
                <span className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white">
                  Full-Time | Office-Based
                </span>
                <span className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white">
                  No Field Sales
                </span>
                <span className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white">
                  Male Candidates Preferred
                </span>
              </div>
            </div>

            {/* 1. Job Summary */}
            <div className="p-6 sm:p-10 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] font-display">
                Job Summary
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                We’re seeking a target-driven Sales Executive to manage enquiries, follow up with leads, recommend suitable equipment, and close sales through digital channels. You will consult with restaurants, bakeries, catering operations, and commercial kitchen clients, preparing technical quotations and closing orders with 100% office-based operations and zero field travel.
              </p>
            </div>

            {/* 2. Key Responsibilities */}
            <div className="p-6 sm:p-10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] font-display">
                Key Responsibilities
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Handle and follow up on customer enquiries promptly.',
                  'Understand customer needs and recommend suitable commercial kitchen equipment.',
                  'Share product information, catalogues, and quotations.',
                  'Negotiate and convert leads into confirmed sales.',
                  'Maintain lead and sales records in the CRM.',
                  'Coordinate with production, accounts, delivery, and service teams.',
                  'Achieve monthly sales targets consistently.',
                  'Maintain strong customer relationships and encourage repeat sales.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DE1D3A] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Required Skills */}
            <div className="p-6 sm:p-10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] font-display">
                Required Skills
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Inside sales, tele-sales, or B2B sales experience.',
                  'Strong communication, negotiation, and closing skills.',
                  'Excellent phone and WhatsApp business communication.',
                  'Basic knowledge of CRM, Excel / Google Sheets, and corporate email.',
                  'Ability to understand and explain technical products.',
                  'Strong follow-up and record-maintenance skills.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DE1D3A] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Preferred Experience & Qualification */}
            <div className="p-6 sm:p-10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] font-display">
                Preferred Experience & Qualification
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE1D3A] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-800">Experience:</strong> Prior experience in machinery, commercial kitchen equipment, hospitality equipment, or a related industry is preferred.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE1D3A] mt-2 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-800">Qualification:</strong> Practical sales ability, communication skills, product understanding, and proven closing ability will be given priority over formal degrees.
                  </span>
                </li>
              </ul>
            </div>

            {/* Footer Action Row */}
            <div className="p-6 sm:p-8 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs sm:text-sm text-slate-600 font-sans text-center sm:text-left">
                Location: <strong className="text-slate-900">Manjeri / Vemboor</strong> (Office-Based, No Field Sales)
              </span>
              <button
                type="button"
                onClick={() => handleApplyForRole('Sales Executive')}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#DE1D3A] hover:bg-[#c51831] text-white font-poppins font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for this Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== APPLICATION FORM SECTION ===================== */}
      <section
        id="application-form"
        ref={formRef}
        className="py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/80 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest font-sans">
              Take the Next Step
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display">
              Submit Your Job Application
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base">
              Send your profile directly to our talent acquisition team. We assess applications on merit, skills, and cultural alignment.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-100 relative overflow-hidden">
            {submittedRefCode ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Application Submitted Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>! Our engineering recruiting team will review your application for the{' '}
                  <span className="font-semibold text-[#DE1D3A]">{formData.targetPosition}</span> position and reach out within 48 to 72 hours.
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Application Tracking Reference:{' '}
                  <span className="font-mono font-bold text-slate-900">{submittedRefCode}</span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-[#DE1D3A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c51831] transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Full Name <span className="text-[#DE1D3A]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, fullName: e.target.value }));
                        if (formErrors.fullName) setFormErrors((p) => ({ ...p, fullName: '' }));
                      }}
                      placeholder="e.g. Rahul Nambiar"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 transition-all ${
                        formErrors.fullName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#DE1D3A]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Email Address <span className="text-[#DE1D3A]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, email: e.target.value }));
                        if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                      }}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 transition-all ${
                        formErrors.email
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#DE1D3A]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Contact Phone <span className="text-[#DE1D3A]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, phone: e.target.value }));
                        if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: '' }));
                      }}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 transition-all ${
                        formErrors.phone
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#DE1D3A]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Target Position */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Target Position <span className="text-[#DE1D3A]">*</span>
                    </label>
                    <select
                      value={formData.targetPosition}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, targetPosition: e.target.value }));
                        if (formErrors.targetPosition)
                          setFormErrors((p) => ({ ...p, targetPosition: '' }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50/70 border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 transition-all ${
                        formErrors.targetPosition
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#DE1D3A]'
                      }`}
                    >
                      <option value="">Select a role...</option>
                      {JOB_OPENINGS.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                      <option value="General Engineering Application">
                        General Engineering Application
                      </option>
                      <option value="Internship / Trainee Program">
                        Internship / Trainee Program
                      </option>
                    </select>
                    {formErrors.targetPosition && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.targetPosition}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Experience Level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Experience Level
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, experienceLevel: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 focus:border-[#DE1D3A] transition-all"
                    >
                      <option value="Entry Level / Fresh Graduate">Entry Level / Fresh Graduate (0-2 Yrs)</option>
                      <option value="Mid Level (3-5 Years)">Mid Level (3-5 Years)</option>
                      <option value="Senior Level (5-8 Years)">Senior Level (5-8 Years)</option>
                      <option value="Lead / Specialist (8+ Years)">Lead / Specialist (8+ Years)</option>
                    </select>
                  </div>

                  {/* LinkedIn / Portfolio URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      LinkedIn / Portfolio URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, linkedIn: e.target.value }))
                      }
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 focus:border-[#DE1D3A] transition-all"
                    />
                  </div>
                </div>

                {/* Resume Upload Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Upload Resume / CV (PDF, DOCX up to 10MB) <span className="text-[#DE1D3A]">*</span>
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />

                  {selectedFile ? (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#DE1D3A]/10 text-[#DE1D3A] flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{selectedFile.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 bg-slate-50/50 hover:bg-slate-50 ${
                        formErrors.file
                          ? 'border-red-400'
                          : 'border-slate-300 hover:border-[#DE1D3A]'
                      }`}
                    >
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm font-semibold text-slate-700">
                        Click to select or drop your resume here
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">PDF or Word document (Max 10 MB)</p>
                    </div>
                  )}
                  {formErrors.file && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.file}</p>
                  )}
                </div>

                {/* Cover Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Cover Note / Brief Introduction (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.coverNote}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, coverNote: e.target.value }))
                    }
                    placeholder="Tell us about your background, key industrial machinery projects, or why you want to join Cobolt..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DE1D3A]/20 focus:border-[#DE1D3A] transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#DE1D3A] to-[#F04A63] hover:from-[#C91834] hover:to-[#DE1D3A] text-white font-poppins font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#DE1D3A]/30 hover:shadow-xl hover:shadow-[#DE1D3A]/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-3 font-sans">
                    By submitting, you agree to allow Cobolt Machineries to process your information for recruitment purposes.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===================== CULTURE & EMPLOYEE TESTIMONIALS ===================== */}
      <section className="py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest font-sans">
              Voices of Cobolt
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display">
              Life on the Shop Floor
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base">
              Hear directly from our engineers and specialists about what makes Cobolt Machineries an exceptional workplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <span className="text-4xl text-[#DE1D3A] font-serif leading-none block">“</span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-sans">
                    {item.quote}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-200/60">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#DE1D3A] font-semibold">{item.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.tenure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQS ===================== */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[#DE1D3A] font-bold text-xs uppercase tracking-widest font-sans">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display">
              Careers FAQ
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base">
              Quick answers to common questions about working at Cobolt Machineries.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-display font-bold text-sm sm:text-base text-slate-800 hover:text-[#DE1D3A] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#DE1D3A]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Unsolicited Inquiry Card */}
          <div className="mt-12 p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Don't see the right position right now?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Send your profile to our talent recruitment inbox directly at{' '}
              <a
                href="mailto:infocobolt123@gmail.com?subject=General%20Careers%20Application"
                className="text-[#DE1D3A] font-semibold hover:underline"
              >
                infocobolt123@gmail.com
              </a>{' '}
              and mention your core specialization.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
