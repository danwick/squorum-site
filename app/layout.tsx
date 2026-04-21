import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Squorum — Find Pickleball Courts',
    template: '%s | Squorum',
  },
  description:
    'Find pickleball courts near you. Court details, amenities, indoor/outdoor, and availability for Minnesota and Iowa.',
  metadataBase: new URL('https://squorum.com'),
  openGraph: {
    type: 'website',
    siteName: 'Squorum',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <nav className="border-b border-border px-4 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <Link href="/" className="font-semibold text-lg tracking-tight">
            Squorum
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/courts" className="text-muted-foreground hover:text-foreground transition-colors">
              Courts
            </Link>
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
