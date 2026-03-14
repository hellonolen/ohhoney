import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'OhHoney.ai — Intelligence for Women Who Lead',
  description: 'Your personal executive intelligence layer. Curated for women who manage wealth, wellbeing, and legacy at the highest level.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
