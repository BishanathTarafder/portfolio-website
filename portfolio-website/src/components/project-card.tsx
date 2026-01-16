'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  projectLink?: string;
  githubLink?: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

export function ProjectCard({
  title,
  description,
  category,
  tags,
  projectLink,
  githubLink,
  imageSrc,
  imageAlt,
  index
}: ProjectCardProps) {
  return (
    <motion.div 
      className="card overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority={index < 2}
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <div className="text-xs sm:text-sm font-medium text-AAsecondary mb-2">{category}</div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-800 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          {projectLink && (
            <Link 
              href={projectLink} 
              className="text-AAprimary hover:text-AAsecondary text-sm font-medium transition-colors duration-300 flex items-center"
            >
              View Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
          {githubLink && (
            <Link 
              href={githubLink} 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-sm font-medium transition-colors duration-300 flex items-center"
            >
              GitHub
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}