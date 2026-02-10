import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { privateJets, getJetBySlug } from '@/lib/data'
import JetDetailClient from './JetDetailClient'

export async function generateStaticParams() {
  return privateJets.map((jet) => ({
    slug: jet.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const jet = getJetBySlug(params.slug)

  if (!jet) {
    return {
      title: 'Jet Not Found | Yacht Group International',
    }
  }

  return {
    title: `${jet.manufacturer} ${jet.name} | Private Jets | Yacht Group International`,
    description: jet.description,
  }
}

export default function JetDetailPage({ params }: { params: { slug: string } }) {
  const jet = getJetBySlug(params.slug)

  if (!jet) {
    notFound()
  }

  return <JetDetailClient jet={jet} />
}
