import type { Metadata } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

// Only the wordmark weight for now; T04 loads the full UI type set.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-hanken',
});

export const metadata: Metadata = {
  title: 'jobbbs',
  description: 'Personal job radar.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={hanken.variable}>
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
