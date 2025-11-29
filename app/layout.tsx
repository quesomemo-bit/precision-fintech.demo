import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PRECISION - Science-Based Agriculture Investments',
  description:
    'Derisk agriculture investments in emerging markets through science-based risk scoring',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-graphite-950 text-graphite-100`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 max-w-6xl mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
