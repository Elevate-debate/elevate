'use client';

import './globals.css';
import { useState } from 'react';
import CircuitTicker from '@/components/CircuitTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased selection:bg-[#dfaa9b] selection:text-ink">
        <CircuitTicker />
        <Navbar
          onOpenAuth={() => setAuthModalOpen(true)}
        />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Global Modals */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </body>
    </html>
  );
}
