import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbs } from '../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../lib/siteConfig';
import { POLICY_CONFIG } from '../../data/policyConfig';

export const metadata = {
  title: 'Return and Refund Policy | Cobolt Machineries',
  description:
    'Review the return, refund, and cancellation policies for commercial food machinery, custom stainless steel fabrication, and engineering services at Cobolt Machineries.',
  alternates: {
    canonical: `${SITE_URL}/return-refund-policy`,
  },
  openGraph: {
    title: 'Return and Refund Policy | Cobolt Machineries',
    description:
      'Commercial equipment return eligibility, refund processes, custom order restrictions, and claims guidelines.',
    url: `${SITE_URL}/return-refund-policy`,
    type: 'website',
  },
};

const tocItems = [
  { id: 'return-overview', title: 'Overview & Commercial Scope' },
  { id: 'damaged-incorrect-deliveries', title: 'Damaged or Incorrect Deliveries' },
  { id: 'reporting-procedure', title: 'Reporting an Issue & Required Proof' },
  { id: 'return-authorization', title: 'Return Authorization (RMA) Requirement' },
  { id: 'custom-equipment-rules', title: 'Custom-Fabricated Equipment Exclusions' },
  { id: 'installed-used-machinery', title: 'Installed & Used Machinery Policy' },
  { id: 'order-cancellations', title: 'Order Cancellation Guidelines' },
  { id: 'refund-processing', title: 'Refund Processing, Methods & Timelines' },
  { id: 'service-cancellations', title: 'Service & Consultation Cancellations' },
  { id: 'statutory-rights', title: 'Statutory Consumer Rights' },
  { id: 'contact-helpdesk', title: 'Customer Support & Inquiries' },
];

export default function ReturnRefundPolicyPage() {
  const company = POLICY_CONFIG.company;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Return and Refund Policy', '/return-refund-policy'],
        ])}
      />
      <PolicyLayout
        title="Return and Refund Policy"
        subtitle="Transparent policies governing commercial equipment returns, transit damage resolutions, custom fabrication restrictions, and refund processing."
        category="Commercial Returns & Refunds"
        toc={tocItems}
      >
        <section id="return-overview" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            1. Overview &amp; Commercial Scope
          </h2>
          <p>
            Cobolt Machineries ({company.legalName}) designs, builds, and distributes heavy commercial culinary machinery, stainless steel kitchen fabrication, and specialized food processing systems. Because commercial machinery involves substantial physical mass, high transportation costs, and customized electrical and structural engineering, our return and refund procedures reflect the commercial nature of these transactions while upholding fair and transparent customer service.
          </p>
          <p>
            We aim to resolve all legitimate product concerns fairly and expeditiously, ensuring our customers receive equipment that fully meets verified order specifications.
          </p>
        </section>

        <section id="damaged-incorrect-deliveries" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            2. Damaged or Incorrect Deliveries
          </h2>
          <p>
            When machinery is delivered by our authorized logistics partner or dedicated transport carrier, the receiving customer must inspect the external wooden crates, protective wrapping, and equipment condition prior to signing the carrier&apos;s Proof of Delivery (POD) or consignment note.
          </p>
          <p>
            <strong>Mandatory 48-Hour Reporting Window:</strong> If you receive an item that exhibits physical transit damage, or if the model delivered differs from the model confirmed on your approved tax invoice/proforma invoice, you must note the discrepancy on the carrier&apos;s delivery slip and notify Cobolt Machineries in writing within <strong>48 hours of physical delivery</strong>.
          </p>
        </section>

        <section id="reporting-procedure" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            3. Reporting an Issue &amp; Required Proof
          </h2>
          <p>To report an issue regarding damaged or incorrect goods, email our support desk at <a href={`mailto:${company.email}`} className="text-[#DE1D3A] underline font-medium">{company.email}</a> with the following details:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Tax Invoice Number and Date of Delivery.</li>
            <li>Copy of the transport consignment receipt (LR/Bilty/POD) showing damage remarks.</li>
            <li>Clear, well-lit photographs and video showing the external crating damage, shipping label, machine rating plate (serial number), and the specific damaged component.</li>
            <li>A concise description of the functional or structural defect identified.</li>
          </ul>
          <p>
            These records are vital for transit insurance claims and swift resolution. Failure to report visible external transit damages within 48 hours of delivery may impair transit insurance coverage.
          </p>
        </section>

        <section id="return-authorization" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            4. Return Authorization (RMA) Requirement
          </h2>
          <p>
            No equipment will be accepted for return or refund without a formal written <strong>Return Merchandise Authorization (RMA)</strong> issued by Cobolt Machineries management. Any unauthorized shipment sent to our factory or warehouse will be refused at the unloading dock at the sender&apos;s sole expense.
          </p>
          <p>
            Where an authorized return is approved, the equipment must be securely packed in its original wooden crate or equivalent heavy-duty protective crating to prevent transit damage during return transport.
          </p>
        </section>

        <section id="custom-equipment-rules" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            5. Custom-Fabricated Equipment Exclusions
          </h2>
          <p>
            <strong>Strict Commercial Rule:</strong> Custom-fabricated stainless steel items (including bespoke kitchen worktables, custom sinks, under-counter refrigeration, custom exhaust canopies, and specialized production machinery built to customer dimensional specifications) are manufactured strictly on order following approved CAD drawings or signed work orders.
          </p>
          <p>
            Subject to applicable statutory law, custom-fabricated and bespoke machinery is <strong>non-returnable and non-refundable</strong> once material cutting or fabrication has commenced, or once delivery is accepted at your site, unless the item exhibits a verified manufacturing defect that cannot be rectified by our engineering team under our <a href="/warranty-policy" className="text-[#DE1D3A] underline font-medium">Warranty Policy</a>.
          </p>
        </section>

        <section id="installed-used-machinery" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            6. Installed &amp; Used Machinery Policy
          </h2>
          <p>
            Commercial machinery that has been physically installed, anchored, plumbed into water or gas lines, hardwired to electrical panels, or operated with food ingredients, cooking oils, or dough cannot be returned for change of mind, spatial miscalculations, or business closure. Any performance issues identified after commissioning are resolved under our on-site technical warranty and service protocols.
          </p>
        </section>

        <section id="order-cancellations" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            7. Order Cancellation Guidelines
          </h2>
          <p>Order cancellation terms depend on the nature of the machinery:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Standard In-Stock Machinery (Prior to Dispatch):</strong> If an order for standard catalog equipment is cancelled before crate loading and freight dispatch, a refund will be issued subject to a nominal administrative and banking charge.</li>
            <li><strong>Standard Machinery (After Dispatch):</strong> If cancellation is requested after equipment has been handed over to the transport carrier, the customer will be responsible for actual outward and return freight costs, transit insurance, and a restocking fee of up to 15%.</li>
            <li><strong>Custom &amp; Specially Imported Equipment:</strong> Cannot be cancelled once fabrication has started or international procurement orders have been committed.</li>
          </ul>
        </section>

        <section id="refund-processing" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            8. Refund Processing, Methods &amp; Timelines
          </h2>
          <p>
            Once an authorized returned machine arrives at our Manjeri central facility, our quality control engineers conduct a comprehensive bench inspection to verify component completeness, serial number matching, and absence of customer-induced damage.
          </p>
          <p>
            <strong>Refund Timeline:</strong> Upon successful inspection approval, refunds are processed within <strong>7 to 10 business days</strong>. Refunds are issued directly to the customer&apos;s verified original bank account via NEFT/RTGS bank transfer or reversed through the original digital payment gateway. No cash refunds are issued.
          </p>
        </section>

        <section id="service-cancellations" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            9. Service &amp; Consultation Cancellations
          </h2>
          <p>
            For engineering consultation visits, layout assessments, or scheduled technician appointments, cancellation or rescheduling requests must be submitted at least <strong>24 hours prior</strong> to the scheduled site visit. Advance service booking fees are refundable or creditable toward rescheduled dates when timely notice is provided.
          </p>
        </section>

        <section id="statutory-rights" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            10. Statutory Consumer Rights
          </h2>
          <p>
            Nothing in this Return and Refund Policy is intended to limit, modify, or exclude any non-waivable statutory rights or remedies available to eligible consumers under the Consumer Protection Act, 2019, or other applicable Indian statutory enactments for products that are defective, damaged, or misdescribed.
          </p>
        </section>

        <section id="contact-helpdesk" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            11. Customer Support &amp; Inquiries
          </h2>
          <p>
            To discuss an order, report a delivery issue, or request Return Authorization, please contact our commercial desk:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> <a href={`mailto:${company.email}`} className="text-[#DE1D3A] font-semibold underline">{company.email}</a> |{' '}
            <strong>Phone:</strong> <a href={`tel:${company.phone}`} className="text-[#DE1D3A] font-semibold underline">{company.phoneDisplay}</a>
          </p>
        </section>
      </PolicyLayout>
    </>
  );
}
