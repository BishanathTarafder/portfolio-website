'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-32 py-16 sm:py-20">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-AAsecondary font-mono text-sm sm:text-base mb-2 sm:mb-4"
        >
          Hi, my name is
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-200 mb-2 sm:mb-4"
        >
          Saidul Mursalin Khan.
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-400 mb-4 sm:mb-8"
        >
          I build things for the web.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400 max-w-xl mb-8 sm:mb-12 text-base sm:text-lg"
        >
          I&apos;m a software engineer specializing in building exceptional digital experiences. 
          Currently, I&apos;m focused on building accessible, human-centered products 
          in the javascript ecosystem and full stack applications.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            href="/projects" 
            className="inline-block border border-AAsecondary text-AAsecondary px-5 sm:px-7 py-3 sm:py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono text-sm sm:text-base"
          >
            Check out my projects!
          </Link>
        </motion.div>
      </div>
    </section>
  );
}