import { cache } from 'react';
import { notFound } from 'next/navigation';
import ProductDetail from '../../../views/ProductDetail';
import JsonLd from '../../../components/JsonLd';
import { productsList, getProductById, getRelatedProducts } from '../../../data/products';
import { fetchProductById, fetchProducts } from '../../../lib/api';
import { productSchema, breadcrumbs } from '../../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../../lib/siteConfig';
import { categoryDefinitions } from '../../../data/categories';

export const revalidate = 60;

/**
 * Deduplicated, cached product loader
 * 1. Checks local static catalog for instant 0ms retrieval
 * 2. If not found in local catalog (e.g. added dynamically via admin MongoDB), queries backend
 */
const loadProductData = cache(async (id) => {
  if (!id) return { product: null, relatedProducts: [] };

  // 1. Instant local lookup
  const localProduct = getProductById(id);
  if (localProduct) {
    const related = getRelatedProducts(localProduct.id, localProduct.category, 3);
    return { product: localProduct, relatedProducts: related };
  }

  // 2. Dynamic product from backend API
  try {
    const res = await fetchProductById(id);
    if (res?.product) {
      const related =
        res.relatedProducts && res.relatedProducts.length > 0
          ? res.relatedProducts
          : getRelatedProducts(res.product.id || id, res.product.category, 3);
      return { product: res.product, relatedProducts: related };
    }
  } catch (e) {
    // ignore
  }

  return { product: null, relatedProducts: [] };
});

export async function generateStaticParams() {
  try {
    const backendProducts = await fetchProducts();
    if (backendProducts && backendProducts.length > 0) {
      return backendProducts.map((p) => ({ id: p.id }));
    }
  } catch (e) {
    // ignore, fall back
  }
  return productsList.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { product } = await loadProductData(id);

  if (!product) {
    return {
      title: 'Product Not Found | Cobolt Machineries',
      description: 'The requested machinery or equipment could not be found in our catalog.',
    };
  }

  const title = `${product.name} | Cobolt Machineries`;
  const description = product.description
    ? `${product.description.slice(0, 155)}...`
    : `Explore specifications and details for ${product.name} from Cobolt Machineries.`;
  const canonicalUrl = `${SITE_URL}/products/${product.id}`;

  const imageUrl =
    typeof product.image === 'object' && product.image?.src
      ? product.image.src
      : typeof product.image === 'string'
      ? product.image
      : '/slider1.webp';

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
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const { product, relatedProducts } = await loadProductData(id);

  if (!product) {
    notFound();
  }

  const catSlug = categoryDefinitions.find(
    (c) => c.name.toLowerCase() === product.category?.toLowerCase()
  )?.slug;
  const categoryPath = catSlug ? `/products/category/${catSlug}` : '/#categories';

  const jsonLdProduct = productSchema(product);
  const jsonLdBreadcrumb = breadcrumbs([
    ['Home', '/'],
    [product.category || 'Machineries', categoryPath],
    [product.name, `/products/${product.id}`],
  ]);

  return (
    <>
      <JsonLd data={jsonLdProduct} />
      <JsonLd data={jsonLdBreadcrumb} />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  );
}
