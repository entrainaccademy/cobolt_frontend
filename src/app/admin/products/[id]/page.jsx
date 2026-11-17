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
 * 1. Checks backend API first so live admin edits (pricing, availability, description) are rendered
 * 2. Seamlessly falls back to local static catalog if product is not in backend or during backend cold-starts
 */
const loadProductData = cache(async (id) => {
  if (!id) return { product: null, relatedProducts: [] };

  // 1. Live dynamic product from backend API (reflects admin updates)
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
    // Backend offline / error - fallback to local catalog
  }

  // 2. Fallback to local static catalog
  const localProduct = getProductById(id);
  if (localProduct) {
    const related = getRelatedProducts(localProduct.id, localProduct.category, 3);
    return { product: localProduct, relatedProducts: related };
  }

  return { product: null, relatedProducts: [] };
});

export async function generateStaticParams() {
  const ids = new Set();
  const params = [];

  try {
    const backendProducts = await fetchProducts();
    if (Array.isArray(backendProducts)) {
      for (const p of backendProducts) {
        if (p?.id && !ids.has(p.id.toLowerCase())) {
          ids.add(p.id.toLowerCase());
          params.push({ id: p.id });
        }
      }
    }
  } catch (e) {
    // ignore, fall back
  }

  for (const product of productsList) {
    if (product?.id && !ids.has(product.id.toLowerCase())) {
      ids.add(product.id.toLowerCase());
      params.push({ id: product.id });
    }
  }

  return params;
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
