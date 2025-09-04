import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AdRemix AI',
  description: 'Spin up social ad variations and post them instantly',
  openGraph: {
    title: 'AdRemix AI',
    description: 'Spin up social ad variations and post them instantly',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
