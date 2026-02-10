export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Jorky Bautista',
    role: 'CEO & Founder',
    bio: 'With over two decades in the luxury yachting industry, Jorky founded Yacht Group International with a vision to redefine what personalized luxury service means. His deep relationships within the maritime community and passion for excellence drive the company\'s commitment to unparalleled experiences.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85',
  },
  {
    id: '2',
    name: 'Fitzgerald Heslop',
    role: 'Chief Experience Officer',
    bio: 'Fitzgerald brings a unique perspective to luxury travel, having spent years managing five-star hotels and private estates. He oversees every aspect of the client experience, ensuring that each journey exceeds expectations from first contact to final farewell.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85',
  },
  {
    id: '3',
    name: 'Tianna Wong',
    role: 'Director of Events',
    bio: 'Tianna transforms ordinary moments into extraordinary memories. From intimate sunset dinners on deck to grand celebrations in port, she orchestrates experiences that become the highlight of any voyage.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85',
  },
  {
    id: '4',
    name: 'William Robinson',
    role: 'Senior Charter Consultant',
    bio: 'William\'s encyclopedic knowledge of the global yacht fleet and destination expertise makes him an invaluable resource for clients seeking their perfect charter. His attention to detail ensures every aspect of the journey is precisely tailored.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85',
  },
  {
    id: '5',
    name: 'Brooks Hodnette',
    role: 'Yacht Sales Specialist',
    bio: 'Brooks brings deep market expertise and a global network to every transaction. Whether representing buyers or sellers, his discretion and professionalism have earned the trust of the industry\'s most discerning clients.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=85',
  },
]
