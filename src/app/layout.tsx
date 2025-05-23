import type { Metadata } from 'next';
import './globals.css';
import { inter, bricolageGrotesque } from '../lib/fonts';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple Todo App to organize your tasks and set priorities',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${inter.variable} ${bricolageGrotesque.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
