import { notFound } from 'next/navigation'
import { exoticCars, getCarBySlug } from '@/lib/data'
import CarDetailClient from './CarDetailClient'

export async function generateStaticParams() {
  return exoticCars.map((car) => ({
    slug: car.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) return { title: 'Vehicle Not Found' }

  return {
    title: `${car.brand} ${car.name} | Yacht Group International`,
    description: car.description,
  }
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const car = getCarBySlug(slug)

  if (!car) {
    notFound()
  }

  return <CarDetailClient car={car} />
}
