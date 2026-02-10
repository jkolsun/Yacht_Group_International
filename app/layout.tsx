import type { Metadata } from 'next'
import { Navigation, Footer, CustomCursor, Loader } from '@/components/layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yacht Group International | Luxury Yacht Charters & Sales',
  description: 'Where luxury meets the horizon. Premium yacht charters, sales, private jets, exotic cars, and villa rentals worldwide. Experience unparalleled luxury with Yacht Group International.',
  keywords: 'yacht charter, yacht sales, luxury yacht, superyacht, private jet, exotic car rental, villa rental, Miami yacht, Mediterranean yacht',
  openGraph: {
    title: 'Yacht Group International',
    description: 'Where luxury meets the horizon. Premium yacht charters, sales, and lifestyle services.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
