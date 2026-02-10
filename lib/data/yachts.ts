export interface Yacht {
  id: string
  slug: string
  name: string
  length: number
  builder: string
  dailyRate: number
  weeklyRate: number
  guests: number
  crew: number
  cabins: number
  year: number
  images: string[]
  description: string
  amenities: string[]
  destinations: string[]
  featured: boolean
}

export const yachts: Yacht[] = [
  {
    id: '1',
    slug: '222-custom',
    name: "222' Custom",
    length: 222,
    builder: 'Custom Build',
    dailyRate: 48000,
    weeklyRate: 290000,
    guests: 12,
    crew: 18,
    cabins: 6,
    year: 2022,
    images: [
      'https://images.unsplash.com/photo-1559599238-308793637427?w=1200&q=90',
      'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=90',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90',
    ],
    description: 'An extraordinary 222-foot custom superyacht representing the pinnacle of maritime luxury. Featuring six expansive staterooms, a private cinema, gymnasium, spa, and helipad. This vessel offers uncompromising elegance for the most discerning clientele.',
    amenities: ['Helipad', 'Private Cinema', 'Spa', 'Gymnasium', 'Beach Club', 'Tender Garage', 'Jacuzzi', 'Elevator'],
    destinations: ['Mediterranean', 'Caribbean', 'Bahamas'],
    featured: true,
  },
  {
    id: '2',
    slug: '180-feadship',
    name: "180' Feadship",
    length: 180,
    builder: 'Feadship',
    dailyRate: 35000,
    weeklyRate: 210000,
    guests: 12,
    crew: 14,
    cabins: 6,
    year: 2020,
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=90',
      'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=1200&q=90',
    ],
    description: 'A masterpiece from the legendary Feadship yard, this 180-foot yacht combines Dutch craftsmanship with contemporary design. The interior features custom furnishings and artwork throughout.',
    amenities: ['Beach Club', 'Spa', 'Gymnasium', 'Tender Garage', 'Jacuzzi', 'Water Sports Equipment'],
    destinations: ['Mediterranean', 'Caribbean', 'South Pacific'],
    featured: true,
  },
  {
    id: '3',
    slug: '155-benetti',
    name: "155' Benetti",
    length: 155,
    builder: 'Benetti',
    dailyRate: 28000,
    weeklyRate: 168000,
    guests: 10,
    crew: 11,
    cabins: 5,
    year: 2021,
    images: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=90',
    ],
    description: 'Italian excellence personified in this stunning Benetti. The yacht features an open-plan salon with floor-to-ceiling windows, offering panoramic ocean views.',
    amenities: ['Sun Deck', 'Jacuzzi', 'Tender Garage', 'Water Sports', 'Gym', 'Beach Club'],
    destinations: ['Mediterranean', 'Adriatic', 'Greek Islands'],
    featured: true,
  },
  {
    id: '4',
    slug: '136-baglietto',
    name: "136' Baglietto",
    length: 136,
    builder: 'Baglietto',
    dailyRate: 20000,
    weeklyRate: 120000,
    guests: 10,
    crew: 8,
    cabins: 5,
    year: 2019,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90',
      'https://images.unsplash.com/photo-1595925889916-5a4e2f8b3b0c?w=1200&q=90',
    ],
    description: 'A sleek Baglietto with exceptional speed and style. This yacht is perfect for those who appreciate both performance and luxury.',
    amenities: ['Flybridge', 'Jacuzzi', 'Tender', 'Water Sports', 'BBQ Area'],
    destinations: ['French Riviera', 'Italian Coast', 'Monaco'],
    featured: true,
  },
  {
    id: '5',
    slug: '120-tecnomar',
    name: "120' Tecnomar",
    length: 120,
    builder: 'Tecnomar',
    dailyRate: 8975,
    weeklyRate: 55000,
    guests: 8,
    crew: 6,
    cabins: 4,
    year: 2020,
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=90',
      'https://images.unsplash.com/photo-1541959833400-049d37f98ccd?w=1200&q=90',
    ],
    description: 'Bold Italian design meets exceptional performance. The Tecnomar offers a unique blend of sporty aesthetics and comfortable cruising.',
    amenities: ['Flybridge', 'Sun Pads', 'Tender', 'Snorkeling Gear', 'BBQ'],
    destinations: ['Miami', 'Bahamas', 'Caribbean'],
    featured: true,
  },
  {
    id: '6',
    slug: '95-sunseeker',
    name: "95' Sunseeker",
    length: 95,
    builder: 'Sunseeker',
    dailyRate: 6500,
    weeklyRate: 40000,
    guests: 8,
    crew: 4,
    cabins: 4,
    year: 2022,
    images: [
      'https://images.unsplash.com/photo-1588401273872-f2e2de90ed60?w=1200&q=90',
      'https://images.unsplash.com/photo-1599153066743-08a83d02b3e5?w=1200&q=90',
    ],
    description: 'British elegance meets Mediterranean style in this beautiful Sunseeker. Ideal for intimate gatherings and coastal exploration.',
    amenities: ['Flybridge', 'Jacuzzi', 'Tender', 'Water Toys'],
    destinations: ['Miami', 'Florida Keys', 'Bahamas'],
    featured: true,
  },
  {
    id: '7',
    slug: '85-azimut',
    name: "85' Azimut Grande",
    length: 85,
    builder: 'Azimut',
    dailyRate: 5500,
    weeklyRate: 35000,
    guests: 8,
    crew: 4,
    cabins: 4,
    year: 2021,
    images: [
      'https://images.unsplash.com/photo-1562281302-809108fd533c?w=1200&q=90',
      'https://images.unsplash.com/photo-1559599238-308793637427?w=1200&q=90',
    ],
    description: 'The Azimut Grande offers spacious living areas and exceptional Italian design. Perfect for extended cruising in style.',
    amenities: ['Sun Deck', 'Jacuzzi', 'Tender', 'Jet Skis'],
    destinations: ['Mediterranean', 'Caribbean'],
    featured: false,
  },
  {
    id: '8',
    slug: '75-princess',
    name: "75' Princess",
    length: 75,
    builder: 'Princess',
    dailyRate: 4200,
    weeklyRate: 28000,
    guests: 6,
    crew: 3,
    cabins: 3,
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=1200&q=90',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90',
    ],
    description: 'A newly launched Princess with cutting-edge design and exceptional craftsmanship. Ideal for intimate voyages.',
    amenities: ['Flybridge', 'Sun Pads', 'Tender', 'Snorkeling Gear'],
    destinations: ['Miami', 'Keys', 'Bahamas'],
    featured: false,
  },
]

export function getYachtBySlug(slug: string): Yacht | undefined {
  return yachts.find(yacht => yacht.slug === slug)
}

export function getFeaturedYachts(): Yacht[] {
  return yachts.filter(yacht => yacht.featured)
}
