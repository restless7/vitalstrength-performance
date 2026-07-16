import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '700', '900'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Vital Strength Performance | Smash Your Limits',
  description: 'Elite physical conditioning, Brazilian Jiu Jitsu, and metabolic optimization in Panama.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
