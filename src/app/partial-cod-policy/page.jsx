import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbs } from '../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../lib/siteConfig';
import { POLICY_CONFIG } from '../../data/policyConfig';

export const metadata = {
  title: 'Partial COD Policy | Cobolt Machineries',
  description:
    'Understand our Partial Cash on Delivery (Partial COD) guidelines, advance payment requirements, balance collection, and eligibility for commercial machinery orders.',
  alternates: {
    canonical: `${SITE_URL}/partial-cod-policy`,
  },
  openGraph: {
    title: 'Partial COD Policy | Cobolt Machineries',
    description:
      'Commercial machinery Partial COD guidelines, advance deposit requirements, and payment terms.',
    url: `${SITE_URL}/partial-cod-policy`,
    type: 'website',
  },
};

const tocItems = [
  { id: 'what-is-partial-cod', title: 'What Is Partial COD?' },
  { id: 'eligibility-criteria', title: 'Order & Location Eligibility' },
  { id: 'advance-payment-rules', title: 'Advance Payment Requirements' },
  { id: 'balance-collection', title: 'Remaining Balance Collection' },
  { id: 'accepted-payment-modes', title: 'Accepted Payment Methods & Cash Limits' },
  { id: 'order-confirmation-process', title: 'Order Confirmation Process' },
  { id: 'custom-machinery-exclusions', title: 'Customized & Bespoke Machinery Restrictions' },
  { id: 'cancellation-advance-refunds', title: 'Order Cancellation & Advance Refund Terms' },
  { id: 'failed-delivery-refusal', title: 'Failed Delivery & Consignment Refusal' },
  { id: 'payment-receipts-invoicing', title: 'Tax Invoices & Official Payment Receipts' },
  { id: 'contact-sales-desk', title: 'Commercial Sales Helpdesk' },
];

export default function PartialCodPolicyPage() {
  const company = POLICY_CONFIG.company;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Partial COD Policy', '/partial-cod-policy'],
        ])}
      />
      <PolicyLayout
        title="Partial COD Policy"
        subtitle="Terms and conditions governing Partial Cash on Delivery arrangements, advance security deposits, balance collections, and commercial equipment eligibility."
        category="Payment & Commercial Policies"
        toc={tocItems}
      >
        <section id="what-is-partial-cod" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            1. What Is Partial COD?
          </h2>
          <p>
            <strong>Partial Cash on Delivery (Partial COD)</strong> is a structured payment arrangement where a customer pays a defined commitment advance upon placing an equipment order, and the remaining invoice balance is cleared upon delivery or immediately prior to crate unloading at the customer&apos;s site.
          </p>
          <p>
            Because commercial culinary machinery involves heavy manufacturing, specialized crating, and high freight expenses, full Cash on Delivery (0% advance) is not commercially viable. The Partial COD arrangement offers customers mutual confidence while protecting both parties against frivolous bookings, uncoordinated consignments, and transport demurrage.
          </p>
          <p className="bg-amber-50 border-l-4 border-amber-400 p-3.5 text-xs text-amber-900 rounded-r-md">
            <strong>Operational Availability Notice:</strong> Partial COD is not an automatic payment option for all products. It is available strictly on a case-by-case basis for eligible standard equipment, subject to management approval, delivery pin code verification, and transport carrier capabilities.
          </p>
        </section>

        <section id="eligibility-criteria" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            2. Order &amp; Location Eligibility
          </h2>
          <p>Partial COD may be extended only when all the following criteria are met:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>The equipment is a standard, in-stock catalog model (such as standard spiral mixers, planetary mixers, tabletop cutters, or commercial fryers).</li>
            <li>The delivery destination is located within a verified regional transport hub or direct carrier-serviceable pin code in Kerala or select South Indian districts.</li>
            <li>The customer provides verified business credentials (business registration, GSTIN, or verifiable shop commercial address).</li>
            <li>The total order invoice value falls within approved freight carrier COD handling thresholds.</li>
          </ul>
        </section>

        <section id="advance-payment-rules" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            3. Advance Payment Requirements
          </h2>
          <p>
            An advance payment is mandatory to confirm any Partial COD order. The advance covers pre-dispatch testing, industrial crating, palletizing, insurance, and outward/return freight commitment.
          </p>
          <p>
            The exact advance amount is communicated and itemized in writing on your formal proforma invoice. Work orders, crate building, and carrier bookings commence strictly upon confirmation of advance credit in Cobolt Machineries&apos; bank account.
          </p>
        </section>

        <section id="balance-collection" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            4. Remaining Balance Collection
          </h2>
          <p>
            The remaining balance must be paid in full <strong>upon arrival of the transport vehicle</strong> and prior to offloading and uncrating the equipment at the customer&apos;s commercial premises.
          </p>
          <p>
            Drivers and logistics personnel are instructed not to release machinery crates or hand over original manufacturer warranty documentation until balance payment verification has been confirmed by Cobolt Machineries&apos; accounts desk.
          </p>
        </section>

        <section id="accepted-payment-modes" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            5. Accepted Payment Methods &amp; Cash Limits
          </h2>
          <p>To ensure security and commercial compliance, payments are handled as follows:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Advance Payments:</strong> Accepted via instant UPI (Google Pay, PhonePe, Paytm Business), NEFT/RTGS/IMPS bank transfer, or authorized digital payment link.</li>
            <li><strong>Balance Payments on Delivery:</strong> Digital modes (verified UPI, instant IMPS, or net banking transfer) are strongly preferred.</li>
            <li><strong>Statutory Indian Cash Transaction Limit:</strong> In strict compliance with <strong>Section 269ST of the Income Tax Act, 1961</strong>, Cobolt Machineries does not accept cash payments of ₹2,00,000 (Two Lakhs Rupees) or more from any single purchaser in a single day or with respect to a single commercial invoice. Orders exceeding statutory cash limits must be cleared through digital banking channels.</li>
          </ul>
        </section>

        <section id="order-confirmation-process" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            6. Order Confirmation Process
          </h2>
          <p>
            A Partial COD order is confirmed only after:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
            <li>Customer accepts the formal proforma invoice detailing equipment specifications, advance deposit, and balance payable.</li>
            <li>The advance amount is received in Cobolt Machineries&apos; bank account.</li>
            <li>Our dispatch desk verifies customer site contact details, delivery address, and receiving coordinator availability.</li>
          </ol>
        </section>

        <section id="custom-machinery-exclusions" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            7. Customized &amp; Bespoke Machinery Restrictions
          </h2>
          <p>
            <strong>Strict Commercial Exclusion:</strong> Partial COD is <strong>NOT available</strong> under any circumstances for:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Custom-fabricated stainless steel items (custom prep tables, sinks, customized exhaust hoods, counters).</li>
            <li>Bespoke food processing machinery engineered to unique customer recipe specifications.</li>
            <li>Specially imported international equipment requiring foreign exchange advance commitments.</li>
          </ul>
          <p>
            Custom fabrication projects operate strictly under milestone-based advance payments as stipulated in the formal engineering quotation.
          </p>
        </section>

        <section id="cancellation-advance-refunds" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            8. Order Cancellation &amp; Advance Refund Terms
          </h2>
          <p>
            Because an advance deposit commits specific machines, technician bench-testing, and freight logistics:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Cancellation Prior to Dispatch:</strong> If a customer cancels a Partial COD order before crating and vehicle loading, the advance is refundable subject to a deduction of administrative, banking, and inspection charges.</li>
            <li><strong>Cancellation After Dispatch:</strong> If an order is cancelled after the machine has been loaded on a transport carrier or while in transit, the actual round-trip freight charges, carrier demurrage, transit insurance, and a 15% restocking fee will be deducted from the advance deposit.</li>
            <li><strong>Full Advance Refund Guarantee:</strong> If Cobolt Machineries is unable to dispatch the confirmed machinery within the agreed timeline due to unforeseen supply constraints, the advance deposit will be refunded 100% within 5 to 7 business days.</li>
          </ul>
        </section>

        <section id="failed-delivery-refusal" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            9. Failed Delivery &amp; Consignment Refusal
          </h2>
          <p>
            If a customer is unreachable, refuses to accept delivery without valid verified reason, or is unable to provide the remaining balance payment upon carrier arrival:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>The transport carrier will hold the machinery at their local hub for a maximum of 24 hours (warehouse demurrage fees may apply).</li>
            <li>If payment is not completed within 24 hours, the consignment will be recalled to our central facility.</li>
            <li>All incurred two-way transportation freight, carrier handling, crate damage, and restocking expenses will be forfeited from the customer&apos;s advance payment.</li>
          </ul>
        </section>

        <section id="payment-receipts-invoicing" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            10. Tax Invoices &amp; Official Payment Receipts
          </h2>
          <p>
            Cobolt Machineries provides complete corporate tax documentation for every transaction:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>An official Advance Receipt Voucher is issued upon clearance of the advance deposit.</li>
            <li>A GST-compliant Commercial Tax Invoice is issued for the full value of the machinery and transport upon final balance clearance.</li>
            <li>Physical copies of the tax invoice, e-way bill, delivery challan, and manufacturer warranty documents accompany the machine crate or are transmitted digitally to the customer&apos;s registered email.</li>
          </ul>
        </section>

        <section id="contact-sales-desk" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            11. Commercial Sales Helpdesk
          </h2>
          <p>
            To verify whether your order qualifies for Partial COD or to request a customized commercial quotation, please speak with our sales desk:
          </p>
          <p className="text-gray-700">
            <strong>Sales &amp; Accounts Desk:</strong>{' '}
            <a href={`tel:${company.phone}`} className="text-[#DE1D3A] font-semibold underline">
              {company.phoneDisplay}
            </a>{' '}
            | <strong>Email:</strong>{' '}
            <a href={`mailto:${company.email}`} className="text-[#DE1D3A] font-semibold underline">
              {company.email}
            </a>
          </p>
        </section>
      </PolicyLayout>
    </>
  );
}
