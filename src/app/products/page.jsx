import AllProducts from '../../views/AllProducts';
import JsonLd from '../../components/JsonLd';
import { productsList } from '../../data/products';
import { fetchProducts } from '../../lib/api';
import { breadcrumbs } from '../../lib/schema';
import { SITE_URL } from '../../lib/siteConfig';

export const revalidate = 60;

export const metadata = {
  title: 'All Commercial Kitchen Equipment & Machinery | Cobolt Machineries Kerala',
  description:
    'Explore the complete commercial kitchen equipment catalog at Cobolt Machineries in Kerala. Baking ovens, dough mixers, cooking ranges, refrigeration systems, and stainless steel fabrication.',
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    title: 'All Commercial Kitchen Equipment & Machinery | Cobolt Machineries',
    description:
      'Explore the complete commercial kitchen equipment catalog at Cobolt Machineries in Kerala. Baking ovens, dough mixers, cooking ranges, refrigeration systems, and stainless steel fabrication.',
    url: `${SITE_URL}/products`,
    type: 'website',
    images: [
      {
        url: '/blacklogotr.png',
        width: 1200,
        height: 630,
        alt: 'Cobolt Machineries - Complete Commercial Kitchen Equipment Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Commercial Kitchen Equipment & Machinery | Cobolt Machineries',
    description:
      'Explore the complete commercial kitchen equipment catalog at Cobolt Machineries in Kerala.',
    images: ['/blacklogotr.png'],
  },
};

export default async function ProductsPage() {
  // Fetch live products on the server
  let liveProducts = [];
  try {
    liveProducts = (await fetchProducts()) || [];
  } catch (e) {
    liveProducts = [];
  }

  // Merge live backend products with static fallback to preserve all catalog items
  const seenIds = new Set(liveProducts.map((p) => p.id?.toLowerCase().trim()));
  const seenNames = new Set(liveProducts.map((p) => p.name?.toLowerCase().trim()));
  const mergedProducts = [...liveProducts];

  for (const sp of productsList) {
    const sId = sp.id?.toLowerCase().trim();
    const sName = sp.name?.toLowerCase().trim();
    if (!seenIds.has(sId) && !seenNames.has(sName)) {
      mergedProducts.push(sp);
    }
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Commercial Kitchen Products | Cobolt Machineries',
    description:
      'Complete catalog of commercial kitchen and food machinery by Cobolt Machineries in Kerala.',
    url: `${SITE_URL}/products`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['All Products', '/products'],
        ])}
      />
      <AllProducts initialProducts={mergedProducts} />
    </>
  );
}
