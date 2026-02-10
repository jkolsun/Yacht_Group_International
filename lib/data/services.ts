export interface ServiceHighlight {
  number: string
  label: string
  description: string
}

export interface ServiceFeatureBlock {
  title: string
  description: string
  image: string
}

export interface Service {
  id: string
  slug: string
  name: string
  tagline: string
  label: string
  number: string
  image: string
  heroImage: string
  description: string
  longDescription: string
  features: string[]
  highlights: ServiceHighlight[]
  featureBlocks: ServiceFeatureBlock[]
  gallery: string[]
  cta: string
  ctaDescription: string
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'yacht-charters',
    name: 'Yacht Charters',
    tagline: 'Tailored voyages aboard the world\'s finest vessels',
    label: 'Charter',
    number: '01',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&q=90',
    heroImage: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1920&q=90',
    description: 'Experience the ultimate freedom on the water with our curated yacht charter services.',
    longDescription: 'Every route, every detail, shaped to your vision. From intimate coastal explorations to extended Mediterranean voyages, we craft journeys that transcend expectations. Our fleet ranges from sleek 60-foot sailing yachts to magnificent 300-foot superyachts, each selected for excellence in design, performance, and service.',
    features: [
      'Access to 200+ luxury yachts worldwide',
      'Professional captain and crew',
      'Customized itineraries',
      'Gourmet cuisine and wine selection',
      'Water sports and toys included',
      '24/7 concierge support',
    ],
    highlights: [
      { number: '200+', label: 'Luxury Yachts', description: 'Curated fleet worldwide' },
      { number: '9', label: 'Destinations', description: 'Global coverage' },
      { number: '24/7', label: 'Concierge', description: 'Always available' },
    ],
    featureBlocks: [
      {
        title: 'Bespoke Itineraries',
        description: 'Every voyage is crafted around your desires. Whether you seek hidden coves in the Greek Islands, the glamour of the French Riviera, or adventure in the Caribbean, our specialists design routes that reveal each destination\'s most extraordinary experiences.',
        image: 'https://images.unsplash.com/photo-1559599238-308793637427?w=1200&q=90',
      },
      {
        title: 'Exceptional Crew',
        description: 'Our captains and crews are selected from the world\'s finest maritime professionals. From Michelin-trained chefs to experienced water sports instructors, every member is dedicated to exceeding your expectations.',
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=90',
      },
      {
        title: 'Onboard Excellence',
        description: 'Experience floating luxury with amenities that rival the world\'s finest hotels. Infinity pools, cinema rooms, spas, and beach clubs—each vessel offers a unique interpretation of maritime opulence.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1559599238-308793637427?w=800&q=90',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=90',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=90',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=90',
    ],
    cta: 'Explore Fleet',
    ctaDescription: 'Ready to embark on your journey? Our charter specialists are standing by to craft your perfect voyage.',
  },
  {
    id: '2',
    slug: 'yacht-sales',
    name: 'Yacht Sales',
    tagline: 'Discreet brokerage for acquisition and sale',
    label: 'Acquisition',
    number: '02',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1400&q=90',
    heroImage: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1920&q=90',
    description: 'Navigate the world of yacht ownership with expert guidance.',
    longDescription: 'Our brokerage team provides discreet, professional representation for both buyers and sellers. With decades of combined experience and a network spanning the globe, we access off-market vessels and exclusive listings that never reach public markets. From initial consultation to final registration, we guide you through every step.',
    features: [
      'Off-market vessel access',
      'Comprehensive market analysis',
      'Survey and inspection coordination',
      'Negotiation representation',
      'Flag state registration assistance',
      'Crew recruitment services',
    ],
    highlights: [
      { number: '$2B+', label: 'In Sales', description: 'Total transaction value' },
      { number: '150+', label: 'Vessels Sold', description: 'Successful transactions' },
      { number: '100%', label: 'Discretion', description: 'Confidential service' },
    ],
    featureBlocks: [
      {
        title: 'Market Intelligence',
        description: 'Our analysts continuously monitor the global yacht market, providing you with real-time insights on pricing trends, new builds, and emerging opportunities. Make informed decisions backed by comprehensive data.',
        image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90',
      },
      {
        title: 'Off-Market Access',
        description: 'The most desirable yachts often change hands before reaching public listings. Our relationships with owners, shipyards, and fellow brokers worldwide give you access to vessels others simply cannot find.',
        image: 'https://images.unsplash.com/photo-1559599238-308793637427?w=1200&q=90',
      },
      {
        title: 'Turnkey Ownership',
        description: 'From survey coordination to crew hiring, flag registration to insurance, we manage every aspect of the acquisition process. Step aboard your new vessel knowing every detail has been addressed.',
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=90',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=90',
      'https://images.unsplash.com/photo-1559599238-308793637427?w=800&q=90',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=90',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=90',
    ],
    cta: 'View Listings',
    ctaDescription: 'Whether buying or selling, our brokerage team is ready to represent your interests with discretion and expertise.',
  },
  {
    id: '3',
    slug: 'private-jets',
    name: 'Private Jets',
    tagline: 'Seamless air travel coordinated with your maritime itinerary',
    label: 'Aviation',
    number: '03',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1400&q=90',
    heroImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=90',
    description: 'One call, complete mobility.',
    longDescription: 'Our aviation services ensure seamless transitions from runway to deck. Whether you need a light jet for quick hops between ports or a long-range aircraft for intercontinental travel, we coordinate every detail. Helicopter transfers to remote anchorages, customs pre-clearance, and in-flight catering matched to your preferences—experience air travel redefined.',
    features: [
      'Access to 68+ private jets',
      'Empty leg availability',
      'Helicopter transfers',
      'Customs and immigration expediting',
      'In-flight catering',
      'Ground transportation coordination',
    ],
    highlights: [
      { number: '68+', label: 'Aircraft', description: 'Global fleet access' },
      { number: '4hrs', label: 'Notice', description: 'Minimum booking time' },
      { number: '500+', label: 'Airports', description: 'Worldwide network' },
    ],
    featureBlocks: [
      {
        title: 'Seamless Integration',
        description: 'Your yacht itinerary informs your flight schedule. We coordinate arrivals and departures to minimize wait times and maximize your time at sea. One team, one vision, complete harmony.',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
      },
      {
        title: 'Helicopter Transfers',
        description: 'When your yacht anchors in remote bays or busy harbors, helicopter transfers provide direct access. Land on your yacht\'s helipad or transfer via nearby helipads—we arrange every detail.',
        image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=90',
      },
      {
        title: 'Empty Leg Opportunities',
        description: 'Significant savings on repositioning flights. Our team monitors empty leg availability across our network, alerting you to opportunities that match your travel needs.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=90',
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=90',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=90',
      'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=90',
    ],
    cta: 'Learn More',
    ctaDescription: 'From short hops to transcontinental journeys, our aviation team ensures you travel in uncompromising comfort.',
  },
  {
    id: '4',
    slug: 'exotic-cars',
    name: 'Exotic Cars',
    tagline: 'The world\'s most exclusive automobiles at your command',
    label: 'Automotive',
    number: '04',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=90',
    heroImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90',
    description: 'Continue your luxury experience on land.',
    longDescription: 'From the streets of Monaco to the coastal highways of Miami, arrive in unparalleled style with marques that match your vessel. Our collection features the world\'s most coveted automobiles—Ferrari, Lamborghini, Rolls-Royce, Bentley, and more—delivered directly to your yacht or awaiting you at the airport.',
    features: [
      'Ferrari, Lamborghini, Rolls-Royce',
      'Convertibles and SUVs available',
      'Delivered to yacht or airport',
      'Full insurance coverage',
      'Concierge driving service optional',
      'Multi-city rentals',
    ],
    highlights: [
      { number: '167+', label: 'Vehicles', description: 'Premium collection' },
      { number: '15+', label: 'Marques', description: 'World-class brands' },
      { number: '12', label: 'Cities', description: 'Global availability' },
    ],
    featureBlocks: [
      {
        title: 'Curated Collection',
        description: 'From the raw power of a Ferrari 812 Superfast to the serene luxury of a Rolls-Royce Phantom, our fleet represents the pinnacle of automotive excellence. Each vehicle is maintained to factory specifications and presented immaculately.',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=90',
      },
      {
        title: 'Delivered to You',
        description: 'Your vehicle awaits exactly where you need it—on the marina dock, at the airport FBO, or your hotel entrance. We coordinate delivery timing with your yacht\'s arrival for seamless transitions.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90',
      },
      {
        title: 'Chauffeur Services',
        description: 'Prefer to be driven? Our professional chauffeurs know every destination intimately. Relax in the rear of a Maybach or Bentley while your driver navigates to the finest restaurants, clubs, and experiences.',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=90',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=90',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=90',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=90',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=90',
    ],
    cta: 'Browse Collection',
    ctaDescription: 'Explore our automotive collection and discover the perfect complement to your maritime journey.',
  },
  {
    id: '5',
    slug: 'villas',
    name: 'Villa Rentals',
    tagline: 'Curated estates for the complete luxury experience',
    label: 'Lifestyle',
    number: '05',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
    description: 'Extend your journey ashore in exceptional properties.',
    longDescription: 'Our villa portfolio spans the world\'s most coveted destinations, from Mediterranean clifftops to Caribbean beachfronts. Each property is personally inspected and selected for its exceptional quality, location, and service standards. Whether you seek a romantic hideaway or an estate for entertaining, we match you with the perfect residence.',
    features: [
      '265+ luxury villas worldwide',
      'Private chef services',
      'Housekeeping and butler',
      'Pool and spa facilities',
      'Event hosting capability',
      'Security services available',
    ],
    highlights: [
      { number: '265+', label: 'Villas', description: 'Curated portfolio' },
      { number: '45+', label: 'Destinations', description: 'Global presence' },
      { number: '5-Star', label: 'Service', description: 'Hotel-level care' },
    ],
    featureBlocks: [
      {
        title: 'Exceptional Locations',
        description: 'Cliffside retreats in Santorini, beachfront estates in St. Barths, Tuscan wine country villas—our portfolio encompasses the world\'s most desirable addresses. Each property offers privacy, views, and access to extraordinary experiences.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90',
      },
      {
        title: 'Full-Service Living',
        description: 'Experience the service of a five-star hotel in the privacy of your own villa. Private chefs, housekeeping, butlers, and concierge services ensure every moment exceeds expectations.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
      },
      {
        title: 'Yacht & Villa Packages',
        description: 'Combine sea and land for the ultimate experience. Cruise the coast by day, then retreat to your private villa each evening. We coordinate every detail for seamless transitions.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=90',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=90',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=90',
      'https://images.unsplash.com/photo-1600585154526-ffa5f5f6d0f3?w=800&q=90',
    ],
    cta: 'Discover Villas',
    ctaDescription: 'From intimate escapes to grand estates, discover the perfect property for your next chapter ashore.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}
