import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbs } from '../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../lib/siteConfig';
import { POLICY_CONFIG } from '../../data/policyConfig';

export const metadata = {
  title: 'Warranty Policy | Cobolt Machineries',
  description:
    'Read the commercial equipment warranty terms, coverage guidelines, claims procedures, and service terms for machinery and fabrication supplied by Cobolt Machineries.',
  alternates: {
    canonical: `${SITE_URL}/warranty-policy`,
  },
  openGraph: {
    title: 'Warranty Policy | Cobolt Machineries',
    description:
      'Commercial machinery warranty guidelines, coverage, claims procedures, and exclusions.',
    url: `${SITE_URL}/warranty-policy`,
    type: 'website',
  },
};

const tocItems = [
  { id: 'warranty-overview', title: 'Warranty Overview & Scope' },
  { id: 'warranty-eligibility', title: 'Warranty Eligibility Criteria' },
  { id: 'warranty-periods', title: 'Warranty Periods by Product' },
  { id: 'covered-defects', title: 'Covered Manufacturing Defects' },
  { id: 'warranty-exclusions', title: 'Warranty Exclusions & Limitations' },
  { id: 'installation-requirements', title: 'Mandatory Electrical & Installation Rules' },
  { id: 'claims-procedure', title: 'How to File a Warranty Claim' },
  { id: 'inspection-verification', title: 'Technical Inspection & Diagnostic Process' },
  { id: 'spare-parts-repair', title: 'Spare Parts Replacement & Repairs' },
  { id: 'manufacturer-warranties', title: 'Third-Party & OEM Equipment Terms' },
  { id: 'out-of-warranty-services', title: 'Out-of-Warranty Service Charges' },
  { id: 'contact-support', title: 'Warranty & Service Helpdesk' },
];

export default function WarrantyPolicyPage() {
  const company = POLICY_CONFIG.company;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Warranty Policy', '/warranty-policy'],
        ])}
      />
      <PolicyLayout
        title="Warranty Policy"
        subtitle="Transparent warranty guidelines, coverage parameters, claims procedures, and service standards for commercial kitchen machinery and stainless steel equipment."
        category="Warranty & Service Assurance"
        toc={tocItems}
      >
        <section id="warranty-overview" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            1. Warranty Overview &amp; Scope
          </h2>
          <p>
            Cobolt Machineries ({company.legalName}) is committed to supplying durable, high-performance commercial kitchen equipment, food processing machinery, bakery appliances, refrigeration units, and custom stainless steel products.
          </p>
          <p>
            We provide warranty support for manufacturing defects in accordance with the specific product, manufacturer warranty terms, signed work order, and commercial tax invoice. Because commercial machinery spans diverse engineering categories—from imported heavy spiral dough mixers to in-house fabricated stainless steel exhaust hoods—warranty terms and coverage periods vary according to the specific equipment purchased.
          </p>
        </section>

        <section id="warranty-eligibility" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            2. Warranty Eligibility Criteria
          </h2>
          <p>To qualify for warranty service, the following conditions must be met:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>The equipment must have been purchased directly through Cobolt Machineries or an authorized regional sales representative.</li>
            <li>The original, legible tax invoice or digital purchase record showing the date of purchase, model number, and machine serial number must be presented upon request.</li>
            <li>The machine&apos;s original serial number plate and technical rating label must remain intact, legible, and untampered.</li>
            <li>The equipment must have been installed and maintained in strict accordance with the operating manual and site utility requirements.</li>
          </ul>
        </section>

        <section id="warranty-periods" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            3. Warranty Periods by Product
          </h2>
          <p>
            <strong>Important Policy Note:</strong> Warranty duration is not universal across all machinery. The exact warranty period applicable to your purchase is explicitly specified on your commercial tax invoice, proforma invoice, or accompanying manufacturer warranty certificate.
          </p>
          <p>As general commercial guidance:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>In-House Manufactured Food Machinery:</strong> Carries structural and drive-motor warranty coverage as detailed in the commercial proposal (typically against motor winding defects and gearbox mechanical failure).</li>
            <li><strong>Commercial Refrigeration &amp; Freezers:</strong> Typically includes compressor-specific warranty coverage subject to manufacturer policy and voltage stabilizer compliance.</li>
            <li><strong>Custom Stainless Steel Fabrication:</strong> Covered against weld seam cracking, structural detachment, and stainless material defects under normal culinary usage.</li>
            <li><strong>Imported Specialized Equipment:</strong> Governed by the respective OEM manufacturer warranty terms and component replacement protocols.</li>
          </ul>
        </section>

        <section id="covered-defects" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            4. Covered Manufacturing Defects
          </h2>
          <p>
            Subject to technical verification, our warranty covers defects in factory materials, component assembly, and workmanship that arise during normal commercial operation within the warranty duration, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Internal motor winding failures not caused by external voltage surges or single-phasing.</li>
            <li>Internal mechanical gearbox failure or factory gear tooth shearing under rated capacities.</li>
            <li>Factory electrical controller, digital thermostat, or timer malfunction resulting from component failure.</li>
            <li>Weld failure or joint separation on custom stainless steel structures fabricated by Cobolt Machineries.</li>
          </ul>
        </section>

        <section id="warranty-exclusions" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            5. Warranty Exclusions &amp; Limitations
          </h2>
          <p>The warranty does not cover damages or failures arising from circumstances outside our manufacturing control, including:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Normal Wear &amp; Tear / Consumables:</strong> Parts naturally subject to wear during operation, including drive belts, rubber door gaskets, cutting blades, shredding discs, scraper pads, oil seals, glass panels, heating lamps, and indicator bulbs.</li>
            <li><strong>Electrical Surges &amp; Phase Fluctuations:</strong> Burnt motors, blown contactors, or fried electronic control boards caused by high/low voltage, voltage spikes, lightning, neutral failure, or absence of suitable voltage stabilizers/phase-preventers.</li>
            <li><strong>Water Hardness &amp; Limescale Build-Up:</strong> Blocked boiler heating elements, scaled solenoids, or pump failures on steam ovens, dishwashers, and ice makers resulting from hard, unsoftened, or unfiltered water.</li>
            <li><strong>Misuse, Overloading &amp; Neglect:</strong> Operating equipment beyond stated hourly capacities, processing unsuitable ingredients (e.g., bones in meat mincers not rated for bone processing), dry running, or poor routine sanitization.</li>
            <li><strong>Unauthorized Repairs &amp; Modifications:</strong> Any attempt to modify, rewire, or repair the machine by unauthorized technicians or using non-OEM parts without Cobolt&apos;s prior written consent immediately voids all warranty.</li>
            <li><strong>Physical &amp; Transit Damage:</strong> External dents, crushed controls, or structural damage occurring during customer transport or on-site handling after receipt.</li>
          </ul>
        </section>

        <section id="installation-requirements" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            6. Mandatory Electrical &amp; Installation Rules
          </h2>
          <p>
            Commercial machinery operates under significant electrical, thermal, and mechanical loads. To preserve warranty validity:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Three-phase 415V machinery must be connected through a dedicated Motor Protection Circuit Breaker (MPCB) or suitable starter with phase-failure protection.</li>
            <li>Single-phase equipment must be connected to an earthed 3-pin commercial power socket with correct rating (16A/20A/32A).</li>
            <li>High-capacity refrigeration equipment and automated baking ovens must be protected by a dedicated digital voltage stabilizer.</li>
          </ul>
        </section>

        <section id="claims-procedure" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            7. How to File a Warranty Claim
          </h2>
          <p>To register a warranty claim, please follow this procedure:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
            <li><strong>Stop Operating:</strong> Discontinue using the machine immediately to prevent further secondary component damage.</li>
            <li><strong>Contact Service Desk:</strong> Email <a href={`mailto:${company.email}`} className="text-[#DE1D3A] underline">{company.email}</a> or call our technical support hotline at {company.phoneDisplay}.</li>
            <li><strong>Submit Required Documentation:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                <li>Tax invoice number and date of purchase.</li>
                <li>Clear photograph of the machine serial plate.</li>
                <li>Detailed description of the operating fault.</li>
                <li>Short video showing the machine condition, electrical panel, and fault symptom.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section id="inspection-verification" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            8. Technical Inspection &amp; Diagnostic Process
          </h2>
          <p>
            Upon receiving your claim, our service engineers will conduct an initial diagnostic evaluation via video or telephone consultation. For issues requiring physical verification, a certified technician will be dispatched to your premises or the component will be recalled to our central service facility in Manjeri for bench testing.
          </p>
          <p>
            If the inspection confirms a genuine manufacturing defect covered under warranty, parts and labor will be provided under warranty terms. If the breakdown is determined to stem from an excluded cause (such as electrical surge, water scaling, or operator error), a formal repair estimate will be shared for customer approval prior to initiating repair work.
          </p>
        </section>

        <section id="spare-parts-repair" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            9. Spare Parts Replacement &amp; Repairs
          </h2>
          <p>
            Under warranty coverage, Cobolt Machineries reserves the right to repair the defective part or replace it with a new or factory-reconditioned genuine OEM component that meets or exceeds original performance specifications. Replaced defective parts become the property of Cobolt Machineries for diagnostic evaluation and manufacturer return.
          </p>
        </section>

        <section id="manufacturer-warranties" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            10. Third-Party &amp; OEM Equipment Terms
          </h2>
          <p>
            For equipment sourced from third-party domestic or international manufacturers (such as specialized imported ovens, brand-name spiral mixers, or commercial ice makers), the original manufacturer&apos;s warranty terms and turnaround protocols apply. Cobolt Machineries acts as your authorized service liaison to expedite claims and arrange OEM parts.
          </p>
        </section>

        <section id="out-of-warranty-services" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            11. Out-of-Warranty Service Charges
          </h2>
          <p>
            For equipment beyond the warranty expiration date, or where damages stem from excluded causes, services are provided at standard commercial service rates. Charges may include a nominal diagnostic site visit fee, technician labor charges, and actual spare parts costs. Clients are also encouraged to enroll in our <a href="/services/amc" className="text-[#DE1D3A] underline font-medium">Annual Maintenance Contracts (AMC)</a> for discounted parts, preventive care, and prioritized emergency callouts.
          </p>
        </section>

        <section id="contact-support" className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
            12. Warranty &amp; Service Helpdesk
          </h2>
          <p>
            For all warranty registrations, service dispatch inquiries, or technical assistance, please reach our dedicated technical desk:
          </p>
          <p className="text-gray-700">
            <strong>Service Hotline:</strong>{' '}
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
