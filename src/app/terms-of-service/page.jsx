import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbs } from '../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../lib/siteConfig';
import { POLICY_CONFIG } from '../../data/policyConfig';

export const metadata = {
  title: 'Terms of Service | Cobolt Machineries',
  description:
    'Review the commercial terms and conditions governing machinery purchases, quotations, custom fabrication orders, and technical services with Cobolt Machineries.',
  alternates: {
    canonical: `${SITE_URL}/terms-of-service`,
  },
  openGraph: {
    title: 'Terms of Service | Cobolt Machineries',
    description:
      'Commercial terms governing equipment sales, quotations, fabrication, and engineering services.',
    url: `${SITE_URL}/terms-of-service`,
    type: 'website',
  },
};

const tocItems = [
  { id: 'acceptance-of-terms', title: 'Acceptance of Terms' },
  { id: 'products-specifications', title: 'Products & Technical Specifications' },
  { id: 'pricing-quotations', title: 'Pricing & Commercial Quotations' },
  { id: 'order-confirmation', title: 'Order Confirmation & Booking' },
  { id: 'payment-terms', title: 'Payment Terms' },
  { id: 'availability-lead-times', title: 'Product Availability & Lead Times' },
  { id: 'custom-machinery-orders', title: 'Custom Fabrication & Bespoke Orders' },
  { id: 'installation-service', title: 'Installation & Technical Services' },
  { id: 'customer-responsibilities', title: 'Customer Site Responsibilities' },
  { id: 'warranty-support', title: 'Warranty & After-Sales Support' },
  { id: 'order-cancellation', title: 'Order Cancellation Terms' },
  { id: 'limitation-of-liability', title: 'Limitation of Liability' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights' },
  { id: 'governing-law', title: 'Governing Law & Jurisdiction' },
  { id: 'contact-information', title: 'Contact Information' },
];

export default function TermsOfServicePage() {
  const company = POLICY_CONFIG.company;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Terms of Service', '/terms-of-service'],
        ])}
      />
      <PolicyLayout
        title="Terms of Service"
        subtitle="Commercial and legal terms governing equipment purchases, customized stainless steel fabrication, engineering consultations, and machinery servicing."
        category="Legal & Commercial Terms"
        toc={tocItems}
      >
        <section id="acceptance-of-terms" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (whether an individual purchaser, culinary business, restaurant operator, or corporate entity) and {company.legalName} (&quot;Cobolt Machineries&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>
          <p>
            By accessing our website ({company.website}), requesting written commercial quotations, placing purchase orders for commercial equipment, or commissioning custom fabrication or maintenance services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any part of these Terms, you must refrain from placing orders or commissioning services.
          </p>
        </section>

        <section id="products-specifications" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            2. Products &amp; Technical Specifications
          </h2>
          <p>
            Cobolt Machineries manufactures, imports, supplies, and services commercial kitchen equipment, food processing machinery, industrial bakery equipment, commercial refrigeration units, and custom stainless steel fabrication.
          </p>
          <p>
            <strong>Mandatory Pre-Purchase Technical Confirmation:</strong> Commercial machinery requires specific utility connections, power loads (single-phase 220V vs. three-phase 415V), gas pressures (LPG vs. PNG), plumbing inlets, drainage capacities, and physical dimensions. Technical specifications, capacities, motor ratings, exterior dimensions, and operating tolerances shown on website pages or catalog sheets are indicative and subject to continuous engineering enhancement. Customers must confirm all site dimensions, utility requirements, and specifications with our engineering team in writing prior to finalizing purchase orders.
          </p>
        </section>

        <section id="pricing-quotations" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            3. Pricing &amp; Commercial Quotations
          </h2>
          <p>
            Prices published on the website or promotional materials are subject to change without prior notice due to fluctuations in raw material costs (such as stainless steel commodity index rates), import tariffs, and logistics freight indexes.
          </p>
          <p>
            Formal written commercial quotations issued by Cobolt Machineries remain valid for the duration explicitly stated on the quotation document (typically 15 to 30 calendar days). Unless explicitly indicated otherwise in writing, quoted prices exclude applicable Goods and Services Tax (GST), transit insurance, loading/unloading machinery charges, and interstate transportation freight, which are invoiced separately on the proforma invoice.
          </p>
        </section>

        <section id="order-confirmation" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            4. Order Confirmation &amp; Booking
          </h2>
          <p>
            An order is deemed officially confirmed only upon receipt of:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>A signed commercial quotation, written purchase order, or digital order booking confirmation; and</li>
            <li>Receipt and clearance of the agreed advance payment in Cobolt Machineries&apos; designated bank account.</li>
          </ul>
          <p>
            Verbal discussions, unconfirmed WhatsApp chats, or preliminary quotation requests do not constitute a confirmed contract or bind Cobolt Machineries to equipment delivery schedules.
          </p>
        </section>

        <section id="payment-terms" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            5. Payment Terms
          </h2>
          <p>
            Standard payment arrangements for equipment orders require an initial commitment advance upon order booking, with the remaining balance cleared prior to dispatch from our facility or as explicitly structured in the approved proforma invoice.
          </p>
          <p>
            Accepted payment methods include direct RTGS, NEFT, IMPS bank transfers to our verified current accounts, official corporate UPI IDs, or authorized third-party digital gateways. Equipment remains the exclusive legal property of Cobolt Machineries until all invoiced amounts, applicable taxes, and transportation charges are paid in full.
          </p>
        </section>

        <section id="availability-lead-times" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            6. Product Availability &amp; Lead Times
          </h2>
          <p>
            Standard catalog items in stock are typically processed for dispatch within 2 to 4 business days following full payment verification. Non-stock machinery, imported specialized lines, and custom-fabricated items are subject to specific manufacturing lead times communicated during quotation.
          </p>
          <p>
            Stated lead times are estimates made in good faith and depend on raw material availability, utility component imports, and transport schedules. Cobolt Machineries will notify the customer promptly of any unforeseen delays in production schedules.
          </p>
        </section>

        <section id="custom-machinery-orders" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            7. Custom Fabrication &amp; Bespoke Orders
          </h2>
          <p>
            Custom stainless steel fabrication (including custom kitchen counters, exhaust hoods, sinks, and specialized food processing machinery) is engineered strictly according to approved 2D/3D CAD drawings, work orders, or signed specification sheets.
          </p>
          <p>
            <strong>Customer Sign-Off Requirement:</strong> Once the customer signs off on custom CAD drawings or specifications and raw materials are laser-cut or fabricated, no design modifications, dimension alterations, or cancellations can be accommodated without the customer agreeing to cover all additional engineering, scrap material, and labor expenses incurred.
          </p>
        </section>

        <section id="installation-service" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            8. Installation &amp; Technical Services
          </h2>
          <p>
            Where on-site installation, commissioning, or Annual Maintenance Contract (AMC) visits are contracted, service appointments are scheduled mutually between the customer and our engineering dispatch desk.
          </p>
          <p>
            Cobolt Machineries technicians provide mechanical assembly, leveling, alignment, and basic operational demonstration. Unless explicitly included in the written scope of work, civil masonry, external plumbing lines, building exhaust masonry cutting, main electrical distribution boards, and external gas piping are not included and must be arranged by certified local contractors.
          </p>
        </section>

        <section id="customer-responsibilities" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            9. Customer Site Responsibilities
          </h2>
          <p>To ensure safe machinery installation and preserve warranty eligibility, the customer is responsible for:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Providing safe, unobstructed physical site access, doorway clearances, and elevator/stairwell dimensions adequate for heavy commercial equipment.</li>
            <li>Ensuring all electrical supplies match machine specifications (including stable voltage, neutral-to-earth voltage &lt; 3V, suitable MCBs, and certified electrical grounding).</li>
            <li>Providing appropriate water filtration or softening where water-fed equipment (such as combi-ovens, dishwashers, and ice makers) is deployed, to prevent calcium scaling.</li>
            <li>Ensuring designated staff are present for equipment inspection, unloading supervision, and operational handover.</li>
          </ul>
        </section>

        <section id="warranty-support" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            10. Warranty &amp; After-Sales Support
          </h2>
          <p>
            Machinery warranty coverage is governed strictly under our dedicated <a href="/warranty-policy" className="text-[#DE1D3A] underline font-medium">Warranty Policy</a>. Warranty terms, durations, and covered components vary by product category and manufacturer and are detailed on the commercial tax invoice or warranty card.
          </p>
        </section>

        <section id="order-cancellation" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            11. Order Cancellation Terms
          </h2>
          <p>
            Cancellation requests for standard off-the-shelf equipment prior to dispatch are subject to administrative review and deduction of incurred handling, testing, or crating costs. Custom-fabricated stainless steel units and specially imported machines are non-cancellable once production commences or international purchase orders are lodged. For complete details, refer to our <a href="/return-refund-policy" className="text-[#DE1D3A] underline font-medium">Return and Refund Policy</a>.
          </p>
        </section>

        <section id="limitation-of-liability" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            12. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable Indian law, Cobolt Machineries, its directors, officers, employees, and authorized agents shall not be liable for any indirect, incidental, punitive, consequential, or special damages, including lost business profits, loss of food inventory, business interruptions, or culinary downtime arising from the use, inability to use, or delay in delivery or repair of any equipment.
          </p>
          <p>
            In all circumstances, our maximum aggregate liability arising out of or related to any equipment purchase, service contract, or quotation shall not exceed the net purchase price actually paid by the customer for the specific product or service giving rise to the claim.
          </p>
        </section>

        <section id="intellectual-property" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            13. Intellectual Property Rights
          </h2>
          <p>
            All content on the Cobolt Machineries website, including technical diagrams, 3D models, equipment photographs, catalog descriptions, logos, trade names, and engineering schematics, are the proprietary intellectual property of {company.legalName} or licensed partner manufacturers. No content may be reproduced, copied, republished, or commercially distributed without our prior written authorization.
          </p>
        </section>

        <section id="governing-law" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            14. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These Terms, commercial contracts, quotations, and service agreements shall be governed by, construed, and enforced in accordance with the substantive laws of the Republic of India.
          </p>
          <p>
            Any dispute, controversy, or claim arising out of or relating to these Terms or transactions with Cobolt Machineries that cannot be resolved amicably shall be subject to the exclusive jurisdiction of the competent civil courts located in Malappuram / Kerala, India.
          </p>
        </section>

        <section id="contact-information" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            15. Contact Information
          </h2>
          <p>
            For commercial inquiries, quotation verifications, or clarifications regarding these Terms of Service, please write to our legal and commercial desk at{' '}
            <a href={`mailto:${company.email}`} className="text-[#DE1D3A] underline font-medium">
              {company.email}
            </a>{' '}
            or call our customer desk at {company.phoneDisplay}.
          </p>
        </section>
      </PolicyLayout>
    </>
  );
}
