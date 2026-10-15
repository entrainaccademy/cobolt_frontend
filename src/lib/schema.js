import { productsList } from '../data/products';

export const SITE = 'https://www.coboltmachineries.com';
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

export const address = {
  '@type': 'PostalAddress',
  streetAddress: 'Veemboor Industrial Zone',
  addressLocality: 'Manjeri',
  addressRegion: 'Kerala',
  postalCode: '676122',
  addressCountry: 'IN',
};

export const organization = {
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORG_ID,
  name: 'Cobolt Machineries',
  legalName: 'Cobolt Machineries Private Limited',
  url: SITE,
  logo: `${SITE}/blacklogotr.png`,
  image: `${SITE}/blacklogotr.png`,
  description:
    'Industrial machinery, commercial food processing equipment, stainless steel fabrication and engineering solutions from Manjeri, Kerala.',
  telephone: '+91-9061782023',
  email: 'infocobolt123@gmail.com',
  address,
  areaServed: 'IN',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.youtube.com/@coboltmachineries',
    'https://www.instagram.com/coboltmachineries',
    'https://www.facebook.com/people/Cobolt-Machineries/pfbid0gxTrWUxQHVPqtLuogLtgoc1uMcM2FDJkFQueQfYoxopVvW3wzneqV2bq1EBBWsRFl/',
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE,
  name: 'Cobolt Machineries',
  description:
    'Cobolt Machineries delivers innovative, high-precision industrial machinery, commercial food processing equipment, stainless steel fabrication, and engineering solutions.',
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
};

export const breadcrumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: path.startsWith('http') ? path : `${SITE}${path}`,
  })),
});

// Services List (matched to actual services page content)
export const services = [
  {
    slug: 'steel-fabrication',
    name: 'Steel Fabrication',
    description:
      'Custom kitchen layout planning and 3D modeling, food-safe 304/316 stainless steel fabrication, TIG/MIG welding with satin finish polishing, and precision on-site installation and alignment.',
  },
  {
    slug: 'import-export',
    name: 'Import & Export',
    description:
      'Worldwide sourcing and supplier management, customs compliance and regulatory documentation, air, sea, and land freight solutions, and secure global trade logistics.',
  },
  {
    slug: 'machinery-manufacturing',
    name: 'Machinery Manufacturing',
    description:
      'End-to-end machinery design and development, advanced precision manufacturing, quality assurance, safety compliance, and comprehensive after-sales spare parts support.',
  },
  {
    slug: 'consulting',
    name: 'Engineering Consulting',
    description:
      'Engineering and technical consulting covering industrial process optimization, equipment planning, technology integration, and operational risk assessment.',
  },
  {
    slug: 'annual-maintenance-contracts',
    name: 'Annual Maintenance Contracts (AMC)',
    description:
      'Customized maintenance schedules, preventive inspections, priority on-site support from service engineers, and detailed maintenance reports.',
  },
  {
    slug: 'custom-machinery-design-fabrication',
    name: 'Custom Machinery Design & Fabrication',
    description:
      'Bespoke machinery from concept blueprints to shopfloor integration, including 3D CAD modeling, custom control and HMI programming, and safety compliance integration.',
  },
];

export const serviceSchema = (s) => ({
  '@type': 'Service',
  '@id': `${SITE}/services#${s.slug}`,
  name: s.name,
  description: s.description,
  serviceType: s.name,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE}/services`,
});

// Product helper driven by authoritative data
export const productSchema = (p) => {
  const imgSrc = typeof p.image === 'object' && p.image?.src
    ? `${SITE}${p.image.src}`
    : (p.image ? (p.image.startsWith('http') ? p.image : `${SITE}${p.image}`) : `${SITE}/slider1.webp`);

  return {
    '@type': 'Product',
    '@id': `${SITE}/products/${p.id}#product`,
    name: p.name,
    category: p.category,
    description: p.description || p.tagline || `${p.name} from Cobolt Machineries.`,
    image: imgSrc,
    url: `${SITE}/products/${p.id}`,
    brand: { '@type': 'Brand', name: 'Cobolt Machineries' },
    manufacturer: { '@id': ORG_ID },
  };
};

// Full catalog ItemList schema
export const catalogItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cobolt Machineries Product Catalog',
  description: 'Industrial machinery, commercial food processing equipment, and stainless steel fabrication catalog.',
  url: `${SITE}/products`,
  numberOfItems: productsList.length,
  itemListElement: productsList.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: productSchema(p),
  })),
};

// Blog Posts Data (from actual Blog.jsx)
export const blogPosts = [
  {
    slug: 'spindle-checks',
    title: '5 Essential Checks for High-Speed Spindles',
    date: '2026-06-12',
    author: 'Ramanathan Iyer',
    description: 'Spindle thermal drift and bearing failures are the primary causes of part tolerances issues. Learn how temperature management prevents downtime.',
  },
  {
    slug: 'plc-integration',
    title: 'Integrating PLC Data with Enterprise ERP Systems',
    date: '2026-05-28',
    author: 'Sarah Jenkins',
    description: 'How manufacturing floors leverage automated Modbus/TCP relays to log parts count and predictive health checks directly into billing databases.',
  },
  {
    slug: 'hydraulic-fluid-care',
    title: 'Hydraulic Fluid Degradation: Causes and Prevention',
    date: '2026-05-15',
    author: 'Marcus Vance',
    description: 'Understanding chemical oxidation, particulate contamination, and water emulsification in high-pressure hydraulic circuits.',
  },
  {
    slug: 'custom-fabrication-standards',
    title: 'Designing Machine Castings for Heavy Load Operations',
    date: '2026-04-30',
    author: 'Dr. Arjan Patel',
    description: 'Analyzing gray cast iron vs welded structural steel frames using Finite Element Analysis (FEA) for vibrational dampening.',
  },
  {
    slug: 'industry-predictive-ai',
    title: 'The Rise of Edge AI in Predictive Machinery Diagnostics',
    date: '2026-04-10',
    author: 'Sarah Jenkins',
    description: 'How micro-controllers mounted directly on motor housings run light neural networks to predict bearing failures 100 hours in advance.',
  },
];

// Blog Index Schema
export const blogIndexSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE}/blog#blog`,
  url: `${SITE}/blog`,
  name: 'Technical Journal & News | Cobolt Machineries',
  description: 'Practical guides and deep-dives on CNC machinery maintenance, PLC integration, and heavy steel fabrication.',
  publisher: { '@id': ORG_ID },
  blogPost: blogPosts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { '@type': 'Person', name: p.author },
    publisher: { '@id': ORG_ID },
  })),
};

// Gallery Images Data (from actual Gallery.jsx)
export const galleryItems = [
  {
    name: 'Vertical CNC Lathe Calibration',
    description: 'Final alignment stress testing of the vertical CNC milling head spindle prior to packaging.',
    contentUrl: `${SITE}/slider1.webp`,
  },
  {
    name: 'Hydraulic Die Installation',
    description: 'Rigging teams setting the solid main ram and slide cushion guides into the structural frame bed.',
    contentUrl: `${SITE}/slider2.webp`,
  },
  {
    name: 'Linear Motors & Guideway Assembly',
    description: 'Technicians aligning precision glass scale grids on micro-milling workbench rails.',
    contentUrl: `${SITE}/slider3.webp`,
  },
  {
    name: 'Cobolt Assembly Facility',
    description: 'Perspective of our heavy machinery assembly facility showing precision layout.',
    contentUrl: `${SITE}/hm_about1.webp`,
  },
  {
    name: 'Column Milling Setup',
    description: 'Framework overview on the gantry center machining precision industrial housings.',
    contentUrl: `${SITE}/slider1.webp`,
  },
  {
    name: 'Plate Leveling Alignment Checks',
    description: 'Verifying mechanical roller spacing tolerances and optical sensors on straightener line.',
    contentUrl: `${SITE}/slider2.webp`,
  },
];

// Gallery Schema
export const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${SITE}/gallery#gallery`,
  url: `${SITE}/gallery`,
  name: 'Machinery & Facility Gallery | Cobolt Machineries',
  description: 'Visual archive of Cobolt Machineries fabrication setups, equipment calibrations, and workshop facilities.',
  isPartOf: { '@id': WEBSITE_ID },
  publisher: { '@id': ORG_ID },
  image: galleryItems.map((img) => ({
    '@type': 'ImageObject',
    name: img.name,
    description: img.description,
    contentUrl: img.contentUrl,
    creditText: 'Cobolt Machineries',
    creator: { '@id': ORG_ID },
  })),
};

// Sales Executive JobPosting Schema (Active role with full verified description on page)
export const salesJobSchema = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: 'Sales Executive',
  description:
    '<p>Manage enquiries, follow up with leads, recommend suitable commercial kitchen equipment, prepare technical quotations and close sales through digital channels. Office-based, no field sales.</p><p>Responsibilities: handle and follow up customer enquiries; recommend equipment; share catalogues and quotations; negotiate and convert leads; maintain lead and sales records in the CRM; coordinate with production, accounts, delivery and service teams; achieve monthly sales targets.</p><p>Required skills: inside sales, tele-sales or B2B sales experience; strong communication and negotiation; phone and WhatsApp business communication; basic CRM, Excel / Google Sheets and email; ability to explain technical products. Prior experience in machinery or commercial kitchen equipment is preferred.</p>',
  datePosted: '2025-01-15',
  employmentType: 'FULL_TIME',
  hiringOrganization: {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Cobolt Machineries Private Limited',
    sameAs: SITE,
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Veemboor Industrial Zone',
      addressLocality: 'Manjeri',
      addressRegion: 'Kerala',
      postalCode: '676122',
      addressCountry: 'IN',
    },
  },
  directApply: true,
};
