import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'EasyMove Elite — Premium Luxury Moving',
    template: '%s | EasyMove Elite',
  },
  description:
    'White-glove moving services for discerning clients. Local, long-distance, and international relocations handled with precision and care.',
  keywords: ['luxury moving', 'white glove movers', 'premium relocation', 'fine art moving'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
