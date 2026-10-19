import service1 from '../assets/service1.webp';
import service2 from '../assets/service2.webp';
import service3 from '../assets/service3.webp';
import service4 from '../assets/service4.webp';
import service5 from '../assets/service5.webp';
import service6 from '../assets/service6.webp';

export const servicesList = [
  {
    id: 'steel-fabrication',
    aliases: ['installation', 'steel-fabrication'],
    title: 'Steel Fabrication',
    tagline: 'Custom stainless steel equipment engineered for commercial culinary excellence.',
    badge: 'Food-Grade SUS 304 / 316',
    image: service1,
    description:
      'Experience the pinnacle of commercial kitchen innovation with our precision stainless steel fabrication. Impeccably crafted food-safe stainless steel equipment, tailored to elevate your culinary space with unmatched hygiene, structural strength, and ergonomic workflow.',
    detailedDescription: [
      'At Cobolt Machineries, our steel fabrication division delivers custom-engineered stainless steel equipment tailored to the rigorous demands of commercial kitchens, bakeries, hotels, and food processing facilities across Kerala and South India.',
      'We exclusively work with heavy-gauge, certified food-grade SUS 304 and SUS 316 stainless steel. Every worktable, preparation sink, exhaust hood, storage rack, and hot line station is precision cut using CNC fiber laser systems, bent with CNC press brakes, and welded by certified TIG/MIG craftsmen.',
      'All weld seams are ground smooth and finished with a sanitary satin polish that prevents bacterial accumulation, facilitates effortless sanitization, and withstands harsh alkaline detergents, extreme heat, and heavy daily impacts.'
    ],
    points: [
      'Custom kitchen layout planning and 3D modeling',
      'High-grade food-safe 304/316 stainless steel fabrication',
      'Seamless TIG/MIG welding and sanitary satin finish polishing',
      'Precision on-site installation and laser mechanical alignment',
      'Custom exhaust hoods, grease capture ducts, and ventilation ducting',
      'Heavy-duty prep tables, undershelves, sink units, and storage shelving'
    ],
    specifications: [
      { label: 'Primary Materials', value: 'AISI 304 & 316 Food-Grade Stainless Steel' },
      { label: 'Sheet Thickness', value: '1.2 mm to 3.0 mm (Heavy Commercial Gauge)' },
      { label: 'Welding Standard', value: 'Purged Sanitary TIG / Pulsed MIG' },
      { label: 'Surface Finish', value: 'No. 4 Satin Brush Finish (Ra < 0.8 µm)' },
      { label: 'Engineering Design', value: '3D CAD Modeling & Ergonomic Kitchen Flow' },
      { label: 'Installation', value: 'On-Site Mechanical Alignment & Anchoring' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Site Survey & Layout Consultation',
        desc: 'Our senior mechanical engineers visit your site to record precise spatial measurements, utility entry points, and culinary workflow requirements.'
      },
      {
        step: '02',
        title: '3D CAD Modeling & Engineering Drawings',
        desc: 'We draft realistic 3D CAD kitchen layouts and mechanical schematics for your approval before material procurement.'
      },
      {
        step: '03',
        title: 'Precision CNC Fabrication & Polishing',
        desc: 'Laser-cut sheets are folded, fixture-welded, and hand-polished to sanitary standards in our Manjeri manufacturing facility.'
      },
      {
        step: '04',
        title: 'On-Site Delivery & Turnkey Installation',
        desc: 'Our deployment technicians install, level, anchor, and test every piece of equipment for immediate kitchen commissioning.'
      }
    ],
    suitableFor: [
      'Commercial Restaurants & Cafés',
      '5-Star Hotels & Luxury Resorts',
      'Centralized Cloud Kitchens',
      'Industrial Bakeries & Confectioneries',
      'Hospital & Institutional Canteens'
    ]
  },
  {
    id: 'import-export',
    aliases: ['import-export'],
    title: 'Import & Export',
    tagline: 'Connecting businesses to global commercial machinery markets with confidence.',
    badge: 'Global Supply Chain & Logistics',
    image: service2,
    description:
      'Our import and export services streamline cross-border machinery procurement while ensuring regulatory compliance, rapid customs clearance, and cost efficiency. We connect you directly with leading global manufacturers of commercial food machinery.',
    detailedDescription: [
      'Navigating international machinery trade requires specialized logistics, customs expertise, and strict quality verification. Cobolt Machineries bridges the gap between top global machinery manufacturers and local industrial operators in India.',
      'We manage end-to-end international procurement for high-output planetary mixers, deck ovens, computerized fryers, dough sheeters, and food processing lines from premier manufacturing hubs in Europe, Taiwan, and Asia.',
      'Our dedicated import-export team oversees compliance documentation, customs duties, port clearance, sea/air cargo handling, and insured multi-modal transport straight to your doorstep.'
    ],
    points: [
      'Worldwide machinery sourcing and vetted supplier management',
      'Comprehensive customs compliance and regulatory documentation (IEC, BIS, CE)',
      'Air, sea, and multi-modal containerized freight solutions',
      'Secure, damage-free, and cost-effective door-to-door delivery',
      'Pre-shipment factory inspection and operational quality verification',
      'Local warranty coverage and spare parts procurement support'
    ],
    specifications: [
      { label: 'Coverage', value: 'Europe, Asia, Middle East & Domestic Pan-India' },
      { label: 'Freight Modes', value: 'FCL / LCL Ocean Freight & Express Air Cargo' },
      { label: 'Customs Handling', value: 'Complete Import Duty & Port Clearance' },
      { label: 'Quality Verification', value: 'Factory Acceptance & Pre-Shipment Audit' },
      { label: 'Transit Insurance', value: 'Full Marine & Multi-Modal Cargo Coverage' },
      { label: 'Spares Availability', value: 'OEM Sourcing for All Imported Units' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Equipment Sourcing & Feasibility',
        desc: 'We analyze your production targets and identify certified global equipment manufacturers matching your exact technical specs.'
      },
      {
        step: '02',
        title: 'Procurement & Quality Audit',
        desc: 'Orders are placed with strict quality compliance criteria, factory testing logs, and export packaging specifications.'
      },
      {
        step: '03',
        title: 'International Freight & Customs Clearance',
        desc: 'We manage container booking, port handling, shipping documents, and regulatory approvals with customs officials.'
      },
      {
        step: '04',
        title: 'Domestic Transport & Handover',
        desc: 'Equipment is transported directly to your facility, uncrated, inspected, and verified before operational handover.'
      }
    ],
    suitableFor: [
      'Food Processing Plants',
      'Supermarket Bakery Chains',
      'Commercial Kitchen Equipment Dealers',
      'Franchise Restaurant Chains',
      'Industrial Packaging Facilities'
    ]
  },
  {
    id: 'machinery-manufacturing',
    aliases: ['manufacturing', 'machinery-manufacturing'],
    title: 'Machinery Manufacturing',
    tagline: 'Innovative manufacturing solutions engineered for industrial and culinary excellence.',
    badge: 'Heavy-Duty Industrial Build',
    image: service3,
    description:
      'From concept and blueprint to production and final load testing, we manufacture robust commercial kitchen and food processing machinery that meets international safety, durability, and operational standards.',
    detailedDescription: [
      'Cobolt Machineries designs and manufactures high-throughput food preparation machines, commercial fryers, dough kneaders, vegetable processors, and custom cooking ranges engineered specifically for heavy everyday commercial duty.',
      'Our state-of-the-art manufacturing infrastructure utilizes heavy-gauge structural steel, high-torque industrial gearmotors, precision bearings, and computerized thermal controls designed to run continuously during peak service hours without thermal drop or motor fatigue.',
      'Every machine leaves our factory with complete quality assurance inspection certificates, safety interlock verification, and full availability of replacement components from our Kerala central warehouse.'
    ],
    points: [
      'End-to-end machinery design, structural prototyping, and serial manufacturing',
      'Advanced CNC machining with tight mechanical tolerances and dynamic balancing',
      'Rigorous quality assurance, load testing, and electrical safety compliance',
      'Continuous duty ratings with heavy-duty copper-wound industrial motors',
      'Comprehensive after-sales service, technical manuals, and spare parts availability',
      'Modular assemblies allowing rapid maintenance and component replacement'
    ],
    specifications: [
      { label: 'Drive Systems', value: 'Heavy-Duty Copper Wound Motors & Oil-Bath Gearboxes' },
      { label: 'Structural Shell', value: 'Anodized Aircraft Aluminum & SUS304 Stainless' },
      { label: 'Electrical Controls', value: 'Industrial Contactors, Overload Relays & Safety Switches' },
      { label: 'Safety Standards', value: 'Magnetic Interlocks, Emergency Stop & CE Compliance' },
      { label: 'Testing Protocol', value: '100% Full-Load Thermal & Vibration Test Prior to Dispatch' },
      { label: 'Warranty Coverage', value: 'Comprehensive Warranty with Local Kerala Support' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Requirement Analysis & Conceptual Design',
        desc: 'Our engineering team details production capacities, electrical supply, duty cycles, and ergonomic considerations.'
      },
      {
        step: '02',
        title: 'CNC Component Machining & Welding',
        desc: 'Drive components, shafts, and chassis are machined to micron precision and assembled with heavy structural welds.'
      },
      {
        step: '03',
        title: 'Electrical Integration & Safety Testing',
        desc: 'Wiring, safety relays, emergency stops, and speed controllers are integrated and benchmarked under sustained load.'
      },
      {
        step: '04',
        title: 'Final Quality Inspection & Certification',
        desc: 'Each unit undergoes strict vibration, noise, and endurance audits before dispatch to the customer.'
      }
    ],
    suitableFor: [
      'High-Volume Food Preparation Units',
      'Commercial Catering Enterprises',
      'Bakery & Confectionery Factories',
      'Pizzeria & Fast Food Franchises',
      'Snack & Ready-to-Eat Food Manufacturers'
    ]
  },
  {
    id: 'consulting',
    aliases: ['consultation', 'consulting'],
    title: 'Engineering Consulting',
    tagline: 'Strategic engineering expertise for smarter, more efficient industrial operations.',
    badge: 'Workflow & Efficiency Optimization',
    image: service4,
    description:
      'We provide comprehensive consulting services tailored to commercial kitchens, bakery operators, and food processing businesses. Our consultants deliver strategic guidance on layout optimization, equipment sizing, energy efficiency, and operational excellence.',
    detailedDescription: [
      'Building a profitable and compliant commercial kitchen or food production plant requires balancing spatial ergonomics, utility load, fire regulations, food safety workflow, and equipment longevity. Mistakes made on paper cost tenfold once concrete is poured and gas lines are run.',
      'Cobolt’s consulting services bring over two decades of mechanical, culinary, and operational expertise to your project. We work directly with restaurateurs, project architects, MEP consultants, and hotel general managers from concept inception to post-launch optimization.',
      'Our recommendations focus on reducing labor bottlenecks, lowering gas and power consumption, optimizing exhaust CFM airflow, and selecting the exact machinery ratings that match your projected covers and batch sizes.'
    ],
    points: [
      'Commercial kitchen ergonomic layout design and HACCP/FSSAI compliance flow',
      'Industrial process optimization and production bottleneck resolution',
      'Accurate machinery sizing, electrical load calculation, and gas pipeline planning',
      'Exhaust ventilation, fresh air makeup CFM, and fire suppression integration',
      'Operational risk assessment and machinery replacement lifecycle audits',
      'Total cost of ownership (TCO) and return on investment (ROI) equipment analysis'
    ],
    specifications: [
      { label: 'Consultation Scope', value: 'Concept Design, MEP Coordination & Equipment Specs' },
      { label: 'Deliverables', value: 'CAD Drawings, Utility Schedules & Equipment BOQ' },
      { label: 'Compliance Focus', value: 'HACCP, FSSAI, Municipal Health & Fire Safety' },
      { label: 'Energy Auditing', value: 'Electrical Load Balancing & Gas Efficiency Modeling' },
      { label: 'Project Support', value: 'Architectural Coordination & Pre-Commissioning Audit' },
      { label: 'Engagement Model', value: 'Turnkey Project Consulting or Retained Advisory' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Discovery & Menu Engineering Review',
        desc: 'We review your menu, expected peak-hour volume, operating hours, and facility footprint to map the ideal equipment hierarchy.'
      },
      {
        step: '02',
        title: 'Workflow Mapping & Schematic CAD',
        desc: 'We create detailed schematic drawings showing raw material intake, preparation, cooking line, plating, and dishwashing separation.'
      },
      {
        step: '03',
        title: 'Utility Sizing & Specification BOQ',
        desc: 'We deliver comprehensive Bill of Quantities (BOQ) with precise electrical, plumbing, gas, and exhaust CFM requirements.'
      },
      {
        step: '04',
        title: 'Contractor Coordination & Final Sign-Off',
        desc: 'Our consultants coordinate with MEP contractors and site supervisors to verify correct installation before kitchen opening.'
      }
    ],
    suitableFor: [
      'New Restaurant & Café Startups',
      'Hotel Kitchen Renovations',
      'Centralized Cloud Kitchen Operators',
      'Bakery Production Expansion Projects',
      'Corporate & Institutional Food Services'
    ]
  },
  {
    id: 'amc',
    aliases: ['amc', 'annual-maintenance-contracts'],
    title: 'Annual Maintenance Contracts (AMC)',
    tagline: 'Reliable preventive maintenance designed for zero downtime and maximum equipment lifespan.',
    badge: '24/7 Priority Emergency Support',
    image: service5,
    description:
      'Our AMC services deliver complete peace of mind through scheduled preventive servicing, oil/lubrication changes, safety calibrations, emergency priority repairs, and performance monitoring. Keep your commercial kitchen operational 365 days a year.',
    detailedDescription: [
      'In a high-intensity commercial kitchen, equipment failure during a busy weekend dinner service or early-morning baking shift results in lost revenue, wasted inventory, and frustrated patrons. Routine preventive care is the single most effective investment in machine reliability.',
      'Cobolt’s Annual Maintenance Contract (AMC) is a comprehensive coverage program backed by certified field technicians, mobile service vans stocked with original OEM parts, and an active 24/7 emergency dispatch hotline across Kerala.',
      'Our scheduled service visits include complete motor testing, electrical terminal tightening, thermostat and thermocouple calibration, mechanical belt/chain tensioning, pneumatic seal checks, and thorough deep lubrication.'
    ],
    points: [
      'Customized maintenance schedules (Monthly, Bi-Monthly, or Quarterly visits)',
      'Preventive electrical inspections to prevent burnt contactors and motor overloads',
      'Thermostat, heating element, burner nozzle, and safety sensor calibrations',
      'Priority on-site emergency dispatch within 4 hours for contract holders',
      'Detailed digital service reports with machine health ratings and recommendations',
      'Discounted rates on genuine OEM replacement spare parts and consumables'
    ],
    specifications: [
      { label: 'Contract Coverage', value: 'All Cooking, Bakery, Refrigeration & Prep Machinery' },
      { label: 'Visit Frequency', value: 'Monthly / Bi-Monthly / Quarterly Scheduled Service' },
      { label: 'Emergency Response', value: '< 4 Hours Priority On-Site Callout' },
      { label: 'Parts Discount', value: 'Special Contract Pricing on All OEM Spare Parts' },
      { label: 'Technician Profile', value: 'Certified Commercial Appliance & HVAC Engineers' },
      { label: 'Documentation', value: 'Digital Asset Health Log & Preventive Service History' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Initial Asset Audit & Health Check',
        desc: 'Our engineers catalog all kitchen machinery, record serial numbers, and evaluate baseline operating condition.'
      },
      {
        step: '02',
        title: 'Customized Maintenance Schedule',
        desc: 'We set up a proactive service calendar coordinated around your lowest-traffic kitchen hours to prevent disruptions.'
      },
      {
        step: '03',
        title: 'Scheduled Preventive Servicing',
        desc: 'Technicians inspect wiring, lubricate bearings, calibrate controls, clean burners, and replace worn seals on schedule.'
      },
      {
        step: '04',
        title: '24/7 Priority Hotline & Rapid Dispatch',
        desc: 'Should an unexpected issue occur, your dedicated priority ticket guarantees rapid technician arrival.'
      }
    ],
    suitableFor: [
      'High-Capacity Commercial Restaurants',
      'Hotel Chains & Luxury Resorts',
      'Industrial Bakeries with Daily Shifts',
      'Hospital & University Catering Operations',
      'Multi-Outlet Fast Food Franchises'
    ]
  },
  {
    id: 'custom-machinery-design-fabrication',
    aliases: ['custom-solutions', 'custom-machinery-design-fabrication'],
    title: 'Custom Machinery Design & Fabrication',
    tagline: 'Bespoke engineering from concept blueprints to shopfloor integration.',
    badge: 'Tailored Mechanical Engineering',
    image: service6,
    description:
      'Crafting specialized culinary and industrial machinery tailored to your unique recipes, processing volumes, and spatial constraints. Impeccable engineering precision turns custom concepts into high-efficiency automated reality.',
    detailedDescription: [
      'Standard off-the-shelf machinery does not always fit proprietary culinary recipes, unique regional food items (such as specialized Indian bread making, traditional sweets, snack frying, or batter dispensing), or unconventional kitchen layouts.',
      'Cobolt Machineries specializes in bespoke machinery design and turnkey prototyping. Our multidisciplinary engineering team combines mechanical design, thermodynamics, fluid dynamics, and modern PLC automation to build custom machinery from the ground up.',
      'From custom continuous frying lines with sediment removal systems to automated dosing and portioning machines, we deliver turnkey automation that scales your production while preserving taste, texture, and recipe authenticity.'
    ],
    points: [
      'Full 3D CAD modeling, dynamic mechanical simulation, and load engineering',
      'Bespoke stainless steel chassis, custom drive trains, and automated conveyor systems',
      'Custom touch-screen HMI, multi-language recipe storage, and PLC control programming',
      'Food-grade pneumatic dosing, automated pumping, and volumetric filling systems',
      'Full CE, OSHA, and electrical safety interlock compliance integration',
      'Comprehensive on-site commissioning, recipe calibration, and staff training'
    ],
    specifications: [
      { label: 'Engineering Software', value: 'SolidWorks, AutoCAD & Finite Element Analysis (FEA)' },
      { label: 'Automation Platforms', value: 'Programmable Logic Controllers (PLC) & Touch HMIs' },
      { label: 'Power Options', value: 'Electric (Single/3-Phase), LPG / Natural Gas, Steam' },
      { label: 'Structural Build', value: 'Heavy Food-Safe SUS 304 Stainless Steel Frames' },
      { label: 'Testing Protocol', value: 'Prototype Factory Trial with Customer Recipe Batch' },
      { label: 'Compliance', value: 'Food-Contact Grade Standards & Emergency Interlocks' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Culinary & Mechanical Prototyping Brief',
        desc: 'We review your recipe parameters, cycle time, target hourly output, and operational safety criteria.'
      },
      {
        step: '02',
        title: 'Mechanical Simulation & 3D Engineering',
        desc: 'Our engineers draft detailed 3D assemblies, motion analysis, and stress simulations for client review.'
      },
      {
        step: '03',
        title: 'Precision Machining & Automation Build',
        desc: 'Components are machined, welded, wired with PLC controllers, and assembled in our Manjeri workshop.'
      },
      {
        step: '04',
        title: 'Live Recipe Batch Trial & Commissioning',
        desc: 'We conduct full-scale test runs with your actual food product to calibrate timing, temperature, and output consistency.'
      }
    ],
    suitableFor: [
      'Specialty Food Product Manufacturers',
      'Industrial Traditional Snack Producers',
      'Automated Commercial Kitchen Concepts',
      'Large-Scale Export Food Processors',
      'Innovators Developing Proprietary Equipment'
    ]
  }
];

export function getAllServices() {
  return servicesList;
}

export function getServiceById(id) {
  if (!id) return null;
  const cleanId = String(id).toLowerCase().trim();
  return (
    servicesList.find(
      (s) => s.id.toLowerCase() === cleanId || (s.aliases && s.aliases.includes(cleanId))
    ) || null
  );
}

export function getRelatedServices(currentId, limit = 3) {
  const cleanId = String(currentId).toLowerCase().trim();
  return servicesList
    .filter((s) => s.id.toLowerCase() !== cleanId && (!s.aliases || !s.aliases.includes(cleanId)))
    .slice(0, limit);
}
