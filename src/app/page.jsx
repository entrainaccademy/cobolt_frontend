import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import { organization, website } from '../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../lib/siteConfig';

export const metadata = {
  title: {
    absolute: 'Best Commercial Kitchen Equipment Manufacturer & Supplier, Kerala | Cobolt Machineries',
  },
  description:
    'Explore best commercial kitchen equipment at Cobolt Machineries in kerala. Discover cooking, refrigeration, bakery and stainless steel equipment for your business',
  keywords: [
    ...SITE_CONFIG.keywords,
    'commercial kitchen equipment Kerala',
    'kitchen equipment manufacturer',
    'hotel kitchen equipment',
    'restaurant equipment supplier Kerala',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Best Commercial Kitchen Equipment Manufacturer & Supplier, Kerala | Cobolt Machineries',
    description:
      'Explore best commercial kitchen equipment at Cobolt Machineries in kerala. Discover cooking, refrigeration, bakery and stainless steel equipment for your business',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/blacklogotr.png',
        width: 1200,
        height: 630,
        alt: 'Cobolt Machineries - Best Commercial Kitchen Equipment Manufacturer & Supplier, Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Commercial Kitchen Equipment Manufacturer & Supplier, Kerala | Cobolt Machineries',
    description:
      'Explore best commercial kitchen equipment at Cobolt Machineries in kerala. Discover cooking, refrigeration, bakery and stainless steel equipment for your business',
    images: ['/blacklogotr.png'],
  },
};

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is commercial kitchen equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial kitchen equipment is the heavy-duty machinery and fittings used to prepare, cook, bake, store and serve food in restaurants, hotels, cafés, bakeries and catering businesses. It is built to run for long hours every day. It uses durable materials such as stainless steel and is designed to be easy to clean and meet food-hygiene standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is commercial-grade equipment really worth the higher price compared with cheaper machines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Commercial kitchens run equipment for many hours every day, so a cheap machine that fails early costs more in repairs, downtime and spoiled stock. Cobolt builds with SS304 and SS202 stainless steel and practical, heavy-use designs. You can choose the grade that fits your budget and workload, and we'll tell you honestly when a smaller or simpler model is enough.",
      },
    },
    {
      '@type': 'Question',
      name: "What if the machine breaks down and I can't find spare parts or a technician?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cobolt provides after-sales support, technical assistance and Annual Maintenance Contracts (AMC). We also manufacture in-house, so parts for our machines are not tied to a distant importer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What warranty do I get, and what does it cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cobolt Machineries offers product-specific warranties covering eligible manufacturing defects, including parts and labour as per warranty terms. Misuse, normal wear and tear, and improper maintenance are excluded. Annual Maintenance Contracts (AMC) are also available for ongoing service support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the equipment fit my kitchen, power supply and layout?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Before you order, our team plans the kitchen with you. We check your available space, gas or electrical connections and workflow, and we can customise sizes and stainless-steel workstations to fit. We deliver across India and handle installation, so the equipment is ready to use when it arrives.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I choose between stainless steel grades (SS304 vs SS202) and between models?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "SS304 is the premium choice for wet, acidic or high-hygiene areas and the longest life. SS202 is a more economical option for lower-exposure uses. Tell us what you cook, how many covers you serve a day and your budget, and we'll recommend the right model, such as a dough mixer, cooking range, fryer or shawarma machine.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [organization, website],
        }}
      />
      <JsonLd data={homeFaqSchema} />
      <Home />
    </>
  );
}
