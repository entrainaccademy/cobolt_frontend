import { notFound } from 'next/navigation';
import CategoryDetail from '../../../../views/CategoryDetail';
import JsonLd from '../../../../components/JsonLd';
import { categoryDefinitions, getCategoryBySlug } from '../../../../data/categories';
import { productsList } from '../../../../data/products';
import { fetchProducts } from '../../../../lib/api';
import { breadcrumbs } from '../../../../lib/schema';
import { SITE_URL } from '../../../../lib/siteConfig';

export const revalidate = 60;

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

  // Fetch live products on the server so the definitive list is rendered on first paint
  let products = null;
  try {
    products = await fetchProducts({ category: category.name });
  } catch (e) {
    // fallback
  }

  if (!products || products.length === 0) {
    products = productsList.filter(
      (p) => p.category?.toLowerCase() === category.name.toLowerCase()
    );
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
          [category.name, `/products/category/${category.slug}`],
        ])}
      />
      <CategoryDetail key={category.slug} category={category} initialProducts={products} />
    </>
  );
}
