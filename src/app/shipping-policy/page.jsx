import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbs } from '../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../lib/siteConfig';
import { POLICY_CONFIG } from '../../data/policyConfig';

export const metadata = {
  title: 'Shipping Policy | Cobolt Machineries',
  description:
    'Learn about our freight shipping procedures, heavy machinery transport, delivery coverage across Kerala and India, and unloading guidelines at Cobolt Machineries.',
  alternates: {
    canonical: `${SITE_URL}/shipping-policy`,
  },
  openGraph: {
    title: 'Shipping Policy | Cobolt Machineries',
    description:
      'Commercial machinery freight logistics, delivery coverage, and unloading guidelines.',
    url: `${SITE_URL}/shipping-policy`,
    type: 'website',
  },
};

const tocItems = [
  { id: 'shipping-overview', title: 'Shipping Overview & Logistics' },
  { id: 'delivery-coverage', title: 'Delivery Coverage Areas' },
  { id: 'order-processing-times', title: 'Order Processing & Dispatch Timelines' },
  { id: 'freight-shipping-charges', title: 'Freight & Transportation Charges' },
  { id: 'transit-estimates', title: 'Estimated Transit Schedules' },
  { id: 'heavy-machinery-transport', title: 'Heavy Machinery Freight Packaging' },
  { id: 'address-accuracy', title: 'Delivery Address & Contact Accuracy' },
  { id: 'unloading-responsibilities', title: 'Loading & Unloading Responsibilities' },
  { id: 'transit-damage-protocol', title: 'Transit Damage Inspection Protocol' },
  { id: 'logistics-delays', title: 'Unforeseen Logistics Delays' },
  { id: 'installation-coordination', title: 'Delivery & Technician Coordination' },
  { id: 'international-shipping', title: 'International Export Shipments' },
  { id: 'contact-logistics', title: 'Logistics Helpdesk' },
];

export default function ShippingPolicyPage() {
  const company = POLICY_CONFIG.company;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Shipping Policy', '/shipping-policy'],
        ])}
      />
      <PolicyLayout
        title="Shipping Policy"
        subtitle="Freight logistics, heavy equipment handling, regional delivery coverage, transit insurance, and unloading responsibilities for commercial kitchen machinery."
        category="Logistics & Delivery"
        toc={tocItems}
      >
        <section id="shipping-overview" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            1. Shipping Overview &amp; Logistics
          </h2>
          <p>
            Cobolt Machineries ({company.legalName}) arranges delivery for heavy commercial kitchen appliances, bakery machinery, refrigeration cabinets, and custom stainless steel fabrication across Kerala, South India, and pan-India destinations.
          </p>
          <p>
            Unlike small consumer packages, commercial food machinery involves significant physical dimensions, substantial tonnage, precision mechanical alignment, and fragile internal refrigeration circuits or thermal elements. Consequently, transportation is handled through vetted freight logistics carriers, dedicated transport vehicles, or specialized machinery trucks.
          </p>
        </section>

        <section id="delivery-coverage" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            2. Delivery Coverage Areas
          </h2>
          <p>We deliver across three primary geographic tiers:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Kerala (Intra-State):</strong> Daily delivery service across all 14 districts through regional transport carriers and dedicated company vehicles from our Manjeri central facility.</li>
            <li><strong>South India &amp; Interstate Pan-India:</strong> Regular freight dispatches to Tamil Nadu, Karnataka, Telangana, Andhra Pradesh, Maharashtra, and other commercial centers via registered national logistics transport companies.</li>
            <li><strong>International Export:</strong> Available for select overseas markets (including the Middle East and GCC countries) subject to specific export documentation, commercial terms (FOB/CIF/EXW), and containerized freight booking.</li>
          </ul>
        </section>

        <section id="order-processing-times" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            3. Order Processing &amp; Dispatch Timelines
          </h2>
          <p>Order dispatch timelines depend on product categorization and stock status:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>In-Stock Standard Equipment:</strong> Typically inspected, bench-tested, crated, and dispatched within <strong>2 to 4 business days</strong> following full payment confirmation.</li>
            <li><strong>Custom Stainless Steel Fabrication:</strong> Fabrication lead times range from <strong>10 to 25 business days</strong> depending on project complexity, CAD sign-off, and production queue.</li>
            <li><strong>Specially Imported Machinery:</strong> Subject to international maritime/air shipping schedules, customs clearance, and port handling (lead times confirmed during quotation).</li>
          </ul>
        </section>

        <section id="freight-shipping-charges" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            4. Freight &amp; Transportation Charges
          </h2>
          <p>
            <strong>Transparent Commercial Billing:</strong> Unless explicitly noted as inclusive on a signed contract or formal project package, freight and transportation charges are calculated separately and shown transparently on the proforma invoice.
          </p>
          <p>
            Shipping costs depend on shipment gross weight, volumetric dimensions (cubic feet), delivery pin code, toll permits, and local octroi/entry clearances where applicable. We do not apply hidden surcharges; customers may opt to pay freight directly to the transport carrier on a &quot;To-Pay&quot; basis or pre-pay freight as itemized on the commercial invoice.
          </p>
        </section>

        <section id="transit-estimates" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            5. Estimated Transit Schedules
          </h2>
          <p>Estimated transit times from the date of carrier handover are:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Major Kerala Commercial Centers:</strong> 1 to 3 business days.</li>
            <li><strong>Remote / High-Range Kerala Locations:</strong> 2 to 4 business days.</li>
            <li><strong>South India Major Metros (Bengaluru, Chennai, Coimbatore):</strong> 3 to 6 business days.</li>
            <li><strong>Rest of India:</strong> 6 to 12 business days depending on carrier route.</li>
          </ul>
          <p className="text-xs text-gray-500">
            *Transit schedules are estimates provided by freight carriers and may vary due to highway conditions, state border checkpoints, regional transport strikes, or weather events.
          </p>
        </section>

        <section id="heavy-machinery-transport" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            6. Heavy Machinery Freight Packaging
          </h2>
          <p>
            Every machine dispatched from Cobolt Machineries is prepared for industrial transit:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Equipment is anchored to heavy-duty wooden pallet bases to facilitate forklift and pallet-truck movement.</li>
            <li>Stainless steel surfaces are coated with protective adhesive film to prevent scratch abrasions during handling.</li>
            <li>Enclosed wooden crating or reinforced structural framing is applied to protect sensitive motors, control switches, and sheet metal corners.</li>
          </ul>
        </section>

        <section id="address-accuracy" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            7. Delivery Address &amp; Contact Accuracy
          </h2>
          <p>
            The customer is responsible for providing a complete, accurate delivery address with verifiable landmarks, correct postal pin code, and the direct contact numbers of the on-site receiving manager. Deliveries to inaccessible narrow alleys or pedestrian-only zones must be flagged in advance so transshipment can be planned.
          </p>
        </section>

        <section id="unloading-responsibilities" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            8. Loading &amp; Unloading Responsibilities
          </h2>
          <p>
            <strong>Crucial Delivery Policy:</strong> Standard commercial freight delivery is <strong>curbside / ground-level transport dock delivery</strong>.
          </p>
          <p>
            The transport vehicle driver is responsible for safe transit to the destination entrance. Offloading heavy equipment from the truck bed, maneuvering machines through doorways, stair carrying, upper-floor hoisting, and internal kitchen positioning are the <strong>customer&apos;s sole responsibility</strong>, unless turnkey installation and rigging services were explicitly contracted and billed in writing. Customers must ensure adequate manual labor, forklifts, or hydraulic pallet jacks are available at their site on delivery day.
          </p>
        </section>

        <section id="transit-damage-protocol" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            9. Transit Damage Inspection Protocol
          </h2>
          <p>
            Prior to signing the transport carrier&apos;s Proof of Delivery (POD) or Lorry Receipt (LR):
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
            <li>Inspect the external crate for visible breakage, punctures, or signs of inversion.</li>
            <li>If external damage is observed, record a written remark on the driver&apos;s copy of the consignment note (e.g., &quot;Crate received in damaged condition&quot;) before signing.</li>
            <li>Take clear photographs of the crated condition before uncrating.</li>
            <li>Notify Cobolt Machineries within <strong>48 hours</strong> with photographs and the LR copy to initiate transit insurance claims.</li>
          </ol>
        </section>

        <section id="logistics-delays" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            10. Unforeseen Logistics Delays
          </h2>
          <p>
            While we coordinate with reputable logistics carriers, Cobolt Machineries shall not be liable for delivery delays caused by force majeure events, severe weather conditions, national or state holidays, road blockages, natural disasters, or statutory vehicle inspections.
          </p>
        </section>

        <section id="installation-coordination" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            11. Delivery &amp; Technician Coordination
          </h2>
          <p>
            For equipment purchased with installation services, customer site readiness (plumbing, 3-phase/single-phase electrical sockets, gas line points, and exhaust masonry) must be confirmed with our engineering desk prior to machinery arrival. Service technicians are dispatched in coordination with equipment delivery to minimize kitchen downtime.
          </p>
        </section>

        <section id="international-shipping" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            12. International Export Shipments
          </h2>
          <p>
            For export orders shipped outside India, shipments are governed by international commercial terms (Incoterms 2020) agreed in writing. Customers are responsible for destination customs duties, import VAT/GST, and local port clearance unless a specific DDP (Delivered Duty Paid) contract was executed.
          </p>
        </section>

        <section id="contact-logistics" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            13. Logistics Helpdesk
          </h2>
          <p>
            For shipment tracking, transport dispatch status, or logistics queries, please contact our dispatch desk:
          </p>
          <p className="text-gray-700">
            <strong>Logistics Email:</strong> <a href={`mailto:${company.email}`} className="text-[#DE1D3A] font-semibold underline">{company.email}</a> |{' '}
            <strong>Phone:</strong> <a href={`tel:${company.phone}`} className="text-[#DE1D3A] font-semibold underline">{company.phoneDisplay}</a>
          </p>
        </section>
      </PolicyLayout>
    </>
  );
}
