import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import { organization, website } from '../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../lib/siteConfig';

export const metadata = {
  title: 'Commercial Kitchen Equipment Manufacturer & Supplier, Kerala | Cobolt Machineries',
  description:
    'Explore commercial kitchen equipment at Cobolt Machineries in kerala. Discover cooking, refrigeration, bakery and stainless steel equipment for your business',
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
    title: 'Commercial Kitchen Equipment Manufacturer & Supplier, Kerala | Cobolt Machineries',
    description:
      'Explore commercial kitchen equipment at Cobolt Machineries in kerala. Discover cooking, refrigeration, bakery and stainless steel equipment for your business',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/blacklogotr.png',
        width: 1200,
        height: 630,
        alt: 'Cobolt Machineries - Commercial Kitchen Equipment Manufacturer & Supplier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Kitchen Equipment Manufacturer & Supplier, Kerala | Cobolt Machineries',
    description:
      'Explore commercial kitchen equipment at Cobolt Machineries in kerala. Discover cooking, refrigeration, bakery and stainless steel equipment for your business',
    images: ['/blacklogotr.png'],
  },
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
      <Home />
    </>
  );
}
