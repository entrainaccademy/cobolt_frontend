import { notFound } from 'next/navigation';
import ServiceDetail from '../../../views/ServiceDetail';
import JsonLd from '../../../components/JsonLd';
import { servicesList, getServiceById, getRelatedServices } from '../../../data/services';
import { breadcrumbs } from '../../../lib/schema';
import { SITE_CONFIG, SITE_URL } from '../../../lib/siteConfig';

export async function generateStaticParams() {
  const params = [];
  servicesList.forEach((s) => {
    params.push({ id: s.id });
    if (s.aliases) {
      s.aliases.forEach((alias) => {
        if (alias !== s.id) {
          params.push({ id: alias });
        }
      });
    }
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return {
      title: 'Service Not Found | Cobolt Machineries',
      description: 'The requested machinery or engineering service could not be found.',
    };
  }

  const title = `${service.title} | Cobolt Machineries Services`;
  const description = service.description
    ? `${service.description.slice(0, 155)}...`
    : `Explore professional ${service.title} services from Cobolt Machineries.`;
  const canonicalUrl = `${SITE_URL}/services/${service.id}`;

  const imageUrl =
    typeof service.image === 'object' && service.image?.src
      ? service.image.src
      : typeof service.image === 'string'
      ? service.image
      : '/service1.jpg';

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
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} - Cobolt Machineries`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const related = getRelatedServices(service.id, 3);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.badge || 'Commercial Kitchen Machinery Service',
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_URL,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
    },
    areaServed: {
      '@type': 'State',
      name: 'Kerala',
    },
    url: `${SITE_URL}/services/${service.id}`,
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbs([
          ['Home', '/'],
          ['Services', '/services'],
          [service.title, `/services/${service.id}`],
        ])}
      />
      <ServiceDetail service={service} relatedServices={related} />
    </>
  );
}
