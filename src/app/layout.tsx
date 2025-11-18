import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/ui/Navigation'
import { AudioControls } from '@/components/ui/AudioControls'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Immersive 3D Blog',
  description: 'Where blog posts are experiences, not just text',
  keywords: ['blog', '3D', 'immersive', 'travel', 'experiences'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Immersive 3D Blog',
    description: 'Where blog posts are experiences, not just text',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <AudioControls />
      </body>
    </html>
  )
}
