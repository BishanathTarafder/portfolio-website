'use client';

import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { GithubIcon } from '@/components/icons';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  technologies: string[];
  githubUrl?: string;
  detailUrl: string;
  featured?: boolean;
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  const filters = ['All', 'Machine Learning', 'NLP', 'Computer Vision', 'Web Development'];
  
  // Project data
  const projects = React.useMemo<Project[]>(() => [
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics Dashboard',
      description: 'A dashboard for visualizing ML predictions with interactive charts and real-time data processing.',
      image: '/project-analytics.jpg',
      category: ['Machine Learning', 'Web Development'],
      technologies: ['Python', 'TensorFlow', 'React'],
      githubUrl: '#',
      detailUrl: '/projects/predictive-analytics',
      featured: true
    },
    {
      id: 'nlp-sentiment',
      title: 'NLP Sentiment Analysis',
      description: 'A natural language processing tool that analyzes sentiment in customer reviews and social media posts.',
      image: '/project-nlp.jpg',
      category: ['NLP', 'Machine Learning'],
      technologies: ['Python', 'NLTK', 'Transformers', 'Flask'],
      githubUrl: '#',
      detailUrl: '/projects/nlp-sentiment'
    },
    {
      id: 'object-detection',
      title: 'Real-time Object Detection',
      description: 'Computer vision system for real-time object detection and tracking in video streams.',
      image: '/project-vision.jpg',
      category: ['Computer Vision', 'Machine Learning'],
      technologies: ['Python', 'OpenCV', 'PyTorch', 'YOLO'],
      githubUrl: '#',
      detailUrl: '/projects/object-detection'
    }
  ], []);
  
  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.category.includes(activeFilter)
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);
  
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:px-16 lg:px-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center font-mono text-AAsecondary text-2xl mb-12"
        >
          <span className="text-AAsecondary mr-2">03.</span> Some Things I&apos;ve Built
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 mb-8">
            {filters.map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${activeFilter === filter 
                  ? 'border-[#6049ea] text-[#6049ea] bg-[#6049ea] bg-opacity-10 shadow-[0_4px_10px_rgba(96,73,234,0.2)]' 
                  : 'border-gray-600 text-white hover:border-[#6049ea] hover:text-[#6049ea]'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                className={`relative group ${index % 2 === 1 ? 'flex justify-end' : ''}`}
              >
                <div className={`relative overflow-hidden rounded-md ${index % 2 === 1 ? 'w-full' : ''}`}>
                  <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
                  <div className="h-80 bg-gray-700 relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <div className={`absolute inset-0 flex flex-col justify-between p-8 z-20 ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <div>
                      <div className="font-mono text-AAsecondary text-sm mb-2">{project.featured ? 'Featured Project' : 'Project'}</div>
                      <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">{project.title}</h3>
                      <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                        <p>{project.description}</p>
                      </div>
                    </div>
                    <div>
                      <div className={`flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                        {project.technologies.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <div className={`flex gap-5 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                        {project.githubUrl && (
                          <Link href={project.githubUrl} aria-label="GitHub Repository" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                            <GithubIcon />
                          </Link>
                        )}
                        <Link href={project.detailUrl} aria-label="View Project" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-2 text-center py-20"
            >
              <p className="text-gray-400 text-lg">No projects found matching the selected filter.</p>
              <button 
                onClick={() => setActiveFilter('All')} 
                className="mt-4 px-4 py-2 border border-AAsecondary text-AAsecondary rounded hover:bg-AAsecondary hover:bg-opacity-10 transition-all duration-300"
              >
                View All Projects
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}