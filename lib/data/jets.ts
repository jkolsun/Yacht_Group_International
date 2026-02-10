export interface PrivateJet {
  id: string
  slug: string
  name: string
  manufacturer: string
  category: 'light' | 'midsize' | 'super-midsize' | 'heavy' | 'ultra-long-range'
  hourlyRate: number
  passengers: number
  range: number // in nautical miles
  speed: number // in knots
  image: string
  images: string[]
  specs: {
    cabinHeight: string
    cabinWidth: string
    cabinLength: string
    baggageCapacity: string
  }
  description: string
  amenities: string[]
  available: string[]
  featured: boolean
}

export const privateJets: PrivateJet[] = [
  {
    id: '1',
    slug: 'gulfstream-g700',
    name: 'Gulfstream G700',
    manufacturer: 'Gulfstream',
    category: 'ultra-long-range',
    hourlyRate: 12500,
    passengers: 19,
    range: 7500,
    speed: 516,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'3"',
      cabinWidth: '8\'2"',
      cabinLength: '56\'11"',
      baggageCapacity: '195 cu ft',
    },
    description: 'The flagship of the Gulfstream fleet, the G700 offers unparalleled luxury with the largest cabin in the industry. Perfect for transcontinental journeys in ultimate comfort.',
    amenities: ['Full Galley', 'Private Stateroom', 'Shower', 'Conference Room', 'Entertainment System', 'Satellite WiFi'],
    available: ['Miami', 'New York', 'London', 'Dubai'],
    featured: true,
  },
  {
    id: '2',
    slug: 'bombardier-global-7500',
    name: 'Bombardier Global 7500',
    manufacturer: 'Bombardier',
    category: 'ultra-long-range',
    hourlyRate: 11800,
    passengers: 17,
    range: 7700,
    speed: 516,
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=90',
      'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'2"',
      cabinWidth: '8\'0"',
      cabinLength: '54\'7"',
      baggageCapacity: '195 cu ft',
    },
    description: 'The Global 7500 sets new standards in business aviation with its four living spaces and the industry\'s longest range. Experience true luxury at 51,000 feet.',
    amenities: ['Master Suite', 'Full Kitchen', 'Entertainment Suite', 'Crew Rest Area', 'High-Speed WiFi'],
    available: ['Miami', 'Los Angeles', 'Paris', 'Monaco'],
    featured: true,
  },
  {
    id: '3',
    slug: 'dassault-falcon-8x',
    name: 'Dassault Falcon 8X',
    manufacturer: 'Dassault',
    category: 'ultra-long-range',
    hourlyRate: 9500,
    passengers: 14,
    range: 6450,
    speed: 460,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90',
      'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'2"',
      cabinWidth: '7\'8"',
      cabinLength: '42\'8"',
      baggageCapacity: '140 cu ft',
    },
    description: 'French elegance meets exceptional performance. The Falcon 8X offers a quiet, spacious cabin and can access challenging airports other jets cannot reach.',
    amenities: ['Sky Ceiling', 'Full Galley', 'Bedroom Suite', 'WiFi', 'Entertainment System'],
    available: ['Paris', 'London', 'Dubai', 'New York'],
    featured: true,
  },
  {
    id: '4',
    slug: 'cessna-citation-longitude',
    name: 'Cessna Citation Longitude',
    manufacturer: 'Cessna',
    category: 'super-midsize',
    hourlyRate: 5800,
    passengers: 12,
    range: 3500,
    speed: 476,
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=90',
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'0"',
      cabinWidth: '6\'5"',
      cabinLength: '25\'0"',
      baggageCapacity: '112 cu ft',
    },
    description: 'The Citation Longitude delivers class-leading performance with the quietest cabin in its category. Perfect for coast-to-coast business travel.',
    amenities: ['Flat-Floor Cabin', 'Full Refreshment Center', 'WiFi', 'Power Outlets', 'Premium Audio'],
    available: ['All Locations'],
    featured: true,
  },
  {
    id: '5',
    slug: 'embraer-praetor-600',
    name: 'Embraer Praetor 600',
    manufacturer: 'Embraer',
    category: 'super-midsize',
    hourlyRate: 5200,
    passengers: 12,
    range: 4018,
    speed: 466,
    image: 'https://images.unsplash.com/photo-1529629468193-01b5e246178c?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1529629468193-01b5e246178c?w=1200&q=90',
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'0"',
      cabinWidth: '6\'10"',
      cabinLength: '24\'0"',
      baggageCapacity: '155 cu ft',
    },
    description: 'Brazilian engineering excellence with transatlantic range. The Praetor 600 offers the best-in-class technology with a stunning interior.',
    amenities: ['Stone Flooring', 'Full Galley', 'WiFi', 'Climate Control', 'Entertainment'],
    available: ['Miami', 'São Paulo', 'London'],
    featured: true,
  },
  {
    id: '6',
    slug: 'bombardier-challenger-350',
    name: 'Bombardier Challenger 350',
    manufacturer: 'Bombardier',
    category: 'super-midsize',
    hourlyRate: 4800,
    passengers: 10,
    range: 3200,
    speed: 448,
    image: 'https://images.unsplash.com/photo-1567942712661-82b9b407abbf?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1567942712661-82b9b407abbf?w=1200&q=90',
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'1"',
      cabinWidth: '7\'2"',
      cabinLength: '25\'2"',
      baggageCapacity: '106 cu ft',
    },
    description: 'The world\'s best-selling super-midsize jet. The Challenger 350 combines exceptional performance with a spacious, comfortable cabin.',
    amenities: ['Flat Floor', 'Full Galley', 'WiFi', 'Entertainment System', 'USB Charging'],
    available: ['All Locations'],
    featured: false,
  },
  {
    id: '7',
    slug: 'learjet-75-liberty',
    name: 'Learjet 75 Liberty',
    manufacturer: 'Bombardier',
    category: 'light',
    hourlyRate: 3200,
    passengers: 8,
    range: 2080,
    speed: 465,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=90',
      'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '4\'11"',
      cabinWidth: '5\'1"',
      cabinLength: '17\'8"',
      baggageCapacity: '65 cu ft',
    },
    description: 'The legendary Learjet combines iconic style with modern performance. Perfect for regional travel with the speed and agility the brand is known for.',
    amenities: ['WiFi', 'Refreshment Center', 'Entertainment', 'Executive Seating'],
    available: ['Miami', 'New York', 'Chicago', 'Dallas'],
    featured: false,
  },
  {
    id: '8',
    slug: 'phenom-300e',
    name: 'Embraer Phenom 300E',
    manufacturer: 'Embraer',
    category: 'light',
    hourlyRate: 2800,
    passengers: 8,
    range: 2010,
    speed: 453,
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=90',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '4\'11"',
      cabinWidth: '5\'1"',
      cabinLength: '17\'2"',
      baggageCapacity: '84 cu ft',
    },
    description: 'The best-selling light jet in the world. The Phenom 300E offers outstanding efficiency and a beautifully appointed cabin.',
    amenities: ['WiFi', 'Refreshment Center', 'USB Ports', 'Entertainment System'],
    available: ['All Locations'],
    featured: true,
  },
  {
    id: '9',
    slug: 'citation-cj4',
    name: 'Cessna Citation CJ4',
    manufacturer: 'Cessna',
    category: 'light',
    hourlyRate: 2600,
    passengers: 7,
    range: 2165,
    speed: 451,
    image: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=1200&q=90',
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '4\'9"',
      cabinWidth: '4\'10"',
      cabinLength: '17\'4"',
      baggageCapacity: '77 cu ft',
    },
    description: 'The Citation CJ4 represents the pinnacle of the Citation Jet series. Exceptional single-pilot capability with impressive range.',
    amenities: ['WiFi', 'Refreshment Center', 'Entertainment', 'Lavatory'],
    available: ['Miami', 'Los Angeles', 'Las Vegas'],
    featured: false,
  },
  {
    id: '10',
    slug: 'gulfstream-g650er',
    name: 'Gulfstream G650ER',
    manufacturer: 'Gulfstream',
    category: 'heavy',
    hourlyRate: 9800,
    passengers: 18,
    range: 7500,
    speed: 516,
    image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=1200&q=90',
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '6\'5"',
      cabinWidth: '8\'6"',
      cabinLength: '53\'7"',
      baggageCapacity: '195 cu ft',
    },
    description: 'The G650ER is the epitome of performance and luxury. Non-stop capability from New York to Dubai or Los Angeles to Sydney.',
    amenities: ['16 Panoramic Windows', 'Four Living Areas', 'Full Galley', 'Crew Rest', 'Satellite Communications'],
    available: ['Miami', 'New York', 'Dubai', 'Singapore'],
    featured: true,
  },
  {
    id: '11',
    slug: 'hawker-800xp',
    name: 'Hawker 800XP',
    manufacturer: 'Hawker Beechcraft',
    category: 'midsize',
    hourlyRate: 3800,
    passengers: 8,
    range: 2540,
    speed: 402,
    image: 'https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a?w=1200&q=90',
      'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '5\'9"',
      cabinWidth: '6\'0"',
      cabinLength: '21\'4"',
      baggageCapacity: '49 cu ft',
    },
    description: 'A proven performer with British heritage. The Hawker 800XP offers exceptional value with a comfortable, stand-up cabin.',
    amenities: ['WiFi', 'Refreshment Center', 'Entertainment', 'Club Seating'],
    available: ['All Locations'],
    featured: false,
  },
  {
    id: '12',
    slug: 'citation-xls-plus',
    name: 'Cessna Citation XLS+',
    manufacturer: 'Cessna',
    category: 'midsize',
    hourlyRate: 4200,
    passengers: 9,
    range: 2100,
    speed: 441,
    image: 'https://images.unsplash.com/photo-1558023858-d1ec3b90dc46?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1558023858-d1ec3b90dc46?w=1200&q=90',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90',
    ],
    specs: {
      cabinHeight: '5\'8"',
      cabinWidth: '5\'6"',
      cabinLength: '18\'8"',
      baggageCapacity: '90 cu ft',
    },
    description: 'The best-selling midsize business jet. The XLS+ delivers exceptional short-field performance with a spacious cabin.',
    amenities: ['WiFi', 'Full Refreshment Center', 'Entertainment', 'Lavatory', 'Climate Control'],
    available: ['All Locations'],
    featured: false,
  },
]

export function getJetBySlug(slug: string): PrivateJet | undefined {
  return privateJets.find(jet => jet.slug === slug)
}

export function getFeaturedJets(): PrivateJet[] {
  return privateJets.filter(jet => jet.featured)
}

export function getJetsByCategory(category: PrivateJet['category']): PrivateJet[] {
  return privateJets.filter(jet => jet.category === category)
}

export function getJetsByManufacturer(manufacturer: string): PrivateJet[] {
  return privateJets.filter(jet => jet.manufacturer === manufacturer)
}
