'use client';

import { ProjectCard } from './project-card';
import { motion } from 'framer-motion';
import Link from 'next/link';

const featuredProjects = [
  {
    title: 'Predictive Analytics Dashboard',
    description: 'A dashboard for visualizing ML predictions with interactive charts and real-time data processing.',
    category: 'Machine Learning',
    tags: ['Python', 'TensorFlow', 'React'],
    projectLink: '#',
    githubLink: '#',
    imageSrc: '/project-analytics.jpg',
    imageAlt: 'Predictive Analytics Dashboard'
  },
  {
    title: 'NLP Research Platform',
    description: 'A platform for natural language processing research with tools for text analysis and sentiment detection.',
    category: 'Natural Language Processing',
    tags: ['Python', 'NLTK', 'React', 'Node.js'],
    projectLink: '#',
    githubLink: '#',
    imageSrc: '/project-nlp.jpg',
    imageAlt: 'NLP Research Platform'
  },
  {
    title: 'Computer Vision System',
    description: 'An advanced computer vision system for object detection and image classification using deep learning.',
    category: 'Computer Vision',
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    projectLink: '#',
    githubLink: '#',
    imageSrc: '/project-vision.jpg',
    imageAlt: 'Computer Vision System'
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              category={project.category}
              tags={project.tags}
              projectLink={project.projectLink}
              githubLink={project.githubLink}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
            />
          ))}
        </div>
        <div className="mt-10 sm:mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/projects" 
              className="inline-block px-6 py-3 border border-AAsecondary text-AAsecondary rounded-md hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 text-sm sm:text-base"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}