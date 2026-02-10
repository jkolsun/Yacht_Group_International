import { notFound } from 'next/navigation'
import { services, getServiceBySlug } from '@/lib/data'
import ServicePageClient from './ServicePageClient'

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params
  const service = getServiceBySlug(serviceSlug)
  if (!service) return { title: 'Service Not Found' }

  return {
    title: `${service.name} | Yacht Group International`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params
  const service = getServiceBySlug(serviceSlug)

  if (!service) {
    notFound()
  }

  return <ServicePageClient service={service} />
}
