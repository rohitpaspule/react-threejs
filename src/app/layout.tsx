import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/ui/Navigation'
import { AudioControls } from '@/components/ui/AudioControls'

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
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <AudioControls />
      </body>
    </html>
  )
}
