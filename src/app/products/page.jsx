import { Suspense } from 'react';
import Products from '../../views/Products';
import JsonLd from '../../components/JsonLd';
import { catalogItemListSchema, breadcrumbs } from '../../lib/schema';
import { SITE_URL } from '../../lib/siteConfig';

export const metadata = {
  title: 'Products & Machinery Catalog | Commercial Kitchen & Processing Equipment',
  description: 'Explore Cobolt Machineries industrial catalog: heavy-duty dough mixers, commercial open fryers, stainless steel fabrication, food preparation, and bakery machinery.',
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    title: 'Products & Machinery Catalog | Cobolt Machineries',
    description: 'High-precision industrial machinery, stainless steel fabrication, and food processing equipment.',
    url: `${SITE_URL}/products`,
    images: [
      {
        url: '/slider1.webp',
        width: 1200,
        height: 630,
        alt: 'Cobolt Industrial Machinery Catalog',
      },
    ],
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={catalogItemListSchema} />
      <JsonLd data={breadcrumbs([['Home', '/'], ['Products', '/products']])} />
      <Suspense fallback={null}>
        <Products />
      </Suspense>
    </>
  );
}
