'use client';

import dynamic from 'next/dynamic';
import { Header } from './header';
import { Footer } from './footer';

// Import the Chatbot with no SSR to avoid hydration issues
const Chatbot = dynamic(
  () => import('./chatbot'),
  { ssr: false }
);

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}