// app/layout.tsx
import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'CLTmobile Fleet | Premium Mobile Fleet Maintenance · Charlotte, NC',
  description: 'Monthly mobile fleet maintenance for Charlotte businesses. Full inspection, any needed service, photo-documented reports — we come to you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}