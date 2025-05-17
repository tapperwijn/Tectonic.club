import './globals.css';
import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import ThemeLayout from '@/components/layout/ThemeLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Tectonic - The Ultimate Puzzle Game',
  description: 'Challenge your mind with Tectonic - a modern puzzle game that tests your logic skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  return (
    <html lang="en" suppressHydrationWarning><body className={`${inter.variable} ${dmSans.variable} font-sans min-h-screen flex flex-col`}><ThemeLayout>{children}</ThemeLayout></body></html>
  );
}