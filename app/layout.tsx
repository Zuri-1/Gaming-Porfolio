import type { Metadata } from 'next'
import { Press_Start_2P, VT323, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel'
})

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-terminal'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'PLAYER_ONE // Developer Portfolio',
  description: 'Retro FPS-themed developer portfolio - Navigate through missions, view stats, and explore projects',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pressStart.variable} ${vt323.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-hud-bg">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
