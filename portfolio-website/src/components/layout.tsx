'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
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
  useEffect(() => {
    // Helper function to animate elements
    const animateElement = (element: Element, animation: string, delay: number = 0) => {
      setTimeout(() => {
        element.classList.add(animation);
        element.classList.remove('opacity-0');
      }, delay);
    };

    // Create an observer with options
    const observerOptions = {
      root: null, // viewport is the root
      rootMargin: '0px',
      threshold: 0.15 // trigger when at least 15% of the element is visible
    };

    // Track which elements have already been animated
    const animatedElements = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only animate elements that haven't been animated yet
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          animatedElements.add(entry.target);
          
          // Hero section animations are handled by CSS
          
          // Projects section animations
          if (entry.target.id === 'projects' || entry.target.classList.contains('projects')) {
            const title = entry.target.querySelector('.section-title h2');
            const subtitle = entry.target.querySelector('.section-title p');
            const cards = entry.target.querySelectorAll('.project-card');
            
            if (title) animateElement(title, 'fadeInUp', 0);
            if (subtitle) animateElement(subtitle, 'fadeInUp', 200);
            
            cards.forEach((card, index) => {
              animateElement(card, 'fadeInUp', 300 + (index * 200));
            });
          }
          
          // About section animations
          else if (entry.target.id === 'about' || entry.target.classList.contains('about')) {
            const title = entry.target.querySelector('h2');
            const paragraphs = entry.target.querySelectorAll('p');
            const skills = entry.target.querySelector('.skills');
            
            if (title) animateElement(title, 'fadeInUp', 0);
            
            paragraphs.forEach((p, index) => {
              animateElement(p, 'fadeInUp', 200 + (index * 100));
            });
            
            if (skills) animateElement(skills, 'fadeInUp', 500);
          }
          
          // Contact section animations
          else if (entry.target.id === 'contact' || entry.target.classList.contains('contact')) {
            const title = entry.target.querySelector('.section-title h2');
            const subtitle = entry.target.querySelector('.section-title p');
            const form = entry.target.querySelector('form');
            const info = entry.target.querySelector('.contact-info');
            
            if (title) animateElement(title, 'fadeInUp', 0);
            if (subtitle) animateElement(subtitle, 'fadeInUp', 200);
            if (info) animateElement(info, 'fadeInUp', 300);
            if (form) animateElement(form, 'fadeInUp', 400);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      // Initially hide all sections except hero
      if (section.id !== 'hero' && !section.classList.contains('hero')) {
        section.classList.add('opacity-0');
      }
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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