'use client';

import Link from 'next/link';

export function ContactCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-AAprimary to-AAsecondary text-white contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <div className="section-title">
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 opacity-0"
          >
            Interested in working together?
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto opacity-90 opacity-0"
          >
            I&apos;m currently available for freelance projects, full-time positions, and consulting work.
          </p>
        </div>
        <div
          className="inline-block opacity-0 hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <Link 
            href="#contact" 
            className="inline-block bg-white text-AAprimary hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}