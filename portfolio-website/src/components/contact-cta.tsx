'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function ContactCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-AAprimary to-AAsecondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Interested in working together?
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I&apos;m currently available for freelance projects, full-time positions, and consulting work.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link 
            href="/contact" 
            className="inline-block bg-white text-AAprimary hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}