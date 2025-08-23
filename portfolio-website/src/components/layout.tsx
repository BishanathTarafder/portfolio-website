'use client';

import dynamic from 'next/dynamic';
import { Header } from './header';
import { Footer } from './footer';
import { ErrorBoundary } from './error-boundary';

// Import the Chatbot with no SSR to avoid hydration issues
const Chatbot = dynamic(
  () => import('./chatbot'),
  { ssr: false }
);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="flex-grow pt-16">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
      <ErrorBoundary
        fallback={
          <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-md shadow-lg">
            Chat is currently unavailable
          </div>
        }
      >
        <Chatbot />
      </ErrorBoundary>
    </div>
  );
}