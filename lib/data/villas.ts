export interface Villa {
  id: string
  slug: string
  name: string
  location: string
  region: 'caribbean' | 'mediterranean' | 'asia-pacific' | 'americas' | 'middle-east'
  dailyRate: number
  weeklyRate: number
  bedrooms: number
  bathrooms: number
  maxGuests: number
  sqft: number
  image: string
  images: string[]
  description: string
  amenities: string[]
  features: string[]
  nearbyAttractions: string[]
  featured: boolean
}

export const villas: Villa[] = [
  {
    id: '1',
    slug: 'villa-aman-st-barths',
    name: 'Villa Aman',
    location: 'St. Barths, Caribbean',
    region: 'caribbean',
    dailyRate: 15000,
    weeklyRate: 95000,
    bedrooms: 7,
    bathrooms: 8,
    maxGuests: 14,
    sqft: 12000,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90',
    ],
    description: 'Perched on the hillside of St. Barths with panoramic ocean views, Villa Aman is the epitome of Caribbean luxury. Seven stunning bedroom suites, infinity pool, and private beach access.',
    amenities: ['Infinity Pool', 'Private Beach Access', 'Home Theater', 'Wine Cellar', 'Gym', 'Spa', 'Chef\'s Kitchen', 'Helipad'],
    features: ['Ocean View', 'Sunset Views', 'Gated Estate', 'Smart Home', 'EV Charging'],
    nearbyAttractions: ['Gustavia Harbor', 'Shell Beach', 'Eden Rock'],
    featured: true,
  },
  {
    id: '2',
    slug: 'villa-paradiso-amalfi',
    name: 'Villa Paradiso',
    location: 'Amalfi Coast, Italy',
    region: 'mediterranean',
    dailyRate: 12000,
    weeklyRate: 75000,
    bedrooms: 6,
    bathrooms: 7,
    maxGuests: 12,
    sqft: 10000,
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=90',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90',
    ],
    description: 'A historic Italian villa perched above the sparkling Mediterranean. Villa Paradiso combines centuries of history with modern luxury, featuring hand-painted frescoes and private terraces.',
    amenities: ['Private Pool', 'Gardens', 'Wine Cellar', 'Library', 'Private Dock', 'Chef Available'],
    features: ['Sea View', 'Historic Property', 'Private Gardens', 'Antique Furnishings'],
    nearbyAttractions: ['Positano', 'Ravello', 'Capri'],
    featured: true,
  },
  {
    id: '3',
    slug: 'villa-azure-santorini',
    name: 'Villa Azure',
    location: 'Santorini, Greece',
    region: 'mediterranean',
    dailyRate: 8500,
    weeklyRate: 55000,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    sqft: 6500,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=90',
    ],
    description: 'Carved into the iconic caldera cliffs of Oia, Villa Azure offers the quintessential Santorini experience. Watch legendary sunsets from your private infinity pool.',
    amenities: ['Infinity Pool', 'Hot Tub', 'Outdoor Dining', 'Wine Storage', 'Concierge'],
    features: ['Caldera View', 'Cave Architecture', 'Private Terraces', 'Sunset View'],
    nearbyAttractions: ['Oia Village', 'Ancient Thera', 'Red Beach'],
    featured: true,
  },
  {
    id: '4',
    slug: 'villa-oceana-malibu',
    name: 'Villa Oceana',
    location: 'Malibu, California',
    region: 'americas',
    dailyRate: 10000,
    weeklyRate: 65000,
    bedrooms: 6,
    bathrooms: 8,
    maxGuests: 12,
    sqft: 11000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=90',
    ],
    description: 'Contemporary architectural masterpiece on Carbon Beach, known as Billionaire\'s Beach. Floor-to-ceiling glass walls frame the Pacific Ocean.',
    amenities: ['Beachfront', 'Pool & Spa', 'Home Theater', 'Gym', 'Chef\'s Kitchen', 'Wine Room'],
    features: ['Beach Access', 'Modern Architecture', 'Floor-to-Ceiling Glass', 'Smart Home'],
    nearbyAttractions: ['Nobu Malibu', 'Getty Villa', 'Zuma Beach'],
    featured: true,
  },
  {
    id: '5',
    slug: 'villa-royal-palm-dubai',
    name: 'Villa Royal Palm',
    location: 'Palm Jumeirah, Dubai',
    region: 'middle-east',
    dailyRate: 18000,
    weeklyRate: 115000,
    bedrooms: 8,
    bathrooms: 10,
    maxGuests: 16,
    sqft: 18000,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=90',
      'https://images.unsplash.com/photo-1600585154526-ffa5f5f6d0f3?w=1200&q=90',
    ],
    description: 'The ultimate Dubai residence on Palm Jumeirah\'s frond. This palatial villa features private beach, spectacular views of Atlantis, and service fit for royalty.',
    amenities: ['Private Beach', 'Infinity Pool', 'Home Cinema', 'Spa', 'Gym', 'Staff Quarters', 'Elevator'],
    features: ['Atlantis View', 'Waterfront', 'Private Beach', '24/7 Security'],
    nearbyAttractions: ['Atlantis The Palm', 'Dubai Marina', 'Burj Al Arab'],
    featured: true,
  },
  {
    id: '6',
    slug: 'villa-eden-phuket',
    name: 'Villa Eden',
    location: 'Phuket, Thailand',
    region: 'asia-pacific',
    dailyRate: 6500,
    weeklyRate: 42000,
    bedrooms: 6,
    bathrooms: 7,
    maxGuests: 12,
    sqft: 14000,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90',
    ],
    description: 'A stunning tropical estate overlooking the Andaman Sea. Villa Eden blends traditional Thai architecture with contemporary luxury across multiple pavilions.',
    amenities: ['Infinity Pool', 'Spa Pavilion', 'Yoga Deck', 'Private Chef', 'Butler', 'Tennis Court'],
    features: ['Ocean View', 'Tropical Gardens', 'Thai Design', 'Private'],
    nearbyAttractions: ['Patong Beach', 'Old Phuket Town', 'Phi Phi Islands'],
    featured: true,
  },
  {
    id: '7',
    slug: 'chalet-alpine-verbier',
    name: 'Chalet Alpine',
    location: 'Verbier, Switzerland',
    region: 'mediterranean',
    dailyRate: 14000,
    weeklyRate: 90000,
    bedrooms: 7,
    bathrooms: 8,
    maxGuests: 14,
    sqft: 12000,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=90',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=90',
    ],
    description: 'The ultimate ski chalet in Verbier with ski-in/ski-out access. Featuring a wellness floor with pool, hammam, and massage room. Perfect for winter luxury.',
    amenities: ['Indoor Pool', 'Sauna', 'Hammam', 'Wine Cellar', 'Cinema', 'Ski Room', 'Hot Tub'],
    features: ['Ski-in/Ski-out', 'Mountain Views', 'Wellness Floor', 'Fireplace'],
    nearbyAttractions: ['Verbier Ski Resort', 'Mont Fort', 'Le Châble'],
    featured: false,
  },
  {
    id: '8',
    slug: 'villa-serena-turks',
    name: 'Villa Serena',
    location: 'Turks & Caicos',
    region: 'caribbean',
    dailyRate: 9500,
    weeklyRate: 60000,
    bedrooms: 5,
    bathrooms: 6,
    maxGuests: 10,
    sqft: 8000,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90',
    ],
    description: 'Beachfront paradise on Grace Bay, consistently rated one of the world\'s best beaches. Villa Serena offers barefoot luxury at its finest.',
    amenities: ['Beach Access', 'Infinity Pool', 'Outdoor Kitchen', 'Kayaks', 'Paddleboards', 'Snorkel Gear'],
    features: ['Beachfront', 'Turquoise Waters', 'Tropical Gardens', 'Privacy'],
    nearbyAttractions: ['Grace Bay Beach', 'Chalk Sound', 'Provo Golf Club'],
    featured: true,
  },
  {
    id: '9',
    slug: 'villa-cote-azur-cannes',
    name: 'Villa Côte d\'Azur',
    location: 'Cannes, France',
    region: 'mediterranean',
    dailyRate: 11000,
    weeklyRate: 70000,
    bedrooms: 6,
    bathrooms: 7,
    maxGuests: 12,
    sqft: 9000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
    ],
    description: 'A stunning Belle Époque villa overlooking the Bay of Cannes. Classic French Riviera elegance with modern amenities and breathtaking Mediterranean views.',
    amenities: ['Pool', 'Tennis Court', 'Gardens', 'Wine Cellar', 'Guest House', 'Garage'],
    features: ['Bay Views', 'Historic Architecture', 'Landscaped Gardens', 'Central Location'],
    nearbyAttractions: ['La Croisette', 'Old Town', 'Lérins Islands'],
    featured: false,
  },
  {
    id: '10',
    slug: 'villa-bali-uluwatu',
    name: 'Villa Bali',
    location: 'Uluwatu, Bali',
    region: 'asia-pacific',
    dailyRate: 4500,
    weeklyRate: 28000,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    sqft: 10000,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=90',
      'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=90',
    ],
    description: 'Clifftop luxury perched above Bali\'s legendary surf breaks. Villa Bali combines Balinese craftsmanship with contemporary design and world-class staff.',
    amenities: ['Infinity Pool', 'Spa', 'Yoga Pavilion', 'BBQ Area', 'Full Staff', 'Private Chef'],
    features: ['Clifftop', 'Ocean Views', 'Traditional Design', 'Full Staff'],
    nearbyAttractions: ['Uluwatu Temple', 'Padang Padang Beach', 'Single Fin'],
    featured: false,
  },
  {
    id: '11',
    slug: 'villa-hamptons-sagaponack',
    name: 'Villa Hamptons',
    location: 'Sagaponack, New York',
    region: 'americas',
    dailyRate: 8000,
    weeklyRate: 50000,
    bedrooms: 7,
    bathrooms: 9,
    maxGuests: 14,
    sqft: 15000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=90',
    ],
    description: 'A prestigious Hamptons estate in the exclusive village of Sagaponack. Sprawling grounds, tennis court, pool, and close proximity to pristine beaches.',
    amenities: ['Heated Pool', 'Tennis Court', 'Gym', 'Media Room', 'Wine Cellar', 'Gardens'],
    features: ['Gated Estate', 'Near Beach', 'Hamptons Style', 'Privacy'],
    nearbyAttractions: ['Sagaponack Beach', 'Bridgehampton', 'Wölffer Estate'],
    featured: false,
  },
  {
    id: '12',
    slug: 'villa-mykonos-aleomandra',
    name: 'Villa Mykonos',
    location: 'Mykonos, Greece',
    region: 'mediterranean',
    dailyRate: 7500,
    weeklyRate: 48000,
    bedrooms: 6,
    bathrooms: 6,
    maxGuests: 12,
    sqft: 7000,
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=90',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90',
    ],
    description: 'Quintessential Cycladic architecture meets modern luxury in this stunning Mykonos villa. Whitewashed walls, infinity pool, and legendary Aegean sunsets.',
    amenities: ['Infinity Pool', 'Outdoor Dining', 'BBQ', 'Concierge', 'Daily Housekeeping'],
    features: ['Sunset Views', 'Cycladic Design', 'Private', 'Sea Views'],
    nearbyAttractions: ['Mykonos Town', 'Little Venice', 'Paradise Beach'],
    featured: true,
  },
]

export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find(villa => villa.slug === slug)
}

export function getFeaturedVillas(): Villa[] {
  return villas.filter(villa => villa.featured)
}

export function getVillasByRegion(region: Villa['region']): Villa[] {
  return villas.filter(villa => villa.region === region)
}

export function getVillasByLocation(location: string): Villa[] {
  return villas.filter(villa => villa.location.toLowerCase().includes(location.toLowerCase()))
}
