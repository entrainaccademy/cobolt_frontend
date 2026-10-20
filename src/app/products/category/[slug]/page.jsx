import { notFound } from 'next/navigation';
import CategoryDetail from '../../../../views/CategoryDetail';
import JsonLd from '../../../../components/JsonLd';
import { categoryDefinitions, getCategoryBySlug } from '../../../../data/categories';
import { breadcrumbs } from '../../../../lib/schema';
import { SITE_URL } from '../../../../lib/siteConfig';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return categoryDefinitions.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Cobolt Machineries',
      description: 'The requested machinery category could not be found.',
    };
  }

  const title = `${category.name} Manufacturer & Supplier, Kerala | Cobolt Machineries`;
  const description = category.metaDescription;
  const canonicalUrl = `${SITE_URL}/products/category/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: '/slider1.webp',
          width: 1200,
          height: 630,
          alt: `${category.name} - Cobolt Machineries`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/slider1.webp'],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/products/category/${category.slug}`,
  };

  return (
    <>
      <JsonLd data={categorySchema} />
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Products', '/products'],
          [category.name, `/products/category/${category.slug}`],
        ])}
      />
      <CategoryDetail category={category} />
    </>
  );
}
