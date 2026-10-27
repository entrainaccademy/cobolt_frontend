import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import { organization, website } from '../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../lib/siteConfig';

export const metadata = {
  title: {
    absolute: 'Kitchen Equipment Supplier in Kerala | Cobolt Machineries',
  },
  description:
    'Explore commercial kitchen equipment from Cobolt Machineries in Kerala, including cooking, refrigeration, bakery and stainless steel solutions.',
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
    title: 'Kitchen Equipment Supplier in Kerala | Cobolt Machineries',
    description:
      'Explore commercial kitchen equipment from Cobolt Machineries in Kerala, including cooking, refrigeration, bakery and stainless steel solutions.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/blacklogotr.png',
        width: 1200,
        height: 630,
        alt: 'Cobolt Machineries - Kitchen Equipment Supplier in Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitchen Equipment Supplier in Kerala | Cobolt Machineries',
    description:
      'Explore commercial kitchen equipment from Cobolt Machineries in Kerala, including cooking, refrigeration, bakery and stainless steel solutions.',
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
