export const categoryDefinitions = [
  {
    name: 'Food Preparation Machines',
    slug: 'food-preparation-machines',
    tagline: 'Precision Food Processing & Preparation Rigs',
    description: 'High-performance commercial food preparation machinery engineered for restaurants, bakeries, and food processing plants. Featuring heavy-duty planetary mixers, automatic dough dividers, potato cutters, kabab slicers, and commercial broast fryers.',
    metaDescription: 'Explore commercial food preparation machinery at Cobolt Machineries. Heavy-duty planetary mixers, dough dividers, slicers, and automatic fryers for restaurants and bakeries.',
    stats: {
      models: '20+ Models',
      material: 'SS 304 Food Grade',
      warranty: '1 Year Warranty',
      maintenance: '24/7 AMC Available',
    },
  },
  {
    name: 'Refrigeration Items',
    slug: 'refrigeration-items',
    tagline: 'Heavy-Duty Commercial Cooling & Freezing Systems',
    description: 'Reliable commercial refrigeration equipment engineered for high-ambient tropical environments. Discover commercial soft serve ice cream machines, heavy-duty ice crushers, visi coolers, and snow ice machines with rapid temperature pull-down.',
    metaDescription: 'Commercial refrigeration systems by Cobolt Machineries in Kerala. Soft-serve ice cream machines, visi coolers, ice makers, and cold storage machinery.',
    stats: {
      models: '6+ Models',
      material: 'Embraco / Danfoss Compressors',
      warranty: '1 Year Warranty',
      maintenance: 'Fast Service Callout',
    },
  },
  {
    name: 'Baking Equipments',
    slug: 'baking-equipments',
    tagline: 'Industrial Deck Ovens & Professional Bakery Machines',
    description: 'High-output commercial baking setups engineered for bakeries, pizzerias, and confectionery lines. Includes 1-deck to 3-deck gas baking ovens, stone-base pizza ovens, and electric deck ovens with digital heat control.',
    metaDescription: 'Industrial bakery machinery and commercial gas baking deck ovens by Cobolt Machineries. Gas ovens, electric pizza ovens, and precision temperature baking equipment.',
    stats: {
      models: '11+ Models',
      material: 'Aluminized Steel Chamber',
      warranty: '1 Year Warranty',
      maintenance: 'Installation Included',
    },
  },
  {
    name: 'Cooking Equipments',
    slug: 'cooking-equipments',
    tagline: 'High-Output Ranges, Rotisseries & Commercial Fryers',
    description: 'Heavy-duty commercial cooking equipment built to withstand extreme production hours. Featuring multi-burner cooking ranges with standard ovens, high-capacity shawaya rotisserie machines, hamburger patty presses, and carnival equipment.',
    metaDescription: 'Commercial cooking equipment from Cobolt Machineries Kerala. 4-burner ranges with ovens, shawaya rotisserie machines, patty presses, and commercial kitchen setups.',
    stats: {
      models: '6+ Models',
      material: 'Heavy Cast Iron & SS',
      warranty: '1 Year Warranty',
      maintenance: 'Preventative AMC',
    },
  },
  {
    name: 'Stainless Steel Fabrications',
    slug: 'stainless-steel-fabrications',
    tagline: 'Custom Food-Grade Stainless Steel Kitchen Infrastructure',
    description: 'Bespoke stainless steel commercial kitchen fabrications customized to your floorplan. Heavy-duty prep work tables with undershelves and overshelves, commercial exhaust hoods with grease filters, and breading tables with sifters.',
    metaDescription: 'Custom stainless steel commercial kitchen fabrications in Kerala. SS work tables, overshelves, exhaust hoods, sinks, and custom fabrication by Cobolt Machineries.',
    stats: {
      models: 'Custom Engineered',
      material: 'SS 304 / SS 201 Gauge',
      warranty: 'Structural Guarantee',
      maintenance: 'On-Site Fabrication',
    },
  },
  {
    name: 'Industrial And Food Service',
    slug: 'industrial-and-food-service',
    tagline: 'Commercial Warming Displays & Food Service Buffets',
    description: 'Commercial heating and food service presentation equipment. Precision bain-marie 3-pot chocolate warmers, thermostatically controlled commercial curved-glass warming displays, and buffet counter installations.',
    metaDescription: 'Commercial food warming displays and bain-marie warming equipment by Cobolt Machineries. Keep food hot, fresh, and appetizing for catering and bakeries.',
    stats: {
      models: 'Commercial Heavy-Duty',
      material: 'Tempered Glass & SS',
      warranty: '1 Year Warranty',
      maintenance: 'Immediate Parts Stock',
    },
  },
];

export function getCategoryBySlug(slug) {
  if (!slug) return null;
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return (
    categoryDefinitions.find(
      (c) => c.slug === normalized || c.name.toLowerCase() === normalized
    ) || null
  );
}
