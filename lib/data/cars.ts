export interface ExoticCar {
  id: string
  slug: string
  name: string
  brand: string
  category: 'supercar' | 'luxury' | 'suv' | 'convertible'
  dailyRate: number
  weeklyRate: number
  image: string
  images: string[]
  specs: {
    horsepower: string
    topSpeed: string
    acceleration: string
    transmission: string
  }
  description: string
  features: string[]
  available: string[]
  featured: boolean
}

export const exoticCars: ExoticCar[] = [
  {
    id: '1',
    slug: 'ferrari-sf90-stradale',
    name: 'SF90 Stradale',
    brand: 'Ferrari',
    category: 'supercar',
    dailyRate: 3500,
    weeklyRate: 21000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=90',
      'https://images.unsplash.com/photo-1592198084033-aade902d1f11?w=1200&q=90',
    ],
    specs: {
      horsepower: '986 HP',
      topSpeed: '211 mph',
      acceleration: '2.5s 0-60',
      transmission: '8-Speed DCT',
    },
    description: 'Ferrari\'s first plug-in hybrid supercar, combining three electric motors with a twin-turbo V8 for unprecedented performance.',
    features: ['Hybrid Powertrain', 'Carbon Fiber Body', 'Active Aerodynamics', 'Racing Heritage'],
    available: ['Miami', 'Monaco', 'Dubai'],
    featured: true,
  },
  {
    id: '2',
    slug: 'lamborghini-huracan-evo',
    name: 'Huracán EVO Spyder',
    brand: 'Lamborghini',
    category: 'convertible',
    dailyRate: 2800,
    weeklyRate: 16800,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=90',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=90',
    ],
    specs: {
      horsepower: '631 HP',
      topSpeed: '202 mph',
      acceleration: '3.1s 0-60',
      transmission: '7-Speed DCT',
    },
    description: 'The open-top Huracán delivers visceral Italian supercar thrills with the wind in your hair.',
    features: ['Retractable Soft Top', 'All-Wheel Drive', 'LDVI System', 'V10 Engine'],
    available: ['Miami', 'Los Angeles', 'Monaco'],
    featured: true,
  },
  {
    id: '3',
    slug: 'rolls-royce-phantom',
    name: 'Phantom VIII',
    brand: 'Rolls-Royce',
    category: 'luxury',
    dailyRate: 2500,
    weeklyRate: 15000,
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=90',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=90',
    ],
    specs: {
      horsepower: '563 HP',
      topSpeed: '155 mph',
      acceleration: '5.1s 0-60',
      transmission: '8-Speed Auto',
    },
    description: 'The pinnacle of luxury motoring. Each Phantom is a masterpiece of craftsmanship and refinement.',
    features: ['Starlight Headliner', 'Bespoke Audio', 'Rear Theatre', 'Coach Doors'],
    available: ['All Locations'],
    featured: true,
  },
  {
    id: '4',
    slug: 'bentley-continental-gtc',
    name: 'Continental GTC',
    brand: 'Bentley',
    category: 'convertible',
    dailyRate: 1800,
    weeklyRate: 10800,
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=90',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=90',
    ],
    specs: {
      horsepower: '650 HP',
      topSpeed: '207 mph',
      acceleration: '3.7s 0-60',
      transmission: '8-Speed DCT',
    },
    description: 'Grand touring perfection with the roof down. The Continental GTC combines luxury with exhilarating performance.',
    features: ['W12 Engine', 'All-Wheel Drive', 'Naim Audio', 'Mulliner Interior'],
    available: ['Miami', 'Monaco', 'London'],
    featured: true,
  },
  {
    id: '5',
    slug: 'mclaren-720s-spider',
    name: '720S Spider',
    brand: 'McLaren',
    category: 'supercar',
    dailyRate: 2600,
    weeklyRate: 15600,
    image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200&q=90',
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=90',
    ],
    specs: {
      horsepower: '710 HP',
      topSpeed: '212 mph',
      acceleration: '2.8s 0-60',
      transmission: '7-Speed DCT',
    },
    description: 'British engineering excellence with breathtaking performance and a retractable hardtop.',
    features: ['Carbon Monocoque', 'Retractable Hardtop', 'Proactive Chassis', 'Variable Drift Control'],
    available: ['Miami', 'Los Angeles', 'Dubai'],
    featured: true,
  },
  {
    id: '6',
    slug: 'porsche-911-turbo-s',
    name: '911 Turbo S Cabriolet',
    brand: 'Porsche',
    category: 'convertible',
    dailyRate: 1600,
    weeklyRate: 9600,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=90',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f373e?w=1200&q=90',
    ],
    specs: {
      horsepower: '640 HP',
      topSpeed: '205 mph',
      acceleration: '2.6s 0-60',
      transmission: '8-Speed PDK',
    },
    description: 'The benchmark for everyday supercar usability combined with track-ready performance.',
    features: ['Twin-Turbo Flat-Six', 'All-Wheel Drive', 'Rear-Axle Steering', 'Sport Chrono'],
    available: ['All Locations'],
    featured: false,
  },
  {
    id: '7',
    slug: 'mercedes-amg-gt-black',
    name: 'AMG GT Black Series',
    brand: 'Mercedes-AMG',
    category: 'supercar',
    dailyRate: 3200,
    weeklyRate: 19200,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=90',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=90',
    ],
    specs: {
      horsepower: '720 HP',
      topSpeed: '202 mph',
      acceleration: '3.1s 0-60',
      transmission: '7-Speed DCT',
    },
    description: 'The most powerful AMG ever built. Track-focused aggression meets road-legal exclusivity.',
    features: ['Flat-Plane Crank V8', 'Active Aero', 'Carbon Ceramic Brakes', 'Racing Seats'],
    available: ['Miami', 'Monaco'],
    featured: true,
  },
  {
    id: '8',
    slug: 'range-rover-sv',
    name: 'Range Rover SV',
    brand: 'Range Rover',
    category: 'suv',
    dailyRate: 1200,
    weeklyRate: 7200,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=90',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=90',
    ],
    specs: {
      horsepower: '523 HP',
      topSpeed: '155 mph',
      acceleration: '4.4s 0-60',
      transmission: '8-Speed Auto',
    },
    description: 'The ultimate luxury SUV. Perfect for exploring coastlines or making an entrance at the marina.',
    features: ['Executive Class Seating', 'Terrain Response', 'Meridian Signature', 'Air Suspension'],
    available: ['All Locations'],
    featured: false,
  },
  {
    id: '9',
    slug: 'lamborghini-urus',
    name: 'Urus Performante',
    brand: 'Lamborghini',
    category: 'suv',
    dailyRate: 1800,
    weeklyRate: 10800,
    image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?w=1200&q=90',
      'https://images.unsplash.com/photo-1669215420018-098507ec5c04?w=1200&q=90',
    ],
    specs: {
      horsepower: '657 HP',
      topSpeed: '190 mph',
      acceleration: '3.3s 0-60',
      transmission: '8-Speed Auto',
    },
    description: 'The world\'s first Super SUV. Unmistakable Lamborghini DNA in a practical package.',
    features: ['Twin-Turbo V8', 'All-Wheel Drive', 'Carbon Ceramics', 'Rally Mode'],
    available: ['Miami', 'Dubai', 'Monaco'],
    featured: true,
  },
  {
    id: '10',
    slug: 'ferrari-roma',
    name: 'Roma',
    brand: 'Ferrari',
    category: 'luxury',
    dailyRate: 2200,
    weeklyRate: 13200,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1f11?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1f11?w=1200&q=90',
      'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=1200&q=90',
    ],
    specs: {
      horsepower: '612 HP',
      topSpeed: '199 mph',
      acceleration: '3.4s 0-60',
      transmission: '8-Speed DCT',
    },
    description: 'La Nuova Dolce Vita. Elegant grand touring with unmistakable Ferrari performance.',
    features: ['Twin-Turbo V8', 'Retractable Hardtop', 'Dual Cockpit', 'Virtual Dials'],
    available: ['Miami', 'Monaco', 'Los Angeles'],
    featured: false,
  },
  {
    id: '11',
    slug: 'aston-martin-dbs',
    name: 'DBS Superleggera Volante',
    brand: 'Aston Martin',
    category: 'convertible',
    dailyRate: 2400,
    weeklyRate: 14400,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=90',
      'https://images.unsplash.com/photo-1596468138838-1d46da3de239?w=1200&q=90',
    ],
    specs: {
      horsepower: '715 HP',
      topSpeed: '211 mph',
      acceleration: '3.6s 0-60',
      transmission: '8-Speed Auto',
    },
    description: 'British grand touring at its finest. The DBS Volante combines brutal power with effortless elegance.',
    features: ['Twin-Turbo V12', 'Carbon Body', 'Bang & Olufsen', 'Super GT Mode'],
    available: ['Monaco', 'London', 'Dubai'],
    featured: true,
  },
  {
    id: '12',
    slug: 'maybach-s680',
    name: 'S 680 4MATIC',
    brand: 'Mercedes-Maybach',
    category: 'luxury',
    dailyRate: 1500,
    weeklyRate: 9000,
    image: 'https://images.unsplash.com/photo-1618843479619-f3d0d81e4d10?w=1200&q=90',
    images: [
      'https://images.unsplash.com/photo-1618843479619-f3d0d81e4d10?w=1200&q=90',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=90',
    ],
    specs: {
      horsepower: '621 HP',
      topSpeed: '155 mph',
      acceleration: '4.4s 0-60',
      transmission: '9-Speed Auto',
    },
    description: 'The ultimate in chauffeured luxury. Every journey becomes a sanctuary of comfort.',
    features: ['Executive Rear Seats', 'Champagne Cooler', 'Magic Sky', 'Burmester 4D'],
    available: ['All Locations'],
    featured: false,
  },
]

export function getCarBySlug(slug: string): ExoticCar | undefined {
  return exoticCars.find(car => car.slug === slug)
}

export function getFeaturedCars(): ExoticCar[] {
  return exoticCars.filter(car => car.featured)
}

export function getCarsByCategory(category: ExoticCar['category']): ExoticCar[] {
  return exoticCars.filter(car => car.category === category)
}

export function getCarsByBrand(brand: string): ExoticCar[] {
  return exoticCars.filter(car => car.brand === brand)
}
