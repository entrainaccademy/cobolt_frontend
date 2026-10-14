import { notFound } from 'next/navigation';
import ProductDetail from '../../../views/ProductDetail';
import JsonLd from '../../../components/JsonLd';
import { productsList, getProductById, getRelatedProducts } from '../../../data/products';
import { fetchProductById, fetchProducts } from '../../../lib/api';
import { productSchema, breadcrumbs } from '../../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../../lib/siteConfig';

export const dynamic = 'force-dynamic';

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
  let product = null;

  try {
    const res = await fetchProductById(id);
    if (res?.product) {
      product = res.product;
    }
  } catch (e) {
    // fallback
  }

  if (!product) {
    product = getProductById(id);
  }

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
  let product = null;
  let relatedProducts = [];

  try {
    const res = await fetchProductById(id);
    if (res?.product) {
      product = res.product;
      relatedProducts = res.relatedProducts || [];
    }
  } catch (e) {
    // fallback
  }

  if (!product) {
    product = getProductById(id);
    if (product) {
      relatedProducts = getRelatedProducts(product.id, product.category, 3);
    }
  }

  if (!product) {
    notFound();
  }

  if (relatedProducts.length === 0) {
    relatedProducts = getRelatedProducts(product.id, product.category, 3);
  }

  const jsonLdProduct = productSchema(product);
  const jsonLdBreadcrumb = breadcrumbs([
    ['Home', '/'],
    ['Products', '/products'],
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
