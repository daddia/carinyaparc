import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carinya Parc',
  description: 'A regenerative farm in NSW, Australia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
