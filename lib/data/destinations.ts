export interface Destination {
  id: string
  slug: string
  name: string
  region: string
  image: string
  heroImage: string
  description: string
  highlights: string[]
  bestSeason: string
  featured: boolean
}

export const destinations: Destination[] = [
  {
    id: '1',
    slug: 'miami',
    name: 'Miami',
    region: 'South Florida',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1920&q=90',
    description: 'Miami offers a unique blend of cosmopolitan energy and tropical paradise. From the Art Deco architecture of South Beach to the exclusive marinas of Miami Beach, this vibrant city is the perfect launchpad for your yachting adventure.',
    highlights: ['South Beach nightlife', 'Art Deco Historic District', 'Biscayne Bay cruising', 'Fisher Island', 'Star Island celebrity homes'],
    bestSeason: 'Year-round, peak season November-April',
    featured: true,
  },
  {
    id: '2',
    slug: 'monaco',
    name: 'Monaco',
    region: 'French Riviera',
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=1920&q=90',
    description: 'The principality of Monaco represents the ultimate in Mediterranean luxury. Home to the famous Monte Carlo Casino and the Monaco Yacht Show, this tiny nation draws the world\'s most prestigious yachts to its legendary harbor.',
    highlights: ['Monte Carlo Casino', 'Monaco Grand Prix route', 'Port Hercule', 'Prince\'s Palace', 'Oceanographic Museum'],
    bestSeason: 'May-September',
    featured: true,
  },
  {
    id: '3',
    slug: 'greece',
    name: 'Greece',
    region: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=90',
    description: 'The Greek islands offer an unparalleled yachting experience with crystalline waters, ancient history, and legendary hospitality. From the iconic Santorini sunsets to the party islands of Mykonos, Greece delivers unforgettable memories.',
    highlights: ['Santorini caldera', 'Mykonos beaches', 'Ancient Delos', 'Corfu old town', 'Hydra island'],
    bestSeason: 'June-September',
    featured: true,
  },
  {
    id: '4',
    slug: 'dubai',
    name: 'Dubai',
    region: 'Arabian Gulf',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90',
    description: 'Dubai represents the future of luxury, where visionary architecture meets Arabian tradition. Cruise past the Palm Jumeirah, anchor beneath the Burj Al Arab, and experience hospitality that knows no limits.',
    highlights: ['Palm Jumeirah', 'Burj Al Arab', 'Dubai Marina', 'The World Islands', 'Desert excursions'],
    bestSeason: 'November-April',
    featured: true,
  },
  {
    id: '5',
    slug: 'hamptons',
    name: 'The Hamptons',
    region: 'New York',
    image: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?w=1920&q=90',
    description: 'The Hamptons represent East Coast elegance at its finest. This summer playground of New York\'s elite offers pristine beaches, world-class dining, and a sophisticated social scene.',
    highlights: ['Montauk Point', 'Sag Harbor village', 'Southampton beaches', 'East Hampton farms', 'Celebrity estates'],
    bestSeason: 'June-September',
    featured: true,
  },
  {
    id: '6',
    slug: 'sardinia',
    name: 'Sardinia',
    region: 'Italy',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1920&q=90',
    description: 'Sardinia\'s Costa Smeralda is the ultimate Mediterranean playground. Emerald waters, exclusive beach clubs, and Italian glamour combine to create an unforgettable yachting destination.',
    highlights: ['Costa Smeralda', 'Porto Cervo', 'La Maddalena archipelago', 'Cala di Volpe', 'Emerald coast beaches'],
    bestSeason: 'June-September',
    featured: true,
  },
  {
    id: '7',
    slug: 'cabo',
    name: 'Cabo San Lucas',
    region: 'Mexico',
    image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1920&q=90',
    description: 'Where the Pacific meets the Sea of Cortez, Cabo San Lucas offers dramatic desert landscapes, world-class sport fishing, and legendary nightlife. The iconic Arch of Cabo marks the gateway to adventure.',
    highlights: ['El Arco', 'Lover\'s Beach', 'Sport fishing', 'Whale watching', 'Desert landscapes'],
    bestSeason: 'November-May',
    featured: false,
  },
  {
    id: '8',
    slug: 'california',
    name: 'California',
    region: 'West Coast',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=90',
    description: 'The California coast offers diverse yachting experiences, from the glamour of Newport Beach to the natural beauty of Channel Islands. Year-round sunshine and stunning coastline await.',
    highlights: ['Newport Beach', 'Catalina Island', 'Channel Islands', 'Malibu coast', 'San Diego Bay'],
    bestSeason: 'Year-round',
    featured: false,
  },
  {
    id: '9',
    slug: 'france',
    name: 'French Riviera',
    region: "Côte d'Azur",
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85',
    heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=90',
    description: 'The French Riviera epitomizes Mediterranean glamour. From the film festival of Cannes to the old-world charm of Saint-Tropez, the Côte d\'Azur has captivated the world\'s elite for over a century.',
    highlights: ['Saint-Tropez', 'Cannes', 'Nice', 'Cap Ferrat', 'Île Sainte-Marguerite'],
    bestSeason: 'May-September',
    featured: false,
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(dest => dest.slug === slug)
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter(dest => dest.featured)
}
