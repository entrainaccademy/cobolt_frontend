import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbs } from '../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../lib/siteConfig';
import { POLICY_CONFIG } from '../../data/policyConfig';

export const metadata = {
  title: 'Privacy Policy | Cobolt Machineries',
  description:
    'Learn how Cobolt Machineries collects, uses, protects, and manages customer and business information in accordance with Indian data protection laws.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | Cobolt Machineries',
    description:
      'Learn how Cobolt Machineries collects, uses, protects, and manages customer and business information.',
    url: `${SITE_URL}/privacy-policy`,
    type: 'website',
  },
};

const tocItems = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-information', title: 'How We Use Information' },
  { id: 'payment-processing', title: 'Payment Processing' },
  { id: 'cookies-analytics', title: 'Cookies & Analytics' },
  { id: 'information-sharing', title: 'Information Sharing & Third Parties' },
  { id: 'data-security', title: 'Data Security & Storage' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'customer-rights', title: 'Your Rights & Choices' },
  { id: 'contact-details', title: 'Contact Information' },
];

export default function PrivacyPolicyPage() {
  const company = POLICY_CONFIG.company;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Privacy Policy', '/privacy-policy'],
        ])}
      />
      <PolicyLayout
        title="Privacy Policy"
        subtitle="How Cobolt Machineries collects, utilizes, safeguards, and handles customer and corporate information across our website, commercial quotations, and service operations."
        category="Privacy & Data Protection"
        toc={tocItems}
      >
        <section id="introduction" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            1. Introduction
          </h2>
          <p>
            {company.legalName} (&quot;Cobolt Machineries&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects the privacy and confidentiality of our clients, prospective purchasers, commercial culinary partners, and visitors to our website ({company.website}).
          </p>
          <p>
            This Privacy Policy explains the nature of personal and business information we collect, the purposes for which it is processed, how it is safeguarded, and the circumstances under which it may be shared with authorized partners. This policy applies to all interactions with Cobolt Machineries, including website visits, quotation requests, equipment orders, custom machinery consultations, and after-sales service appointments.
          </p>
        </section>

        <section id="information-we-collect" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            2. Information We Collect
          </h2>
          <p>
            We collect information strictly necessary to facilitate equipment quotations, commercial sales, fabrication planning, logistics delivery, and technical maintenance. Depending on your engagement with us, this may include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Contact Details:</strong> Full name, business or trading name, mobile phone number, alternate contact number, and email address.</li>
            <li><strong>Commercial &amp; Billing Details:</strong> Registered business address, GSTIN (Goods and Services Tax Identification Number), corporate entity type, and invoice billing address.</li>
            <li><strong>Delivery &amp; Site Information:</strong> Site delivery address, pin code, unloading accessibility notes, facility contact person, and receiving hours.</li>
            <li><strong>Enquiry &amp; Technical Requirements:</strong> Machine specifications, custom stainless steel dimensions, utility configurations (single-phase or 3-phase electricity, LPG/PNG connection), recipe production targets, and engineering drawings.</li>
            <li><strong>Transaction Records:</strong> Proforma invoice references, payment transaction IDs, bank reference numbers (UTR), purchase orders, and warranty registration details.</li>
          </ul>
        </section>

        <section id="how-we-use-information" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            3. How We Use Information
          </h2>
          <p>The information collected is utilized exclusively for legitimate business and service delivery purposes, including:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Processing product inquiries, preparing commercial quotations, and confirming purchase orders.</li>
            <li>Scheduling equipment dispatch, freight transportation, and curbside or on-site delivery coordination.</li>
            <li>Assigning certified service technicians for equipment installation, commissioning, AMC maintenance, or repair visits.</li>
            <li>Administering warranty claims, validating serial numbers, and providing technical support.</li>
            <li>Issuing GST-compliant tax invoices, credit notes, and payment receipts required by statutory Indian taxation laws.</li>
            <li>Communicating critical service updates, technical bulletins, and operational advisories regarding purchased machinery.</li>
          </ul>
        </section>

        <section id="payment-processing" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            4. Payment Processing
          </h2>
          <p>
            Cobolt Machineries prioritizes secure financial transactions. Payments for machinery and services may be conducted via direct NEFT/RTGS/IMPS bank transfer to our verified current accounts, official corporate UPI IDs, or authorized third-party payment gateway providers.
          </p>
          <p>
            <strong>Important Security Clarification:</strong> Cobolt Machineries does not store, process, or capture full debit card numbers, credit card numbers, CVVs, or internet banking login passwords on our servers. All digital payments conducted through third-party gateways are encrypted and processed under the respective provider’s PCI-DSS compliant infrastructure. Customers are advised never to share banking passwords, OTPs, or debit/credit card PINs with anyone, including Cobolt Machineries personnel.
          </p>
        </section>

        <section id="cookies-analytics" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            5. Cookies &amp; Analytics
          </h2>
          <p>
            Our website utilizes standard, non-intrusive cookies and session technologies necessary for basic site functionality, page navigation speed, and responsive layout performance. We may also review aggregate, anonymized web traffic analytics (such as page views, device types, and browser versions) to evaluate site performance and improve customer browsing experiences.
          </p>
          <p>
            You can configure your web browser to reject cookies or notify you when cookies are being set. Disabling essential cookies will not prevent you from browsing our equipment catalog or contacting our sales desk.
          </p>
        </section>

        <section id="information-sharing" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            6. Information Sharing &amp; Third Parties
          </h2>
          <p>
            We do not sell, rent, trade, or barter customer personal or commercial information to third-party marketing companies. Information is shared strictly on a confidential need-to-know basis with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Logistics &amp; Freight Carriers:</strong> Sharing delivery addresses, site contact numbers, and consignment details with authorized transport partners to deliver heavy machinery.</li>
            <li><strong>Field Service Technicians:</strong> Sharing customer site location and machine details with assigned service technicians and installation engineers.</li>
            <li><strong>Financial &amp; Regulatory Authorities:</strong> Providing transactional information to chartered accountants, auditors, and statutory authorities (including GST and Income Tax departments) as mandated by Indian law.</li>
            <li><strong>Original Equipment Manufacturers (OEMs):</strong> Providing machine serial numbers and installation records to partner manufacturers solely for formal warranty registration.</li>
          </ul>
        </section>

        <section id="data-security" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            7. Data Security &amp; Storage
          </h2>
          <p>
            We implement reasonable technical, operational, and organizational security measures to protect customer data against unauthorized access, loss, alteration, or disclosure. Digital records are stored on access-restricted systems, and physical paperwork (such as work orders and delivery challans) is held in secure company facilities. While we implement standard industry safeguards, no transmission of data over the internet can be guaranteed as entirely immune to breach.
          </p>
        </section>

        <section id="data-retention" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            8. Data Retention
          </h2>
          <p>
            We retain personal and commercial information only for as long as necessary to fulfill the purposes for which it was gathered, including satisfying warranty obligations, providing ongoing spare parts support, and complying with statutory record-keeping requirements under the Companies Act and Indian tax regulations.
          </p>
        </section>

        <section id="customer-rights" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            9. Your Rights &amp; Choices
          </h2>
          <p>
            Subject to applicable Indian law and reasonable verification of identity, business clients and individual purchasers have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Request confirmation of the personal and business contact records we hold regarding your account.</li>
            <li>Request correction or updating of inaccurate billing, contact, or delivery details.</li>
            <li>Request discontinuation of promotional communications or commercial newsletters at any time.</li>
          </ul>
          <p>
            Please note that statutory transaction records, issued tax invoices, and legal compliance archives cannot be deleted during mandatory statutory retention periods.
          </p>
        </section>

        <section id="contact-details" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            10. Contact Information
          </h2>
          <p>
            For privacy inquiries, data correction requests, or questions regarding this Privacy Policy, please write to our privacy officer at{' '}
            <a href={`mailto:${company.email}`} className="text-[#DE1D3A] underline font-medium">
              {company.email}
            </a>{' '}
            or contact us at {company.phoneDisplay}.
          </p>
        </section>
      </PolicyLayout>
    </>
  );
}
