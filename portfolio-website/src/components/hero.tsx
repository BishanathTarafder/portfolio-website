'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Hi, my name is
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="name"
        >
          Bishanath Tarafder
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          className="tagline"
        >
          I build things for the web
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
        >
          I'm a software engineer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products at a startup.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
          className="hero-buttons"
        >
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            className="btn bg-AAsecondary text-AAprimary border-2 border-AAsecondary hover:bg-transparent hover:text-AAsecondary transition-all duration-300 py-3 px-6 rounded-md font-semibold relative overflow-hidden"
          >
            Check out my work
          </a>
          <a 
            href="https://drive.google.com/file/d/1234567890/view" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-outline bg-transparent border-2 border-AAsecondary text-AAsecondary hover:bg-AAsecondary hover:text-AAprimary transition-all duration-300 py-3 px-6 rounded-md font-semibold relative overflow-hidden"
          >
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}