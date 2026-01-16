'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';

export function Hero() {
  // Use intersection observer for viewport-based animation
  const [heroRef, heroVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  // Apply staggered animations when hero section becomes visible
  useEffect(() => {
    if (heroVisible) {
      const heroElements = document.querySelectorAll('.hero [data-delay]');
      
      heroElements.forEach(element => {
        const delay = parseInt(element.getAttribute('data-delay') || '0');
        
        setTimeout(() => {
          element.classList.add('fadeInUp');
          element.classList.remove('opacity-0');
        }, delay);
      });
    }
  }, [heroVisible]);
  
  // Enhanced animation effect for initial page load
  useEffect(() => {
    // Only run this effect once on initial load
    const animateHeroOnLoad = () => {
      const heroElements = document.querySelectorAll('.hero [data-delay]');
      
      heroElements.forEach(element => {
        // Set initial state
        element.classList.add('opacity-0');
        element.style.transform = 'translateY(10px)';
      });
    };
    
    // Run animation setup immediately
    animateHeroOnLoad();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="hero min-h-screen flex items-center" 
      ref={heroRef as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="opacity-0 text-accent-color text-lg md:text-xl font-mono mb-4" data-delay="0">
          Hi, my name is
        </h1>
        
        <div 
          className="name opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4"
          data-delay="200"
        >
          Bishanath Tarafder
        </div>
        
        <div 
          className="tagline opacity-0 text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-400 mb-6 md:mb-8"
          data-delay="400"
        >
          I build things for the web
        </div>
        
        <p 
          className="opacity-0 text-gray-400 text-base md:text-lg max-w-xl mb-8 md:mb-12"
          data-delay="600"
        >
          I'm a software engineer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products at a startup.
        </p>
        
        <div
          className="hero-buttons opacity-0 flex gap-4 md:gap-6"
          data-delay="800"
        >
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            className="btn bg-accent-color text-background-color border-2 border-accent-color hover:bg-transparent hover:text-accent-color transition-all duration-300 py-3 px-6 rounded-md font-semibold relative overflow-hidden"
          >
            Check out my work
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-outline bg-transparent border-2 border-accent-color text-accent-color hover:bg-accent-color hover:text-background-color transition-all duration-300 py-3 px-6 rounded-md font-semibold relative overflow-hidden"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}