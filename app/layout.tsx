import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const APP_URL = 'https://ohhoney.ai';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'OhHoney — Intelligence Feels Good',
    template: '%s · OhHoney',
  },
  description: 'A private intelligence platform for women who command wealth, wellbeing, and legacy at the highest level.',
  keywords: ['intelligence', 'membership', 'women leaders', 'executive intelligence', 'wealth management', 'luxury lifestyle'],
  authors: [{ name: 'OhHoney', url: APP_URL }],
  creator: 'OhHoney',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'OhHoney',
    title: 'OhHoney — Intelligence Feels Good',
    description: 'A private intelligence platform for women who command wealth, wellbeing, and legacy at the highest level.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OhHoney — Intelligence Feels Good',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OhHoney — Intelligence Feels Good',
    description: 'A private intelligence platform for women who command wealth, wellbeing, and legacy.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
