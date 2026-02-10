import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { villas, getVillaBySlug } from '@/lib/data'
import VillaDetailClient from './VillaDetailClient'

export async function generateStaticParams() {
  return villas.map((villa) => ({
    slug: villa.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const villa = getVillaBySlug(params.slug)

  if (!villa) {
    return {
      title: 'Villa Not Found | Yacht Group International',
    }
  }

  return {
    title: `${villa.name} | ${villa.location} | Yacht Group International`,
    description: villa.description,
  }
}

export default function VillaDetailPage({ params }: { params: { slug: string } }) {
  const villa = getVillaBySlug(params.slug)

  if (!villa) {
    notFound()
  }

  return <VillaDetailClient villa={villa} />
}
